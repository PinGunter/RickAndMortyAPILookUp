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

export type Filter = {
    status: string,
    gender: string,
    species: string
}