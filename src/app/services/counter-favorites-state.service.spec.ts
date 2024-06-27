import { TestBed } from '@angular/core/testing';

import { CounterFavoritesStateService } from './counter-favorites-state.service';

describe('CounterFavoritesStateService', () => {
  let service: CounterFavoritesStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterFavoritesStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
