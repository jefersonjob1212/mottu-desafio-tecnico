import { Injectable } from '@angular/core';
import { Character } from '../models/character';
import { StateService } from './state.service';
import { Observable, filter, map } from 'rxjs';
import { IFilterOptions } from '../shared/interfaces/i-filter-options';

interface CharacterState {
  characters: Character[];
  favorites: Character[];
  selectedCharacterId?: number;
  filter?: IFilterOptions;
  filterFavorites: FilterFavorites;
}

export interface FilterFavorites {
  selectedIds: number[];
}

const initialState: CharacterState = {
  characters: [],
  favorites: [],
  selectedCharacterId: undefined,
  filterFavorites: {
    selectedIds: [],
  },
};

@Injectable({
  providedIn: 'root',
})
export class CharacterStateService extends StateService<CharacterState> {

  filterFavorites$: Observable<number[]> = this.select(
    (state) => this.getStateFavoritesCharacters(state.filterFavorites.selectedIds)
  );

  constructor() {
    super(initialState);
  }

  addFavorites(filterFavorites: FilterFavorites) {
    let idsState = this.state.filterFavorites.selectedIds;
    this.state.filterFavorites.selectedIds = idsState.concat(
      filterFavorites.selectedIds
    );
    this.setState({
      filterFavorites: {
        ...this.state.filterFavorites,
        ...idsState,
      },
    });
  }

  removeFavorite(filterFavorites: FilterFavorites) {
    let idsState = this.state.filterFavorites.selectedIds;
    const index = idsState.indexOf(filterFavorites.selectedIds[0]);
    this.state.filterFavorites.selectedIds.splice(index, 1);
    this.setState({
      filterFavorites: {
        ...this.state.filterFavorites,
      },
    });
  }

  getStateFavoritesCharacters(selectedIds: number[]): number[] {
    return selectedIds;
  }
}
