import { Character, Filter } from "../types";
import { API_CHARACTERS } from "./servicesConstants";
import { fetchFromApi, generateFilterURL, pageQuery } from "./servicesUtils";

export default async function getCharacters({
  filter,
  page,
}: {
  filter: Filter;
  page?: number;
}): Promise<Character[]> {
  // const filter = useSelector((state) => state.filters); para usar el hook hay que estar en un componente o hook
  const url = `${API_CHARACTERS}?${pageQuery(page)}&${generateFilterURL(
    filter
  )}`;
  const { results } = await fetchFromApi(url);
  return results as Character[];
}
