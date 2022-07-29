import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import {
  setName,
  setType,
  selectFilters,
  resetFilter,
  resetCharacter,
} from "../../features/filters/filtersSlice";
import { useDispatch, useSelector } from "react-redux";
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

export default function LocationFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  useEffect(
    // @ts-ignore
    () => {
      dispatch(resetCharacter());
    },
    [dispatch]
  );

  const handleSearch = (evt: any) => {
    evt.preventDefault();
    dispatch(setName(evt.target.value));
  };

  const handleChangeSearch = (evt: any) => {
    setSearchTerm(evt.target.value);
  };

  const handleChangeTypeFilter = (evt: any) => {
    dispatch(setType(evt.target.value === "Select" ? "" : evt.target.value));
  };
  const handleResetFilter = () => {
    setSearchTerm("");
    dispatch(resetFilter);
  };
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
