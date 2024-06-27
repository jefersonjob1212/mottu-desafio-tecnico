import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'favorites',
        loadComponent: () => import('./pages/favorites/favorites.component').then(c => c.FavoritesComponent)
    }
];
