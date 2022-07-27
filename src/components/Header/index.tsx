import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useLocation } from "wouter";

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
                onClick={() => setLocation("/character")}
              >
                Characters
              </Nav.Link>
              <Nav.Link onClick={() => setLocation("/locations")}>
                Locations
              </Nav.Link>
              <Nav.Link onClick={() => setLocation("/episodes")}>
                Episodes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
