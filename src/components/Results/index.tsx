import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Grid from "../Grid";
import { Filter, dataType } from "../../types";
import { useSelector } from "react-redux";
import { selectFilters } from "../../features/filters/filtersSlice";

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
  const FilterComponent = filterComponent;
  const [data, setData] = useState<dataType[]>([]);
  const filters = useSelector(selectFilters);
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
        <Col>
          <FilterComponent />
        </Col>
      </Row>
    </>
  );
}
