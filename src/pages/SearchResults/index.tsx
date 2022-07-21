import { Container, Card, Row, Col, Spinner } from "react-bootstrap";
import CharacterCard from "../../components/Character";
import useCharacterSearch from "../../components/hooks/useCharacterSearch";

export default function SearchResults({ keyword }: { keyword: string }) {
  const { loading, error, characters } = useCharacterSearch(keyword);

  if (loading) return <Spinner className="centered" animation="border" />;

  if (error) {
    return (
      <>
        <Container fluid>
          <div className="section-header">
            <h2 className="section-title">No results found for "{keyword}"</h2>
          </div>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Container fluid>
          <div className="section-header">
            <h2 className="section-title">
              Search Results for "{decodeURI(keyword)}"
            </h2>
          </div>
        </Container>
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
      </>
    );
  }
}
