import { FullCharacter } from "../types";

export default function getSingleCharacter(id: string) : Promise<FullCharacter>{
    const apiURL = `https://rickandmortyapi.com/api/character/${id}`;
    const fetchSingleCharacter = async () : Promise<FullCharacter> => {
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
        const { name, status, gender, image, species, origin, location, episode} = results;
        return {id, name, status, gender, image, species, origin, location, episode};

    }
    return fetchSingleCharacter();
}