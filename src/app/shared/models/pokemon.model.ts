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
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other?: {
      'official-artwork'?: {
        front_default: string;
      };
    };
  };
  abilities: {
    ability: {
      name: string;
    };
  }[];
  evolutions?: Evolution[];
}

export interface Evolution {
  id: number;
  name: string;
  image: string;
}
