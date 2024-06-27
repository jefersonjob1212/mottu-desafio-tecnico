import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesCharacterGridComponent } from './favorites-character-grid.component';

describe('FavoritesCharacterGridComponent', () => {
  let component: FavoritesCharacterGridComponent;
  let fixture: ComponentFixture<FavoritesCharacterGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesCharacterGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoritesCharacterGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
