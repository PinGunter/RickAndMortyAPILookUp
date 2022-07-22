import {Character, Filter} from '../types'

type characterResponse = {
    characters: Character[];
    nextUrl: string | null;
}

export default function getCharacters({filter, page} : {filter?: Filter, page?: number}) : characterResponse{
    let apiURL = `https://rickandmortyapi.com/api/character/?page=${page ? page : 1}`;
    if (filter){
        if (filter.status){
            apiURL = apiURL.concat(`&status=${filter.status}`);
        }
        if (filter.gender){
            apiURL = apiURL.concat(`&gender=${filter.gender}`);
        }
        if (filter.species){
            apiURL = apiURL.concat(`&species=${filter.species}`);
        }
    }
    

    const fetchCharacters = async () : Promise<characterResponse> => {
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error("Error while fetching data")
        const responseJson = await response.json(); 
        const {results} = responseJson;
        const {info} = responseJson;
        /**
         * id
         * Name
         * status
         * gender
         * image
         * species
         * origin
         * location
         */

         const characters = results.map((ch: any) :Character => {
            const {id, name, status, gender, image, species, type, origin, location, episode} = ch;
            return {id, name, status, gender, image, species,type,origin, location, episode};
         });
         return {characters, nextUrl: info.next};

    }

    return  fetchCharacters();

    

}