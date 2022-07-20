import React from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import CharacterCard from "../../components/Character";
import { useCharacter } from "../../components/hooks/useCharacter";

export default function Results({ title, id }: { title: string; id?: string }) {
  const { loading, characters } = useCharacter();
  if (id) console.log(id);
  return (
    <>
      <Container fluid>
        <h1>{title}</h1>
      </Container>
      <Container>
        <Row></Row>
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <Row>
            {characters.map((character) => {
              return (
                <Col>
                  <CharacterCard info={character} />
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </>
  );
}
