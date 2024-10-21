import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  EMPTY,
  filter,
  flatMap,
  map,
  mergeMap,
  of,
  withLatestFrom,
} from 'rxjs';
import { PokeApiService } from '../../core/services/poke-api.service';
import {
  goToNextPageAction,
  listInitialPokemonAction,
  listInitialPokemonSuccessAction,
  listNextPokemonAction,
  listPokemonFailureAction,
  listPokemonSuccessAction,
} from './pokemon-list.actions';
import { ListLimit } from '../../constants/poke-api';
import {
  getIdFromPokemonUrl,
  getPokemonDreamImage,
  getPokemonMainImage,
} from '../../utils/poke-api.util';
import { Store } from '@ngrx/store';
import { selectNextUrl, selectPokemonState } from './pokemon-list.selectors';
import { PokemonListResponse } from '../../core/models/poke-api.model';

const processListApiResponse = (data: PokemonListResponse) => {
  const pokemonList = data.results.map((pokemon) => {
    const id = getIdFromPokemonUrl(pokemon.url);
    return {
      id,
      name: pokemon.name,
      url: pokemon.url,
      mainImage: getPokemonMainImage(id),
      dreamImage: getPokemonDreamImage(id),
    };
  });

  return {
    count: data.count,
    pokemonList,
    nextUrl: data.next,
    prevUrl: data.previous,
  };
};

export const loadInitalPokemons = createEffect(
  (actions$ = inject(Actions), pokeApiService = inject(PokeApiService)) => {
    return actions$.pipe(
      // on each listInitialPokemonAction action
      ofType(listInitialPokemonAction),
      // switch to a new observable that fetches the list and emits the success action
      mergeMap(() =>
        pokeApiService.getFirstPokemonList(ListLimit).pipe(
          map((data) =>
            listInitialPokemonSuccessAction(processListApiResponse(data))
          ),
          catchError((error) =>
            of(listPokemonFailureAction({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const loadNextPokemon = createEffect(
  (
    actions$ = inject(Actions),
    pokeApiService = inject(PokeApiService),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      // on each listNextPokemonAction action
      ofType(listNextPokemonAction),
      // get next url to fetch the list
      withLatestFrom(store.select(selectNextUrl)),
      // only fetch if next url is present
      filter(([_, nextUrl]) => !!nextUrl),
      // switch to a new observable that fetches the next page list and emits the success action
      mergeMap(([_, nextUrl]) =>
        pokeApiService.getPokemonListByUrl(nextUrl as string).pipe(
          map((data) => listPokemonSuccessAction(processListApiResponse(data))),
          catchError((error) =>
            of(listPokemonFailureAction({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const goToNextPage = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) => {
    return actions$.pipe(
      // on each listNextPokemonAction action
      ofType(goToNextPageAction),
      // get next url to fetch the list
      withLatestFrom(store.select(selectPokemonState)),
      mergeMap(([_, pokemonState]) => {
        if (
          pokemonState.allPokemon.length <=
          pokemonState.currentPage * ListLimit
        ) {
          return of(listNextPokemonAction());
        }
        return EMPTY;
      })
    );
  },
  { functional: true }
);
