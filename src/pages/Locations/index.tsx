import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import LocationGrid from "../../components/LocationGrid";
import getLocations from "../../services/getLocations";
import { Location, LocationFilter, defaultLocationFilter } from "../../types";

const typeOptions = [
  "Select",
  "Acid Plant",
  "Arcade",
  "Artificially generated world",
  "Asteroid",
  "Base",
  "Box",
  "Consciousness",
  "Convention",
  "Country",
  "Customs",
  "Daycare",
  "Death Star",
  "Diegesis",
  "Dimension",
  "Dream",
  "Dwarf Planet",
  "Elemental Rings",
  "Fantasy Town",
  "Game",
  "Hell",
  "Human",
  "Liquid",
  "Machine",
  "Memory",
  "Menagerie",
  "Microverse",
  "Miniverse",
  "Mount",
  "Nightmare",
  "Non-Diegetic Alternative Reality",
  "Planet",
  "Police Department",
  "Quadrant",
  "Quasar",
  "Reality",
  "Resort",
  "Space",
  "Space Station",
  "Spacecraft",
  "Teenyverse",
  "TV",
  "Woods",
  "Unknown",
];

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

  const handleSearch = (evt: any) => {
    evt.preventDefault();
    setFilters({
      ...filters,
      name: searchTerm,
    });
  };

  const handleChangeSearch = (evt: any) => {
    setSearchTerm(evt.target.value);
  };

  const handleChangeTypeFilter = (evt: any) => {
    setFilters({
      ...filters,
      type: evt.target.value === "Select" ? "" : evt.target.value,
    });
  };

  const handleResetFilter = () => setFilters(defaultLocationFilter);

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
            <form onSubmit={handleSearch}>
              <Form.Label>Name</Form.Label>
              <div className="form-group section-search-bar">
                <input
                  className="form-control"
                  onChange={handleChangeSearch}
                  type="text"
                  value={searchTerm}
                  placeholder="Search"
                ></input>
                <button type="submit" className="btn btn-outline-success">
                  Search
                </button>
              </div>
            </form>
            <form onSubmit={handleResetFilter}>
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={filters.type}
                onChange={handleChangeTypeFilter}
              >
                {typeOptions.map((singleOption) => {
                  return <option>{singleOption}</option>;
                })}
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
