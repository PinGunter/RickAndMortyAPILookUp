import { useState } from "react";
import { Button, Row, Modal, Spinner, Table, ListGroup } from "react-bootstrap";
import getEpisodeByURL from "../../services/getEpisodeByURL";
import getSingleCharacter from "../../services/getSingleCharacter";
import { Character, Episode } from "../../types";
import "./styles.css";

export default function CharacterModal({
  show,
  id,
  onHide,
}: {
  show: boolean;
  id: string;
  onHide: () => void;
}) {
  const [character, setCharacter] = useState<Character>({} as Character);
  const [loading, setLoading] = useState(true);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  const onEntered = () => {
    (async () => {
      const newCharacter = await getSingleCharacter(id);
      setCharacter(newCharacter);
      const newEpisodes: Episode[] = await Promise.all(
        newCharacter.episode.map((singleEp) => getEpisodeByURL(singleEp))
      );
      setEpisodes(newEpisodes);
      setLoading(false);
    })();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onEntered={onEntered}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {loading ? "" : character.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <>
            <div className="photo-description">
              <img src={character.image} alt={character.name} />
              <div>
                <ListGroup className="info">
                  <ListGroup.Item>id: {character.id}</ListGroup.Item>
                  <ListGroup.Item>Name: {character.name}</ListGroup.Item>
                  <ListGroup.Item>Status: {character.status}</ListGroup.Item>
                  <ListGroup.Item>Species: {character.species}</ListGroup.Item>
                  {character.type ? (
                    <ListGroup.Item>Type: {character.type}</ListGroup.Item>
                  ) : (
                    ""
                  )}
                  <ListGroup.Item>Gender: {character.gender}</ListGroup.Item>
                  <ListGroup.Item>
                    Origin: {character.origin.name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Location: {character.location.name}
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>
            <Row>
              <h5>Episodes</h5>
              <Table striped>
                <thead>
                  <th>#</th>
                  <th>Name</th>
                  <th>Air Date</th>
                  <th>Codename</th>
                </thead>
                <tbody>
                  {episodes.map((ep: Episode) => (
                    <tr>
                      <td>{ep.id}</td>
                      <td>{ep.name}</td>
                      <td>{ep.airDate}</td>
                      <td>{ep.codeName}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
