import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useLocation } from "wouter";
import { routes } from "../../routes";

export default function Header() {
  const [, setLocation] = useLocation();
  return (
    <>
      <Navbar variant="dark" bg="primary" expand="lg" collapseOnSelect>
        <Container fluid>
          <Navbar.Brand>Rick and Morty API Lookup</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <Nav>
              <Nav.Link
                className="link"
                onClick={() => setLocation(routes["characters"])}
              >
                Characters
              </Nav.Link>
              <Nav.Link onClick={() => setLocation(routes["locations"])}>
                Locations
              </Nav.Link>
              <Nav.Link onClick={() => setLocation(routes["episodes"])}>
                Episodes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
