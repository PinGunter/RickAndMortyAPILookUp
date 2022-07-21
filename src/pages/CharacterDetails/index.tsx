import React from "react";
import "./styles.css";
import { Container, Spinner, ListGroup, Badge, Card } from "react-bootstrap";
import { useSingleCharacter } from "../../components/hooks/useSingleCharacter";

export default function CharacterDetails({ id }: { id: string }) {
  const { loading, error, character } = useSingleCharacter({ id });

  if (error)
    return (
      <Container fluid className="centered-msg">
        <Card className="text-center" bg="danger" text="light">
          <Card.Header>Error</Card.Header>
          <Card.Body>
            <Card.Title>An error occurred</Card.Title>
            <Card.Text>Does the character exist?</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );

  return loading ? (
    <Spinner className="centered" animation="border" />
  ) : (
    <Container>
      <div className="frame">
        <div>
          <h3>{character.name}</h3>
          <img alt={character.name} src={character.image} />
        </div>
        <div>
          <ListGroup variant="flush">
            <ListGroup.Item>
              Status: <Badge>{character.status}</Badge>
            </ListGroup.Item>
            <ListGroup.Item>Gender: {character.gender}</ListGroup.Item>
            <ListGroup.Item>Species: {character.species}</ListGroup.Item>
            <ListGroup.Item>Origin:{character.origin.name}</ListGroup.Item>
            <ListGroup.Item>Location:{character.location.name}</ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    </Container>
  );
}
