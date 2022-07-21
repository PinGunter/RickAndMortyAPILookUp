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

export type FullCharacter = {
    id: string,
    name: string,
    status: string, 
    gender: string, 
    image: string,
    species: string,
    origin: Location,
    location : Location,
    episode: string[]  
}

export type Filter = {
    status: string,
    gender: string,
    species: string
}