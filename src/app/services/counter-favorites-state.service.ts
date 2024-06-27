import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StateService } from './state.service';

interface CounterFavoritesState {
  count: number;
}

const initialState: CounterFavoritesState = { count: 0 }

@Injectable({
  providedIn: 'root'
})
export class CounterFavoritesStateService extends StateService<CounterFavoritesState> {

  $count: Observable<number> = this.select(state => state.count);

  constructor() {
    super(initialState);
   }

   increment() {
    this.setState({ count: this.state.count + 1});
   }

   decrement() {
    this.setState({ count: this.state.count - 1});
   }
}
