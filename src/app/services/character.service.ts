import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, catchError, last, map, of } from 'rxjs';
import { Character } from '../models/character';
import { PageResult } from '../models/page-result';
import { IFilterOptions } from '../shared/interfaces/i-filter-options';
import { FilterFavorites } from './character-state.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private endpoint = environment.apiUrlBase;

  constructor(private http: HttpClient) { }

  getCharacters(filter?: IFilterOptions): Observable<PageResult<Character> | null> {
    let uri = `${this.endpoint}/character`;
    if(this.hasFilter(filter)) {
      uri += `?${this.formatFilter(filter)}`
    }
    return this.http.get<PageResult<Character> | null>(uri, { observe: 'response' }).pipe(
      last(),
      map(resp => {
        return resp.body;
      }),
      catchError((err) => of(err))
    );
  }

  getCharactersByIds(filter?: number[]): Observable<Character[] | Character | null> {
    let uri = `${this.endpoint}/character/${filter?.toString()}`;
    return this.http.get<PageResult<Character> | null>(uri, { observe: 'response' }).pipe(
      last(),
      map(resp => {
        return resp.body;
      }),
      catchError((err) => of(err))
    );
  }

  private hasFilter(filter?: IFilterOptions): boolean {
    return filter !== null;
  }

  private formatFilter(filter?: IFilterOptions): string {
    let params: string = '';
    params += filter?.name ? `name=${filter.name}` : '';
    params += filter?.gender ? `&gender=${filter.gender}` : '';
    params += filter?.species ? `&species=${filter.species}` : '';
    params += filter?.status ? `&status=${filter.status}` : '';
    params += filter?.type ? `&type=${filter.type}` : '';
    return params;
  }
}
