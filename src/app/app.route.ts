import { Route } from '@angular/router';
import { authGuard } from './service/auth.guard';

export const appRoutes: Route[] = [
  {
      path: '',
      loadComponent: () => import('./app.component'),
      loadChildren: () => import('./pages/login/login.route').then(x => x.loginRoutes)
  },
  {
    path: 'employee',
    loadChildren: () => import('./pages/employee/employee.route').then(x => x.employeeRoutes),
    canActivate: [authGuard]
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component')
  }
];
