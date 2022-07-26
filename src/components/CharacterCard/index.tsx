import React, { useState } from "react";
import { Badge, Button, Card, ListGroup } from "react-bootstrap";
import { Link } from "wouter";
import { Character, Location } from "../../types";
import CharacterModal from "../CharacterModal";

export default function CharacterCard({ info }: { info: Character }) {
  const [modalShow, setModalShow] = useState(false);

  const statusColor = (status: string) => {
    switch (status) {
      case "Alive":
        return "success";
      case "Dead":
        return "danger";
      case "unknown":
        return "secondary";
    }
  };

  const genderIcon = (gender: string) => {
    let icon: JSX.Element;
    switch (gender) {
      case "Male":
        icon = <i className="bi bi-gender-male"></i>;
        break;
      case "Female":
        icon = <i className="bi bi-gender-female"></i>;
        break;
      case "Genderless":
        icon = <i className="bi bi-slash-circle"></i>;
        break;
      default:
        icon = <i className="bi bi-question-circle"></i>;
        break;
    }
    return (
      <span>
        {icon} {gender}
      </span>
    );
  };

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
                Status:{" "}
                <Badge bg={statusColor(info.status)}>{info.status}</Badge>
              </ListGroup.Item>
              <ListGroup.Item>Gender: {genderIcon(info.gender)}</ListGroup.Item>
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
