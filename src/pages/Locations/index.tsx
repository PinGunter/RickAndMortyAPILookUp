import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import LocationFilter from "../../components/Filter/LocationFilter";
import LocationGrid from "../../components/LocationGrid";
import getLocations from "../../services/getLocations";
import {
  Location,
  LocationFilterType,
  defaultLocationFilter,
} from "../../types";

export default function Locations({ id }: { id?: string }) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [filters, setFilters] = useState<LocationFilterType>(
    defaultLocationFilter
  );
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(1);
  const [loadingNextPage, setLoadingNextPage] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const newLocations = await getLocations({
          filter: filters,
        });
        setLocations(newLocations);
        setLoading(false);
        setNextPage(1);
      } catch (error) {
        setLoading(false);
        setNextPage(-1);
      }
    })();
  }, [filters]);

  useEffect(() => {
    if (nextPage === 1 || nextPage === -1) return;
    (async () => {
      setLoadingNextPage(true);
      try {
        const newLocations = await getLocations({
          filter: filters,
          page: nextPage,
        });
        setLocations((prevLocation) => prevLocation.concat(newLocations));
        setLoadingNextPage(false);
      } catch (error) {
        setLoadingNextPage(false);
        setNextPage(-1);
      }
    })();
  }, [nextPage]);

  if (id) {
    return <h1>Location with id {id}</h1>;
  }
  return (
    <>
      <Container fluid>
        <div className="section-header">
          <h2 className="section-title">Locations</h2>
        </div>
      </Container>
      <Row>
        <LocationGrid
          locations={locations}
          loading={loading}
          setPage={setNextPage}
          loadingNextPage={loadingNextPage}
        />
        <Col>{<LocationFilter setParent={setFilters} />}</Col>
      </Row>
    </>
  );
}
