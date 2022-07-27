import { pageQuery, generateFiltersUrl, fetchFromApi } from './utils';
import { API_CHARACTERS } from './constants';
import {Character, CharacterFilterType} from '../types'

export default async function getCharacters(
    { filter, page }: { filter: CharacterFilterType, page?: number }
): Promise<Character[]> {
    const url = `${API_CHARACTERS}?${pageQuery(page)}&${generateFiltersUrl(filter)}`;
    const characters = await fetchFromApi(url);
    return characters as Character[];
}


