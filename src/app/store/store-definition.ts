import { pokemonListReducer } from './pokemon-list/pokemon-list.reducer';
import { provideEffects } from '@ngrx/effects';
import * as pokemonListEffect from './pokemon-list/pokemon-list.effects';

// all reducers of the app store
export const reducers = { pokemonList: pokemonListReducer } as const;

// all effects of the app
export const effects: Parameters<typeof provideEffects> = [
  pokemonListEffect,
] as const;
