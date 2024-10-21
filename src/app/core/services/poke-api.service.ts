import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonDetails } from '../../shared/models/pokemon.model';
import { PokemonListResponse } from '../models/poke-api.model';
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
      `${this.baseUrl}?offset=0&limit=${listLimit}`
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
  getPokemonDetails(id: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.baseUrl}/${id}/`);
  }

  /**
   * Fetches a pokemon ability detail by given url
   * @param url url to the pokemon ability detail
   */
  getPokemonAbilityByUrl(url: string): Observable<any> {
    return this.http.get(url);
  }
}
