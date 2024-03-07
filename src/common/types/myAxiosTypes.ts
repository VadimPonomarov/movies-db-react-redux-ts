export interface IRiCkAndMortyInfo {
    info: {
        count?: number,
        pages?: number,
        next: string,
        prev: string,
    }
}

export interface IRickAndMortyCharacter {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: string,
    location: string,
    image: string,
    episode: IRickAndMortyEpisode[],
    url: string,
    created: string
}

export interface IRickAndMortyResult {
    id: number,
    name: string,
    air_date: string
    episode: string,
    characters: string[],
    url: string,
    created: string,
}

export interface IRickAndMortyEpisode extends IRiCkAndMortyInfo {
    results: IRickAndMortyResult[]
}

export type CharacterType = Pick<IRickAndMortyCharacter, "id" | "name" | "image">