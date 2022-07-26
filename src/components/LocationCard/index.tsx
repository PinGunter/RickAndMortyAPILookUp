import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { Location } from "../../types";
import { useLocation } from "wouter";

export default function LocationCard({ info }: { info: Location }) {
  const [, setLocation] = useLocation();
  return (
    <div style={{ margin: "20px" }}>
      <Card>
        <Card.Header>{info.name}</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>Type: {info.type}</ListGroup.Item>
          <ListGroup.Item>Dimension: {info.dimension}</ListGroup.Item>
        </ListGroup>
      </Card>
      <Button
        style={{ margin: "5px 0px" }}
        onClick={() => setLocation(`/locations/${info.id}`)}
      >
        More info
      </Button>
    </div>
  );
}
