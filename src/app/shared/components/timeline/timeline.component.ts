import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Appointment, Patient } from '../../../core/models/patient';


@Component({
  selector: 'app-timeline',
  standalone:false,
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnChanges {
  @Input() patient: Patient | null = null;
  currentYear = new Date().getFullYear();
  yearsToShow: number[] = [];
  appointmentsByYear: { [key: number]: Appointment[] } = {};
  selectedAppointment: Appointment | null = null;
  showModal = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['patient'] && this.patient?.past_appointments) {
      this.updateYearsToShow();
      this.updateAppointmentsByYear();
    }
  }

  private updateYearsToShow(): void {
    if (!this.patient?.past_appointments.length) return;

    const years = this.patient.past_appointments.map((apt) => {
      return new Date(apt.date).getFullYear();
    });

    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);

    this.yearsToShow = [];
    for (let year = minYear; year <= maxYear; year++) {
      this.yearsToShow.push(year);
    }
  }

  private updateAppointmentsByYear(): void {
    this.appointmentsByYear = {};

    if (!this.patient?.past_appointments) return;

    this.yearsToShow.forEach((year) => {
      this.appointmentsByYear[year] = this.patient!.past_appointments.filter((appointment) => {
        const appointmentYear = new Date(appointment.date).getFullYear();
        return appointmentYear === year;
      });
    });
  }

  formatDateToMonth(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleString('default', { month: 'short' });
  }

  formatFullDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }

  getAppointmentTime(): string {
    return "12:00 - 1:00 pm";
  }

  toggleAppointment(appointment: Appointment): void {
    this.selectedAppointment = this.selectedAppointment === appointment ? null : appointment;
  }

  onClose(): void {
    this.selectedAppointment = null;
  }
}