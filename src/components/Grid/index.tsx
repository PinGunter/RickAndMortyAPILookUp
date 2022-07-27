import React from "react";
import { Col, Spinner, Container, Row, Alert } from "react-bootstrap";
import { Waypoint } from "react-waypoint";
import {
  Location,
  Character,
  LocationFilterType,
  CharacterFilterType,
} from "../../types";
import CharacterCard from "../CharacterCard";
import LocationCard from "../LocationCard";

export type GridProps = {
  data: Location[] | Character[];
  loading: boolean;
  loadingNextPage: boolean;
  filters?: LocationFilterType | CharacterFilterType;
  setPage: Function;
  colSize: number | null;
  card: Function;
};

export default function Grid({
  data,
  loading,
  loadingNextPage,
  filters,
  setPage,
  colSize,
  card,
}: GridProps) {
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
                {data.map((singleData) => {
                  return (
                    <Col xs={colSize ? colSize : undefined} key={singleData.id}>
                      {"status" in singleData ? (
                        <CharacterCard info={singleData} />
                      ) : (
                        <LocationCard info={singleData} />
                      )}
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
