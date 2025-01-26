import { Routes } from '@angular/router';
import { HomeComponent } from './events/home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/pitesti',
    pathMatch: 'full',
  },
  {
    path: 'home/:city',
    component: HomeComponent,
  },
  {
    path: '**',
    redirectTo: 'home/pitesti',
  },
];
