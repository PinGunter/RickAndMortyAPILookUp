import React, { useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { Link } from "wouter";
import { Character, Location } from "../../types";
import CharacterModal from "../CharacterModal";
import GenderInfo from "../GenderInfo";
import StatusBadge from "../StatusBadge";

export default function CharacterCard({ info }: { info: Character }) {
  const [modalShow, setModalShow] = useState(false);

  const handleClick = () => {
    setModalShow(true);
  };

  const LinkToLocation = (location: Location) => {
    const locationId = location.url!.split("/").pop();
    return `/locations/${locationId}`;
  };

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={info.image} />
        <Card.Body>
          <Card.Title>{info.name}</Card.Title>
          <Card.Text>
            <ListGroup variant="flush">
              <ListGroup.Item>
                Status: <StatusBadge status={info.status} />
              </ListGroup.Item>
              <ListGroup.Item>
                Gender: {<GenderInfo gender={info.gender} />}
              </ListGroup.Item>
              <ListGroup.Item>Species: {info.species}</ListGroup.Item>
              <ListGroup.Item>
                Origin:{" "}
                <Link to={LinkToLocation(info.origin)}>{info.origin.name}</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                Location:{" "}
                <Link to={LinkToLocation(info.location)}>
                  {info.location.name}
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Card.Text>
          <Button onClick={handleClick} variant="primary">
            More info
          </Button>
        </Card.Body>
      </Card>
      <CharacterModal
        id={info.id}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
