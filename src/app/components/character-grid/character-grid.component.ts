import { Component, Input, OnInit, inject } from '@angular/core';
import { Character } from '../../models/character';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRippleModule } from '@angular/material/core';
import { CharacterService } from '../../services/character.service';
import { FormsModule } from '@angular/forms';
import { IFilterOptions } from '../../shared/interfaces/i-filter-options';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { CommonModule } from '@angular/common';
import { CounterFavoritesStateService } from '../../services/counter-favorites-state.service';
import { CharacterStateService, FilterFavorites } from '../../services/character-state.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCharacterComponent } from '../dialog-character/dialog-character.component';

@Component({
  selector: 'mottu-character-grid',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatRippleModule,
    FontAwesomeModule,
    CommonModule,
  ],
  templateUrl: './character-grid.component.html',
  styleUrl: './character-grid.component.scss',
})
export class CharacterGridComponent implements OnInit {
  name: string = '';

  data: Character[] | undefined = [];

  @Input()
  favorites: number[] | null = [];

  readonly dialog = inject(MatDialog);

  constructor(
    private service: CharacterService,
    library: FaIconLibrary,
    private counterFavoritesState: CounterFavoritesStateService,
    private charactersState: CharacterStateService,
    private snackBar: MatSnackBar
  ) {
    library.addIconPacks(fas, far);
  }

  get isEmpty(): boolean {
    return this.data?.length === 0;
  }

  ngOnInit(): void {
    this.service.getCharacters().subscribe(resp => this.data = resp?.results);
  }

  filterByName(): void {
    let filter: IFilterOptions | undefined = { name: this.name };
    if (!filter.name) filter = undefined;
    this.service.getCharacters(filter).subscribe(resp => this.data = resp?.results);
  }

  addToFavorites(id: number, name: string): void {
    this.charactersState.addFavorites({ selectedIds: [id] });
    this.counterFavoritesState.increment();
    this.snackBar.open(`${name} adicionado a lista de favoritos.`, 'OK', {
      duration: 3000,
    });
  }

  removeToFavorites(id: number, name: string): void {
    this.charactersState.removeFavorite({ selectedIds: [id] });
    this.counterFavoritesState.decrement();
    this.snackBar.open(`${name} removido a lista de favoritos.`, 'OK', {
      duration: 3000,
    });
  }

  isFavorite(id: number): boolean {
    const index = this.favorites?.indexOf(id);
    return index !== undefined && index >= 0;
  }

  openInfoCharacter(item: Character) {
    this.dialog.open(DialogCharacterComponent, {
      data: item,
      width: '450'
    });
  }
}
