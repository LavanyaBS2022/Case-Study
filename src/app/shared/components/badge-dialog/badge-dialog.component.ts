
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Appointment, Patient } from '../../../core/models/patient';

@Component({
  selector: 'app-badge-dialog',
  standalone: false,
  templateUrl: './badge-dialog.component.html'
})
export class BadgeDialogComponent {
  @Input() patient!: Patient;
  @Input() selectedAppointment!: Appointment;
  @Output() close = new EventEmitter<void>();

  getTotalFee(): string {
    return this.patient.total.total_fee;
  }

  getTotalInsuranceEst(): string {
    return this.patient.total.insurance_est;
  }

  getTotalPatientEst(): string {
    return this.patient.total.patient_est;
  }

  onClose() {
    this.close.emit();
  }
}