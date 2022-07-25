import React, { useCallback, useEffect, useRef } from "react";
import { Col, Spinner, Container, Row } from "react-bootstrap";
import useNearScreen from "../../hooks/useNearScreen";
import { Character, Filter } from "../../types";
import CharacterCard from "../CharacterCard";
import debounce from "just-debounce-it";

type CharacterGridProps = {
  characters: Character[];
  loading: boolean;
  page?: number;
  filters?: Filter;
  setPage: Function;
};

export default function CharacterGrid({
  characters,
  loading,
  page,
  filters,
  setPage,
}: CharacterGridProps) {
  const externalRef = useRef();
  const { isNearScreen } = useNearScreen({
    externalRef: loading ? null : externalRef,
    once: false,
    distance: "100px",
  });

  const handleNextPage = () => {
    setPage((currentPage: number) => {
      return currentPage + 1;
    });
  };

  const debounceHandleNextPage = useCallback(debounce(handleNextPage, 200), []);

  useEffect(() => {
    if (isNearScreen) debounceHandleNextPage();
  }, [debounceHandleNextPage, isNearScreen]);

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
                {characters.map((character) => {
                  return (
                    <Col key={character.id}>
                      <CharacterCard info={character} />
                    </Col>
                  );
                })}
              </Row>
            </Container>
            {/* @ts-ignore*/}
            <div id="visor" ref={externalRef}></div>
          </Col>
        </>
      )}
    </>
  );
}
