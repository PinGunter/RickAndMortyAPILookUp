import { Character, CharacterFilterType } from "../types";
import { API_CHARACTERS } from "./servicesConstants";
import { fetchFromApi, generateFilterURL, pageQuery } from "./servicesUtils";

export default async function getCharacters({
  filter,
  page,
}: {
  filter: CharacterFilterType;
  page?: number;
}): Promise<Character[]> {
  const url = `${API_CHARACTERS}?${pageQuery(page)}&${generateFilterURL(
    filter
  )}`;
  const { results } = await fetchFromApi(url);
  return results as Character[];
}
