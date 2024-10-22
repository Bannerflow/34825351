// Poke api list response type
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

// Poke api pokemon detail response type
export interface PokemonDetailsResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other?: {
      dream_world?: {
        front_default: string;
      };
    };
  };
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

// Poke api species response
export interface PokemonSpeciesResponse {
  id: number;
  evolution_chain: { url: string };
}

// Poke api evolution chain response for a species id
export interface PokemonEvolutionChainResponse {
  id: number;
  chain: EvolutionChainLink;
}

// Poke api recursive evolution link that has evolves to to itself (chaining)
export interface EvolutionChainLink {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionChainLink[];
}
