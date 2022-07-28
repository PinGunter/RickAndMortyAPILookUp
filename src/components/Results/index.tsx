import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Grid from "../Grid";
import { CharacterFilterType, dataType, LocationFilterType } from "../../types";

type resultProps = {
  title: string;
  filterComponent: Function;
  getData: Function;
  colSize?: number | null;
};

export default function Results({
  title,
  filterComponent,
  getData,
  colSize,
}: resultProps) {
  const [data, setData] = useState<dataType[]>([]);
  const [filters, setFilters] = useState<
    LocationFilterType | CharacterFilterType
  >({});
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(1);
  const [loadingNextPage, setLoadingNextPage] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const newData = await getData({
          filter: filters,
        });
        setData(newData);
        setLoading(false);
        setNextPage(1);
      } catch (error) {
        setData([]);
        setLoading(false);
        setNextPage(-1);
      }
    })();
  }, [filters, getData]);

  useEffect(() => {
    if (nextPage === 1 || nextPage === -1) return;
    (async () => {
      setLoadingNextPage(true);
      try {
        const newData = await getData({
          filter: filters,
          page: nextPage,
        });
        setData((prevData) => prevData.concat(newData));
        setLoadingNextPage(false);
      } catch (error) {
        setLoadingNextPage(false);
        setNextPage(-1);
      }
    })();
  }, [nextPage, getData]);

  return (
    <>
      <Container fluid>
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
        </div>
      </Container>
      <Row>
        <Grid
          data={data}
          loading={loading}
          setPage={setNextPage}
          loadingNextPage={loadingNextPage}
          colSize={colSize}
        />
        <Col>{filterComponent({ setParent: setFilters })}</Col>
      </Row>
    </>
  );
}
