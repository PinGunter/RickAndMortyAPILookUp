import React from "react";
import { Col, Spinner, Container, Row, Alert } from "react-bootstrap";
import { Waypoint } from "react-waypoint";
import LocationCard from "../LocationCard";
import { Location, LocationFilterType } from "../../types";

type LocationGridProps = {
  locations: Location[];
  loading: boolean;
  loadingNextPage: boolean;
  filters?: LocationFilterType;
  setPage: Function;
};

export default function LocationGrid({
  locations,
  loading,
  loadingNextPage,
  filters,
  setPage,
}: LocationGridProps) {
  const handleNextPage = () => {
    setPage((currentPage: number) => {
      if (currentPage !== -1) return currentPage + 1;
      else return currentPage;
    });
  };

  return (
    <>
      {loading ? (
        <Col xs={9}>
          <Spinner className="centered" animation="border" />
        </Col>
      ) : (
        <>
          <Col xs={9}>
            <Container fluid>
              <Row>
                {locations.map((location) => {
                  return (
                    <Col xs={6} key={location.id}>
                      <LocationCard info={location} />
                    </Col>
                  );
                })}
              </Row>
            </Container>
            <Waypoint onEnter={handleNextPage}>
              <div>
                {loadingNextPage ? (
                  <Alert variant="warning">
                    Loading
                    <Spinner animation="border" />
                  </Alert>
                ) : (
                  ""
                )}
              </div>
            </Waypoint>
          </Col>
        </>
      )}
    </>
  );
}
