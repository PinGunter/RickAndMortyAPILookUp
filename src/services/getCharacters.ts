import {Character, CharacterFilterType} from '../types'



export default function getCharacters({filter, page} : {filter?: CharacterFilterType, page?: number}){
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
    

    const fetchCharacters = async () : Promise<Character[]> => {
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

         const _characters = results.map((ch: Character) => {
            const {id, name, status, gender, image, species, type, origin, location, episode} = ch;
            return {id, name, status, gender, image, species,type,origin, location, episode};
         });
         return _characters
        }

        
        return  fetchCharacters();
        
    }
    

