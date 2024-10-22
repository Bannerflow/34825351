import { createAction, props } from '@ngrx/store';
import { Pokemon } from '../../shared/models/pokemon.model';

// calls pokeapi to load first list of pokemon with the limit
export const listInitialPokemonAction = createAction(
  '[API] List Initial Pokemon'
);

// list of initial pokemon is successfully fetched
export const listInitialPokemonSuccessAction = createAction(
  '[API] List Initial Pokemon Success',
  props<{
    pokemonList: Pokemon[];
    nextUrl: string | null;
    prevUrl: string | null;
    count: number;
  }>()
);

// calls pokeapi to load next list of pokemon with the limit
export const listNextPokemonAction = createAction('[API] List Next Pokemon');

// list of pokemon is successfully fetched
export const listPokemonSuccessAction = createAction(
  '[API] List Pokemon Success',
  props<{
    pokemonList: Pokemon[];
    nextUrl?: string | null;
    prevUrl?: string | null;
  }>()
);

// could not fetch list of pokemon from api
export const listPokemonFailureAction = createAction(
  '[API] List Pokemon Failure',
  props<{ error: string }>()
);

// checks if next is needed to be loaded and increments current page
export const goToNextPageAction = createAction('[Pokemon List Page] Next Page');

// load previous items into the view
export const goToPrevPageAction = createAction(
  '[Pokemon List Page] Previous Page'
);

// load previous items into the view
export const goToRandomPokemonDetailAction = createAction(
  '[App] Go to Random Pokemon'
);
