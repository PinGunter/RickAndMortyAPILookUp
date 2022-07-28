export type Location = {
    id?: string,
    name: string, 
    url? : string,
    type?: string,
    dimension?: string,
    residents?: string[],
}

export type Character = {
    id: string,
    name: string,
    status: string, 
    gender: string, 
    image: string,
    species: string,
    type: string,
    origin: Location,
    location : Location,
    episode: string[]  
}

export type Episode = {
    id: string, 
    name: string,
    airDate: string,
    codeName: string
}

export type dataType = Character | Location;


export type CharacterFilterType = {
    name?: string,
    status?: string,
    gender?: string,
    species?: string
}


export const defaultCharacterFilter : CharacterFilterType = {
    status: "",
    gender: "",
    species: "",
    name: "",
  };

export type LocationFilterType = {
    name?: string,
    type?: string,
}

export const defaultLocationFilter = {
    name: "",
    type: ""
}