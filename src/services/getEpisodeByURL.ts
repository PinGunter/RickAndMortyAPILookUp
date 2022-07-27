import { Episode } from '../types';
import { fetchFromApi } from './utils';

export default async function getEpisodeByURL(episodeUrl: string): Promise<Episode> {
    const rawEpisode = await fetchFromApi(episodeUrl);
    const episode: Episode = {
        id: rawEpisode.id,
        name: rawEpisode.name,
        codeName: rawEpisode.episode,
        airDate: rawEpisode.air_date,
    }
    return episode
}