// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/guard/auth.guard';
import { ForbiddenComponent } from './features/auth/components/forbidden/forbidden.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => 
      import('./features/auth/auth.module')
        .then(m => m.AuthModule)
  },
  { 
    path: 'forbidden', 
    component: ForbiddenComponent 
  }, // Move this before the wildcard route
  {
    path: 'patient-dashboard',
    loadChildren: () => 
      import('./features/patient-dashboard/patient-dashboard.module')
        .then(m => m.PatientDashboardModule),
    canActivate: [AuthGuard]
  },
  { 
    path: '', 
    redirectTo: 'auth/login', 
    pathMatch: 'full' 
  },
  {
    path: 'dashboard',
    redirectTo: 'features/dashboard',
  },
  { path: '**', redirectTo: '/forbidden' } // Keep wildcard route at the end
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }