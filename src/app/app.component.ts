import { Component, OnInit } from '@angular/core';
import { PatientService } from './core/services/patient.service';
import { Patient } from './core/models/patient';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  patients: Patient[] = [];
  selectedPatient: Patient | null = null;

  constructor(private patientService: PatientService) {
    this.getPatients();
  }

  getPatients() {
    this.patientService.getPatients().subscribe((data) => {
      this.patients = data;
    });
  }

  selectPatient(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedIndex = target.value;
    this.selectedPatient = this.patients[+selectedIndex]; 
  }
  
}
