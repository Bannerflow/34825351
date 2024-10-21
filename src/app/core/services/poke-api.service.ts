import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PokemonDetailsResponse,
  PokemonEvolutionChainResponse,
  PokemonListResponse,
  PokemonSpeciesResponse,
} from '../models/poke-api.model';
import { PokeApiBaseUrl } from '../../constants/poke-api';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private baseUrl = PokeApiBaseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Fetches first page of pokemon list by given limit
   * @param listLimit limit of the first page
   */
  getFirstPokemonList(listLimit: number): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(
      `${this.baseUrl}/pokemon/?offset=0&limit=${listLimit}`
    );
  }

  /**
   * Fetches list of pokemon from poke api by given url
   * @param url url to fetch
   */
  getPokemonListByUrl(url: string): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(url);
  }

  /**
   * Fetches a pokemon detail by given url
   * @param id id of the pokemon
   */
  getPokemonDetails(id: string): Observable<PokemonDetailsResponse> {
    return this.http.get<PokemonDetailsResponse>(
      `${this.baseUrl}/pokemon/${id}/`
    );
  }

  /**
   * Fetches pokemon species detail by given id
   * @param id id of the species
   */
  getPokemonSpecies(id: string): Observable<PokemonSpeciesResponse> {
    return this.http.get<PokemonSpeciesResponse>(
      `${this.baseUrl}/pokemon-species/${id}/`
    );
  }

  /**
   * Fetches pokemon species detail by given url
   * @param url url of the species
   */
  getPokemonSpeciesByUrl(url: string): Observable<PokemonSpeciesResponse> {
    return this.http.get<PokemonSpeciesResponse>(url);
  }

  /**
   * Fetches pokemon species detail by given id
   * @param id if of the species
   */
  getPokemonEvolutionChainByUrl(
    url: string
  ): Observable<PokemonEvolutionChainResponse> {
    return this.http.get<PokemonEvolutionChainResponse>(url);
  }
}
