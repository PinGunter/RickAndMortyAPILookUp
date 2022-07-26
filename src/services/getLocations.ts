import {LocationFilterType, Location} from '../types'


export default function getLocations({filter, page} : {filter: LocationFilterType, page?: number}){
    let apiURL = `https://rickandmortyapi.com/api/location/?page=${page ? page : 1}`;
    if (filter){
        if (filter.name){
            apiURL = `${apiURL}&name=${filter.name}`;
        }
        if (filter.type){
            apiURL = `${apiURL}&type=${filter.type}`;        
        }

    }
    

    const fetchLocations = async () : Promise<Location[]> => {
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error("Error while fetching data")
        const responseJson = await response.json(); 
        const {results} = responseJson;

        return results.map((loc : Location) => {
            const {id, name, type, dimension, residents} = loc;
            return {id, name, type, dimension, residents};
        })


    }

    return  fetchLocations();

    


}