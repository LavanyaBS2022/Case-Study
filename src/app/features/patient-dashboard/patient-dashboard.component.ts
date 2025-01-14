import { Component, OnInit } from '@angular/core';
import { Patient } from '../../core/models/patient';
import { PatientService } from '../../core/services/patient.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-patient-dashboard',
  standalone: false,
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss'] ,
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ])
  ]
})
export class PatientDashboardComponent implements OnInit {
  selectedIcon: string | null = null; 
  selectedPatient: Patient | null = null;
  months: { month: string; treatment: string; color: string }[] = [];
  patients: Patient[] = [];
  events: any[] = [];
  allAppointments: { date: string; type: string }[] = [];
  showModal: boolean = false;
  currentDate:Date=new Date
  constructor(private patientService: PatientService) {
    
  }

  ngOnInit() {
    this.patientService.getPatients().subscribe((patients) => {
      this.patients = patients;
    });
  }

  onPatientSelected(patient: Patient) {
    this.selectedPatient = patient;
    if (patient) {
      this.updateTimeline(patient);
    }
  }

  selectIcon(icon: string) {
    this.selectedIcon = icon; 
  }

  updateTimeline(patient: Patient) {
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    
    this.events = patient.past_appointments
      .filter(apt => new Date(apt.date) >= twoYearsAgo)
      .map((apt) => ({
      status: apt.type,
      date: apt.date,
      icon: 'pi pi-circle-fill',
      color: '#9CE6DC'
    }));
  }

  getEventPosition(index: number): string {
    if (!this.selectedPatient?.past_appointments?.length) return '0%';
    return `${(index * 100) / (this.selectedPatient.past_appointments.length - 1)}%`;
  }

  onViewAll() {
    if (this.selectedPatient) {
      console.log("Selected Patient:", this.selectedPatient);
      this.allAppointments = [
        ...this.selectedPatient.past_appointments,
        ...this.selectedPatient.upcoming_appointments.map((apt) => ({
          date: apt.date,
          type: apt.type
        }))
      ];
      console.log("All Appointments:", this.allAppointments);
      this.showModal = true; 
    }
  }

  closeModal() {
    this.showModal = false; 
  }

  formatDate(date: string): string {
    console.log(date)
    const dateObj = new Date(date);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return dateObj.toLocaleDateString('en-US', options);
  }

  
}

