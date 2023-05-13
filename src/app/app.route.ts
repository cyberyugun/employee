import { Route } from '@angular/router';
import { AuthGuard } from './helper/service/auth.guard';

export const appRoutes: Route[] = [
  {
      path: '',
      loadChildren: () => import('./pages/login/login.route').then(x => x.loginRoutes)
  },
  {
    path: 'employee',
    loadChildren: () => import('./pages/employee/employee.route').then(x => x.employeeRoutes),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component')
  }
];
