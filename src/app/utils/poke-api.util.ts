/**
 * Get pokemon id from url by splitting the url by slash
 * and get the number behind the last slash
 * @param url pokemon detail url
 */
export const getIdFromPokemonUrl = (url: string): string => {
  return url.split('/').at(-2) as string;
};

/**
 * Generate pokemon main image by adding id to a default url
 * This is workaround to avoid additional calls for each pokemon
 * @param id pokemon id
 */
export const getPokemonMainImage = (id: string): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

/**
 * Generate pokemon dream image by adding id to a default url
 * This is workaround to avoid additional calls for each pokemon
 * @param id pokemon id
 */
export const getPokemonDreamImage = (id: string): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
};
