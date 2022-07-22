import getCharacters from "../services/getCharacters";
import { Character, Filter } from "../types";
import { useState, useEffect } from "react";

export function useCharacter({
  filter,
  page,
}: {
  filter?: Filter;
  page?: number;
}) {
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    let newCharacters: Character[];
    (async () => {
      try {
        newCharacters = await getCharacters({ filter, page }).characters;
        setCharacters(newCharacters);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    })();
  }, [filter, page]);

  return { loading, error, characters };
}
