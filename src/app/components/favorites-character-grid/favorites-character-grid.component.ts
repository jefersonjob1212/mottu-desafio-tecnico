import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CharacterStateService } from '../../services/character-state.service';
import { CounterFavoritesStateService } from '../../services/counter-favorites-state.service';
import { Observable } from 'rxjs';
import { Character } from '../../models/character';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'mottu-favorites-character-grid',
  standalone: true,
  imports: [MatCardModule, MatIconModule, FontAwesomeModule, 
    MatSnackBarModule, CommonModule],
  templateUrl: './favorites-character-grid.component.html',
  styleUrl: './favorites-character-grid.component.scss',
})
export class FavoritesCharacterGridComponent implements OnInit {

  @Input()
  favoritesIds: number[] | null = [];

  favoritesData: Character[] | null = [];
  singleFavorite: Character | null = new Character();
  
  constructor(
    library: FaIconLibrary,
    private apiService: CharacterService,
    private charactersFavoritesState: CharacterStateService,
    private counterFavoritesState: CounterFavoritesStateService,
    private snackBar: MatSnackBar
  ) {
    library.addIconPacks(fas);
  }

  ngOnInit(): void {
    this.buscarFavoritos();
  }

  buscarFavoritos() {
    this.apiService.getCharactersByIds(this.favoritesIds!).subscribe(res => {
      if((res as Character).id)
        this.singleFavorite = res as Character;
      else 
        this.favoritesData = res as Character[];
    });
  }

  removeToFavorites(id: number, name: string): void {
    this.charactersFavoritesState.removeFavorite({ selectedIds: [id] });
    this.counterFavoritesState.decrement();
    this.buscarFavoritos();
    this.snackBar.open(`${name} removido a lista de favoritos.`, 'OK', {
      duration: 3000,
    });
  }

  get isEmpty(): boolean {
    return this.favoritesIds?.length === 0;
  }
}
