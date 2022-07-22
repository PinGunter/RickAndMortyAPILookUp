import { useEffect, useState } from "react";
import getCharacterSearch from "../services/getCharacterSearch";
import { Character } from "../types";

export default function useCharacterSearch(keyword: string) {
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    let newCharacters: Character[];
    (async () => {
      try {
        newCharacters = await getCharacterSearch({ keyword });
        setCharacters(newCharacters);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    })();
  }, [keyword]);

  return { loading, error, characters };
}
