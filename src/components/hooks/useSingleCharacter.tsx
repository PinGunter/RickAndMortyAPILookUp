import getSingleCharacter from "../../services/getSingleCharacter";
import { FullCharacter } from "../../types";
import { useState, useEffect } from "react";

export function useSingleCharacter({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const [character, setCharacter] = useState<FullCharacter>({
    id: "-1",
    name: "",
    status: "",
    gender: "",
    image: "",
    species: "",
    origin: {
      name: "",
      url: "",
    },
    location: {
      name: "",
      url: "",
    },
    episode: [],
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    let newCharacter: FullCharacter;
    (async () => {
      try {
        newCharacter = await getSingleCharacter(id);
        setCharacter(newCharacter);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    })();
  }, [id]);

  return { loading, error, character };
}
