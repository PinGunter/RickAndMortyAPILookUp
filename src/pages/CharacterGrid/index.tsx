import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Form, Button } from "react-bootstrap";
import CharacterCard from "../../components/Character";
import CharacterDetails from "../CharacterDetails";
import { useLocation } from "wouter";
import { Character, Filter } from "../../types";
import "./styles.css";
import getCharacters from "../../services/getCharacters";

const defaultFilter = {
  status: "",
  gender: "",
  species: "",
};

export default function Results({ title, id }: { title: string; id?: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [, setLocation] = useLocation();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filters, setFilters] = useState<Filter>(defaultFilter);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let newCharacters: Character[];
    (async () => {
      try {
        newCharacters = await getCharacters({ filter: filters, page: 0 });
        setCharacters(newCharacters);
        setLoading(false);
      } catch (error) {
        setCharacters([]);
        setLoading(false);
      }
    })();
  }, [filters]);

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    setLocation(`/search/${searchTerm}`);
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
    setFilters(defaultFilter);
  };

  if (id)
    return (
      <Container fluid>
        <CharacterDetails id={id} />
      </Container>
    );
  else
    return (
      <>
        <Container fluid>
          <div className="section-header">
            <h2 className="section-title">{title}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group section-search-bar">
                <input
                  className="form-control section-search"
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

            {/* preguntar porque no entiendo nada */}
            {/* <Form className="section-search-bar" onChange={handleChange}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 "
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form> */}
          </div>
        </Container>
        <Row>
          {loading ? (
            <Col xs={9}>
              <Spinner className="centered" animation="border" />
            </Col>
          ) : (
            <>
              <Col xs={9}>
                <Container fluid>
                  <Row>
                    {characters.map((character) => {
                      return (
                        <Col key={character.id}>
                          <CharacterCard info={character} />
                        </Col>
                      );
                    })}
                  </Row>
                </Container>
              </Col>
            </>
          )}
          <Col>
            <Container>
              <h4>Filter</h4>
              <form onSubmit={handleFilter}>
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={filters.status}
                  onChange={changeStatusFilter}
                >
                  <option>Select</option>
                  <option>Alive</option>
                  <option>Dead</option>
                  <option>Unknown</option>
                </Form.Select>
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  value={filters.gender}
                  onChange={changeGenderFilter}
                >
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
