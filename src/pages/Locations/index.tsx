import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import LocationGrid from "../../components/LocationGrid";
import getLocations from "../../services/getLocations";
import { Location, LocationFilter, defaultLocationFilter } from "../../types";

export default function Locations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [filters, setFilters] = useState<LocationFilter>(defaultLocationFilter);
  const [searchTerm, setSearchTerm] = useState("");
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
        <Col>
          <Container>
            <h4>Filter</h4>{" "}
            <form onSubmit={() => {}}>
              <Form.Label>Name</Form.Label>
              <div className="form-group section-search-bar">
                <input
                  className="form-control"
                  onChange={() => {}}
                  type="text"
                  value=""
                  placeholder="Search"
                ></input>
                <button type="submit" className="btn btn-outline-success">
                  Search
                </button>
              </div>
            </form>
            <form onSubmit={() => {}}>
              <Form.Label>Type</Form.Label>
              <Form.Select>
                <option>Select</option>
                <option>Acid Plant</option>
                <option>Arcade</option>
                <option>Artificially generated world</option>
                <option>Asteroid</option>
                <option>Base</option>
                <option>Box</option>
                <option>Consciousness</option>
                <option>Convention</option>
                <option>Country</option>
                <option>Customs</option>
                <option>Daycare</option>
                <option>Death Star</option>
                <option>Diegesis</option>
                <option>Dimension</option>
                <option>Dream</option>
                <option>Dwarf Planet</option>
                <option>Elemental Rings</option>
                <option>Fantasy Town</option>
                <option>Game</option>
                <option>Hell</option>
                <option>Human</option>
                <option>Liquid</option>
                <option>Machine</option>
                <option>Memory</option>
                <option>Menagerie</option>
                <option>Microverse</option>
                <option>Miniverse</option>
                <option>Mount</option>
                <option>Nightmare</option>
                <option>Non-Diegetic Alternative Reality</option>
                <option>Planet</option>
                <option>Police Department</option>
                <option>Quadrant</option>
                <option>Quasar</option>
                <option>Reality</option>
                <option>Resort</option>
                <option>Space</option>
                <option>Space Station</option>
                <option>Spacecraft</option>
                <option>Teenyverse</option>
                <option>TV</option>
                <option>Woods</option>
                <option>Unknown</option>
              </Form.Select>
              <Button
                className="btn-filter"
                as="button"
                type="submit"
                variant="warning"
              >
                Reset filters
              </Button>
            </form>
          </Container>
        </Col>
      </Row>
    </>
  );
}
