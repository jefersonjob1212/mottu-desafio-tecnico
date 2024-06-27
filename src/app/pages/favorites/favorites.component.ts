import { Component } from '@angular/core';
import { FavoritesCharacterGridComponent } from '../../components/favorites-character-grid/favorites-character-grid.component';
import { CounterFavoritesStateService } from '../../services/counter-favorites-state.service';
import { CharacterStateService } from '../../services/character-state.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Character } from '../../models/character';

@Component({
  selector: 'mottu-favorites',
  standalone: true,
  imports: [FavoritesCharacterGridComponent, CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  favoritesIds$: Observable<number[]> = this.charactersFavoritesState.filterFavorites$;

  constructor(private charactersFavoritesState: CharacterStateService) {}
}
