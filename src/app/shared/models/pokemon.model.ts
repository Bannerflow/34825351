export interface Pokemon {
  id: string;
  name: string;
  url: string;
  mainImage: string;
  dreamImage: string;
}

export interface PokemonDetails {
  id: string;
  name: string;
  mainImage: string;
  dreamImage?: string;
  abilities: string[];
}

export interface PokemonEvolution {
  name: string;
  speciesUrl: string;
}

export interface PokemonEvolutionWithId extends PokemonEvolution {
  id: string;
}
