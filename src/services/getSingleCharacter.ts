import { Character } from "../types";
import { API_CHARACTERS } from "./servicesConstants";
import { fetchFromApi } from "./servicesUtils";

export default async function getSingleCharacter(
  id: string
): Promise<Character> {
  const apiURL = `${API_CHARACTERS}${id}`;
  const character = await fetchFromApi(apiURL);
  return character as Character;
}
