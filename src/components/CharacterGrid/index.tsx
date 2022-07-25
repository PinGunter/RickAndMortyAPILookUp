import React from "react";
import { Col, Spinner, Container, Row, Alert } from "react-bootstrap";
import { Waypoint } from "react-waypoint";
import { Character, Filter } from "../../types";
import CharacterCard from "../CharacterCard";

type CharacterGridProps = {
  characters: Character[];
  loading: boolean;
  loadingNextPage: boolean;
  filters?: Filter;
  setPage: Function;
};

export default function CharacterGrid({
  characters,
  loading,
  loadingNextPage,
  filters,
  setPage,
}: CharacterGridProps) {
  const handleNextPage = () => {
    console.log("fin");
    setPage((currentPage: number) => currentPage + 1);
  };

  return (
    <>
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
            <Waypoint onEnter={handleNextPage}>
              <div>
                {loadingNextPage ? (
                  <Alert variant="warning">
                    Loading
                    <Spinner animation="border" />
                  </Alert>
                ) : (
                  ""
                )}
              </div>
            </Waypoint>
          </Col>
        </>
      )}
    </>
  );
}
