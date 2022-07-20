import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { Character } from "../../services/getCharacters";

export default function CharacterCard({ info }: { info: Character }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={info.image} />
      <Card.Body>
        <Card.Title>{info.name}</Card.Title>
        <Card.Text>
          <ListGroup variant="flush">
            <ListGroup.Item>Status: {info.status}</ListGroup.Item>
            <ListGroup.Item>Gender: {info.gender}</ListGroup.Item>
            <ListGroup.Item>Species: {info.species}</ListGroup.Item>
            <ListGroup.Item>Origin: {info.origin.name}</ListGroup.Item>
            <ListGroup.Item>Location: {info.location.name}</ListGroup.Item>
          </ListGroup>
        </Card.Text>
        <Button variant="primary">More info</Button>
      </Card.Body>
    </Card>
  );
}
