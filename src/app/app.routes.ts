import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'po-distribution',
    pathMatch: 'full',
  },
  {
    path: 'po-distribution',
    loadChildren: () =>
      import('./features/pallet-distribution/pallet-distribution.module').then(
        (m) => m.PalletDistributionModule
      ),
  },
  {
    path: '**',
    redirectTo: 'po-distribution',
  },
];
