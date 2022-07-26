import {Character, CharacterFilter} from '../types'

type characterResponse = {
    characters: Character[];
}

export default function getCharacters({filter, page} : {filter?: CharacterFilter, page?: number}) : Promise<characterResponse>{
    let apiURL = `https://rickandmortyapi.com/api/character/?page=${page ? page : 1}`;
    if (filter){
        if (filter.name){
            apiURL = `${apiURL}&name=${filter.name}`;
        }
        if (filter.status){
            apiURL = `${apiURL}&status=${filter.status}`;        
        }
        if (filter.gender){
            apiURL = `${apiURL}&gender=${filter.gender}`;        
        }
        if (filter.species){
            apiURL = `${apiURL}&species=${filter.species}`;
        }
    }
    

    const fetchCharacters = async () : Promise<characterResponse> => {
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error("Error while fetching data")
        const responseJson = await response.json(); 
        const {results} = responseJson;
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

         const _characters = results.map((ch: any) :Character => {
            const {id, name, status, gender, image, species, type, origin, location, episode} = ch;
            return {id, name, status, gender, image, species,type,origin, location, episode};
         });
         return {characters: _characters};

    }

    return  fetchCharacters();

    

}