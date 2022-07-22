import {Character} from '../types'

export default function getCharacterSearch({keyword, page}: {keyword: string, page?: number}) : Promise<Character[]>{
    const apiURL =  `https://rickandmortyapi.com/api/character/?name=${keyword}`;
    if (page) apiURL.concat(`?page=${page}`)

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
            const {id, name, status, gender, image, species, origin, location, episode} = ch;
            return {id, name, status, gender, image, species, origin, location, episode};
        })

    }

    return fetchCharacters();

    

}