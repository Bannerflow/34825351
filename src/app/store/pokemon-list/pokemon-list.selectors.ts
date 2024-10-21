import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import { PokemonListState } from './pokemon-list.reducer';
import { ListLimit } from '../../constants/poke-api';

export const selectPokemonState =
  createFeatureSelector<PokemonListState>('pokemonList');

// select the pokemon list that should be viewed in the table
export const selectViewPokemons = createSelector(
  selectPokemonState,
  (state: PokemonListState) =>
    state.allPokemon.slice(
      ListLimit * (state.currentPage - 1),
      ListLimit * state.currentPage
    )
);

// select the loading status of the pokemon list
export const selectPokemonListLoading = createSelector(
  selectPokemonState,
  (state: PokemonListState) => state.loading
);

// select the next url to load the pokemon list
export const selectNextUrl = createSelector(
  selectPokemonState,
  (state: PokemonListState) => state.nextUrl
);

// select as boolean if user is allowed to go to the next page
export const selectHasNext = createSelector(
  selectPokemonState,
  (state: PokemonListState) =>
    state.currentPage < Math.ceil((state.count ?? 0) / ListLimit)
);

// select as boolean if user is allowed to go to the previous page
export const selectHasPrev = createSelector(
  selectPokemonState,
  (state: PokemonListState) => state.currentPage > 1
);
