import getCharacters, { Character } from "../../services/getCharacters";
import { useState, useEffect } from "react";

export function useCharacter() {
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    setLoading(true);
    let newCharacters: Character[];
    (async () => {
      newCharacters = await getCharacters();
      setCharacters(newCharacters);
      setLoading(false);
    })();
  }, []);

  return { loading, characters };
}
