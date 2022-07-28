import { Episode } from "../types";
import { fetchFromApi } from "./servicesUtils";
export default async function getEpisodeByURL(
  episode: string
): Promise<Episode> {
  const episodeResponse = await fetchFromApi(episode);
  const newEpisode: Episode = {
    ...episodeResponse,
    airDate: episodeResponse.air_date,
    codeName: episodeResponse.episode,
  };
  return newEpisode;
}
