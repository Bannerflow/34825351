import { Injectable } from '@angular/core';
import { PokeApiService } from '../../core/services/poke-api.service';
import {
  Observable,
  BehaviorSubject,
  tap,
  mergeMap,
  map,
  forkJoin,
} from 'rxjs';
import {
  PokemonDetails,
  PokemonEvolution,
} from '../../shared/models/pokemon.model';
import {
  EvolutionChainLink,
  PokemonDetailsResponse,
} from '../../core/models/poke-api.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonDetailService {
  private pokemonDetailsSubject = new BehaviorSubject<PokemonDetails | null>(
    null
  );
  private pokemonEvolutionsSubject = new BehaviorSubject<PokemonDetails[]>([]);
  pokemonDetails$ = this.pokemonDetailsSubject.asObservable();
  pokemonEvolutions$ = this.pokemonEvolutionsSubject.asObservable();

  constructor(private pokeApiService: PokeApiService) {}

  /**
   * Loads current pokemon details and push it to the subject
   * @param id id of pokemon
   */
  loadPokemonDetails(id: string): Observable<PokemonDetailsResponse> {
    this.pokemonDetailsSubject.next(null);

    return this.pokeApiService
      .getPokemonDetails(id)
      .pipe(
        tap((details) =>
          this.pokemonDetailsSubject.next(this.processPokemonDetails(details))
        )
      );
  }

  /**
   * Loads evolution chain for the given pokemon id
   * This function gets evolution chain, converts the chain to array
   * and load details for each evolution
   * @param id id of pokemon
   */
  loadPokemonEvolutionChain(id: string): Observable<PokemonDetailsResponse[]> {
    this.pokemonEvolutionsSubject.next([]);

    return this.pokeApiService.getPokemonSpecies(id).pipe(
      mergeMap((species) =>
        this.pokeApiService
          .getPokemonEvolutionChainByUrl(species.evolution_chain.url)
          .pipe(
            map((evolutionChain) =>
              this.convertEvolutionChainToArray(evolutionChain.chain)
            )
          )
          .pipe(this.loadEvolutionDetails.bind(this))
      )
    );
  }

  /**
   * Loads details for each evolution and push to evolution subject
   * @param evolutionsArray$ array of evolutions as an observable
   */
  private loadEvolutionDetails(
    evolutionsArray$: Observable<PokemonEvolution[]>
  ): Observable<PokemonDetailsResponse[]> {
    return evolutionsArray$.pipe(
      mergeMap((evolutionArray) =>
        forkJoin(
          evolutionArray.map((evolution) =>
            this.pokeApiService
              .getPokemonSpeciesByUrl(evolution.speciesUrl)
              .pipe(
                mergeMap(({ id: speciesId }) =>
                  this.pokeApiService
                    .getPokemonDetails(speciesId.toString())
                    .pipe(
                      tap((speciesDetail) =>
                        this.pokemonEvolutionsSubject.next([
                          ...this.pokemonEvolutionsSubject.getValue(),
                          this.processPokemonDetails(speciesDetail),
                        ])
                      )
                    )
                )
              )
          )
        )
      )
    );
  }

  /**
   * Converts pokemon details to PokemonDetails type for presention
   * @param details details response got from api
   */
  private processPokemonDetails(
    details: PokemonDetailsResponse
  ): PokemonDetails {
    return {
      id: details.id.toString(),
      name: details.name,
      mainImage: details.sprites.front_default,
      dreamImage: details.sprites.other?.dream_world?.front_default,
      abilities: details.abilities.map(({ ability: { name } }) => name),
    };
  }

  /**
   * Traverse Evolution chain by doing bfs using a queue on the chain and producing array
   * @param chain chain object
   */
  private convertEvolutionChainToArray(chain: EvolutionChainLink) {
    // traverse queue
    const evolutionsToTraverse: EvolutionChainLink[] = [chain];
    // final evolutions array
    const evolutions: PokemonEvolution[] = [];

    while (evolutionsToTraverse.length) {
      const evolution = evolutionsToTraverse.shift() as EvolutionChainLink;

      evolutions.push({
        name: evolution.species.name,
        speciesUrl: evolution.species.url,
      });

      if (evolution.evolves_to?.length) {
        evolutionsToTraverse.push(...evolution.evolves_to);
      }
    }
    return evolutions;
  }
}
