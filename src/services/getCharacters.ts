import {Character, Filter} from '../types'

export default function getCharacters({filter, page} : {filter?: Filter, page?: number}) : Promise<Character[]>{
    let apiURL = "https://rickandmortyapi.com/api/character/?";
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
        return results.map((ch: any) => {
            const {id, name, status, gender, image, species, origin, location} = ch;
            return {id, name, status, gender, image, species, origin, location};
        })

    }

    return fetchCharacters();

    

}