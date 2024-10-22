import { createReducer, on } from '@ngrx/store';
import { Pokemon } from '../../shared/models/pokemon.model';
import {
  goToNextPageAction,
  goToPrevPageAction,
  listInitialPokemonSuccessAction,
  listNextPokemonAction,
  listPokemonFailureAction,
  listPokemonSuccessAction,
} from './pokemon-list.actions';

// state of the pokemon list
export interface PokemonListState {
  allPokemon: Pokemon[];
  nextUrl: string | null;
  prevUrl: string | null;
  error: string | null;
  loading: boolean;
  currentPage: number;
  count?: number;
}

export const initialState: PokemonListState = {
  allPokemon: [],
  nextUrl: null,
  prevUrl: null,
  error: null,
  loading: true,
  currentPage: 1,
};

export const pokemonListReducer = createReducer(
  initialState,
  on(listNextPokemonAction, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),
  on(
    listInitialPokemonSuccessAction,
    (state, { pokemonList, nextUrl, prevUrl, count }) => ({
      ...state,
      allPokemon: pokemonList,
      nextUrl,
      prevUrl,
      error: null,
      loading: false,
      count,
    })
  ),
  on(listPokemonSuccessAction, (state, { pokemonList, nextUrl, prevUrl }) => ({
    ...state,
    allPokemon: [...state.allPokemon, ...pokemonList],
    ...(nextUrl !== undefined && { nextUrl }),
    ...(prevUrl !== undefined && { prevUrl }),
    error: null,
    loading: false,
  })),
  on(listPokemonFailureAction, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(goToNextPageAction, (state) => ({
    ...state,
    currentPage: state.currentPage + 1,
  })),
  on(goToPrevPageAction, (state) => ({
    ...state,
    currentPage: state.currentPage > 1 ? state.currentPage - 1 : 1,
  }))
);
