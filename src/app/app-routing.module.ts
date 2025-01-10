// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => 
      import('./features/auth/auth.module')
        .then(m => m.AuthModule)
  },
  {
    path: 'patient-dashboard',
    loadChildren: () => 
      import('./features/patient-dashboard/patient-dashboard.module')
        .then(m => m.PatientDashboardModule)
  },
  { 
    path: '', 
    redirectTo: 'auth/login', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: 'auth/login' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }