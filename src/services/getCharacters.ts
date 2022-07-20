export type Location = {
    name: string, 
    url : string
}

export type Character = {
    id: string,
    name: string,
    status: string, 
    gender: string, 
    image: string,
    species: string,
    origin: Location,
    location : Location    
}

export default function getCharacters(page?: number) : Promise<Character[]>{
    const apiURL = "https://rickandmortyapi.com/api/character/";
    if (page) apiURL.concat(`?page=${page}`)

    const fetchCharacters = async () : Promise<Character[]> => {
        const response = await fetch(apiURL);
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