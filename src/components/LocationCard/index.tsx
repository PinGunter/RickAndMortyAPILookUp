import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Location } from "../../types";

export default function LocationCard({ info }: { info: Location }) {
  return (
    <>
      <Card style={{ margin: "20px" }}>
        <Card.Header>{info.name}</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>Type: {info.type}</ListGroup.Item>
          <ListGroup.Item>Dimension: {info.dimension}</ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
}
