import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { LocationFilterType, defaultLocationFilter } from "../../types";

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

export default function LocationFilter({ setParent }: { setParent: Function }) {
  const [filters, setFilters] = useState<LocationFilterType>(
    defaultLocationFilter
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setParent(filters);
  }, [filters]);

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
          <Form.Select value={filters.type} onChange={handleChangeTypeFilter}>
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
    </>
  );
}
