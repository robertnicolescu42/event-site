import { Routes } from '@angular/router';
import { HomeComponent } from './events/home/home.component';
import { ConfidentialityComponent } from './core/misc/confidentiality/confidentiality.component';

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
    path: 'confidentiality',
    component: ConfidentialityComponent,
  },
  {
    path: '**',
    redirectTo: 'home/pitesti',
  },
];
