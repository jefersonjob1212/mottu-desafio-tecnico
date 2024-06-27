import { Component, OnInit } from '@angular/core';
import { CharacterGridComponent } from '../../components/character-grid/character-grid.component';
import { Observable } from 'rxjs';
import { Character } from '../../models/character';
import { CharacterStateService, FilterFavorites } from '../../services/character-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CharacterGridComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  favorites$: Observable<number[]> = this.characterState.filterFavorites$;

  constructor(private characterState: CharacterStateService) {}
}
