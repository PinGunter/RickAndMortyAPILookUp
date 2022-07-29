import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setName,
  setGender,
  setStatus,
  setSpecies,
  resetLocation,
  selectFilters,
  resetFilter,
} from "../../features/filters/filtersSlice";

export default function CharacterFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();
  useEffect(
    // @ts-ignore
    () => {
      dispatch(resetLocation());
    },
    [dispatch]
  );

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    dispatch(setName(searchTerm));
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(evt.target.value);
  };

  const changeStatusFilter = (evt: any) => {
    dispatch(setStatus(evt.target.value === "Select" ? "" : evt.target.value));
  };

  const changeGenderFilter = (evt: any) => {
    dispatch(setGender(evt.target.value === "Select" ? "" : evt.target.value));
  };

  const changeSpeciesFilter = (evt: any) => {
    dispatch(setSpecies(evt.target.value === "Select" ? "" : evt.target.value));
  };

  const handleFilter = (evt: any) => {
    setSearchTerm("");
    dispatch(resetFilter);
  };

  return (
    <>
      <Container>
        <h4>Filter</h4>{" "}
        <form onSubmit={handleSubmit}>
          <Form.Label>Name</Form.Label>
          <div className="form-group section-search-bar">
            <input
              className="form-control"
              onChange={handleChange}
              type="text"
              value={searchTerm}
              placeholder="Search"
            ></input>
            <button type="submit" className="btn btn-outline-success">
              Search
            </button>
          </div>
        </form>
        <form onSubmit={handleFilter}>
          <Form.Label>Status</Form.Label>
          <Form.Select value={filters.status} onChange={changeStatusFilter}>
            <option>Select</option>
            <option>Alive</option>
            <option>Dead</option>
            <option>Unknown</option>
          </Form.Select>
          <Form.Label>Gender</Form.Label>
          <Form.Select value={filters.gender} onChange={changeGenderFilter}>
            <option>Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Genderless</option>
            <option>Unknown</option>
          </Form.Select>
          <Form.Label>Species</Form.Label>
          <Form.Select value={filters.species} onChange={changeSpeciesFilter}>
            <option>Select</option>
            <option>Human</option>
            <option>Alien</option>
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
