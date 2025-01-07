import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientDashboardRoutingModule } from './patient-dashboard-routing.module';
import { PatientDashboardComponent } from './patient-dashboard.component';
import { SharedModule } from '../../shared.module';
import { PrimeNGModule } from '../../core/models/primeng.model';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PatientDashboardComponent,
  ],
  imports: [
    CommonModule,
    PatientDashboardRoutingModule,
    SharedModule,
PrimeNGModule,
FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class PatientDashboardModule { }
