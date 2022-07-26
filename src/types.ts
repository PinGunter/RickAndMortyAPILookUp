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

export type CharacterFilter = {
    name: string,
    status: string,
    gender: string,
    species: string
}


export const defaultCharacterFilter = {
    status: "",
    gender: "",
    species: "",
    name: "",
  };

export type LocationFilter = {
    name: string,
    type: string,
}

export const defaultLocationFilter = {
    name: "",
    type: ""
}