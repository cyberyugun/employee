import { Route } from '@angular/router';

export const employeeRoutes: Route[] = [
  {
      path: '',
      loadComponent: () => import('./list/list.component'),
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./detail/detail.component'),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./edit/edit.component'),
  },
  {
    path: 'add',
    loadComponent: () => import('./add/add.component'),
  }
];
