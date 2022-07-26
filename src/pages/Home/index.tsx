import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  Character,
  CharacterFilterType,
  defaultCharacterFilter,
} from "../../types";
import "./styles.css";
import getCharacters from "../../services/getCharacters";
import CharacterGrid from "../../components/CharacterGrid";

export default function Home({ title }: { title: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filters, setFilters] = useState<CharacterFilterType>(
    defaultCharacterFilter
  );
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(1);
  const [loadingNextPage, setLoadingNextPage] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        let response = await getCharacters({
          filter: filters,
        });
        const newCharacters = response.characters;
        setCharacters(newCharacters);
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
        const response = await getCharacters({
          filter: filters,
          page: nextPage,
        });
        const newCharacters = response.characters;
        setCharacters((prevCharacters) => prevCharacters.concat(newCharacters));
        setLoadingNextPage(false);
      } catch (error) {
        setLoadingNextPage(false);
        setNextPage(-1);
      }
    })();
  }, [nextPage]);

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    setFilters({
      ...filters!,
      name: searchTerm,
    });
  };

  const handleChange = (evt: any) => {
    setSearchTerm(evt.target.value);
  };

  const changeStatusFilter = (evt: any) => {
    setFilters({
      ...filters!,
      status: evt.target.value === "Select" ? "" : evt.target.value,
    });
  };

  const changeGenderFilter = (evt: any) => {
    setFilters({
      ...filters!,
      gender: evt.target.value === "Select" ? "" : evt.target.value,
    });
  };

  const changeSpeciesFilter = (evt: any) => {
    setFilters({
      ...filters!,
      species: evt.target.value === "Select" ? "" : evt.target.value,
    });
  };

  const handleFilter = (evt: any) => {
    evt.preventDefault();
    setFilters(defaultCharacterFilter);
  };

  return (
    <>
      <Container fluid>
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
        </div>
      </Container>
      <Row>
        <CharacterGrid
          characters={characters}
          loading={loading}
          setPage={setNextPage}
          loadingNextPage={loadingNextPage}
        />
        <Col>
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
              <Form.Select
                value={filters.species}
                onChange={changeSpeciesFilter}
              >
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
        </Col>
      </Row>
    </>
  );
}
