import { Character } from "../types";

export default function getSingleCharacter(id: string) : Promise<Character>{
    const apiURL = `https://rickandmortyapi.com/api/character/${id}`;
    const fetchSingleCharacter = async () : Promise<Character> => {
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error("Error while fetching data")
        const responseJson = await response.json(); 
        const results = await responseJson;
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
        const { name, status, gender, image, species, type, origin, location, episode} = results;
        return {id, name, status, gender, image, species, type, origin, location, episode};

    }
    return fetchSingleCharacter();
}