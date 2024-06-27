import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import {
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CounterFavoritesStateService } from '../../services/counter-favorites-state.service';

@Component({
  selector: 'mottu-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonToggleModule,
    MatIconModule,
    MatBadgeModule,
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {

  public counter$: Observable<number> = this.counterState.$count;
  
  constructor(private router: Router, private counterState: CounterFavoritesStateService) {}

  goHome(): void {
    this.router.navigate(['']);
  }
}
