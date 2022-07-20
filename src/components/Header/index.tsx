import React from "react";
import { Navbar, NavLink, Nav, Container } from "react-bootstrap";
import { Link } from "wouter";
import "./styles.css";

export default function Header() {
  return (
    <>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container fluid>
          <Navbar.Brand>Rick and Morty API Lookup</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <NavLink>
                <Link className="link" to="/characters">
                  Characters
                </Link>
              </NavLink>
              <NavLink>
                <Link className="link" to="/locations">
                  Locations
                </Link>
              </NavLink>
              <NavLink>
                <Link className="link" to="/episodes">
                  Episodes
                </Link>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
