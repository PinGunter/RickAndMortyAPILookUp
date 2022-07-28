import { LocationFilterType, Location } from "../types";
import { API_LOCATIONS } from "./servicesConstants";
import { pageQuery, generateFilterURL, fetchFromApi } from "./servicesUtils";

export default async function getLocations({
  filter,
  page,
}: {
  filter: LocationFilterType;
  page?: number;
}): Promise<Location[]> {
  const url = `${API_LOCATIONS}?${pageQuery(page)}&${generateFilterURL(
    filter
  )}`;
  const { results } = await fetchFromApi(url);
  return results as Location[];
}
