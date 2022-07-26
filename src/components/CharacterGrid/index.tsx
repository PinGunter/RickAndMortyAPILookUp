import React from "react";
import { Col, Spinner, Container, Row, Alert } from "react-bootstrap";
import { Waypoint } from "react-waypoint";
import { Character, CharacterFilterType } from "../../types";
import CharacterCard from "../CharacterCard";

type CharacterGridProps = {
  characters: Character[];
  loading: boolean;
  loadingNextPage: boolean;
  filters?: CharacterFilterType;
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
    setPage((currentPage: number) => {
      if (currentPage !== -1) return currentPage + 1;
      else return currentPage;
    });
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
