import React, { useRef } from "react";
import { Col, Spinner, Container, Row } from "react-bootstrap";
import useNearScreen from "../../hooks/useNearScreen";
import { Character, Filter } from "../../types";
import CharacterCard from "../CharacterCard";

type CharacterGridProps = {
  characters: Character[];
  loading: boolean;
  page?: number;
  filters?: Filter;
};

export default function CharacterGrid({
  characters,
  loading,
  page,
  filters,
}: CharacterGridProps) {
  const externalRef = useRef<Element>();
  // const { isNearScreen } = useNearScreen({
  //   externalRef: loading ? null : externalRef,
  //   once: false,
  //   distance: "200px",
  // });

  // const handleNextPage()

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
          </Col>
        </>
      )}
    </>
  );
}
