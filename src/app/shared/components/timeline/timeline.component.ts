import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Appointment, Patient } from '../../../core/models/patient';

interface YearOption {
  label: string;
  value: number | 'view-all';
}

@Component({
  selector: 'app-timeline',
  standalone: false,
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnChanges {
  @Input() patient: Patient | null = null;
  currentYear: number | 'view-all' = new Date().getFullYear();
  yearsToShow: number[] = [];
  mode: 'left' | 'right' | 'alternate' = 'left';
  appointmentsByYear: Record<number | 'view-all', Appointment[]> = {
    'view-all': [] 
  };
  selectedAppointment: Appointment | null = null;
  showModal: boolean = false;
  yearOptions: YearOption[] = [];
  sortOrder: 'asc' | 'desc' = 'desc';
  filteredAppointments: Appointment[] = [];
  defaultYear: number = new Date().getFullYear(); 
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['patient'] && this.patient?.past_appointments) {
      this.updateYearsToShow();
      this.updateAppointmentsByYear();
      this.initializeYearOptions();
    }
  }

  closeViewAll(): void {
    this.currentYear = this.defaultYear;  
    this.updateAppointmentsByYear();
  }

  initializeYearOptions(): void {
    this.yearOptions = [
      { label: 'View All', value: 'view-all' },
      ...this.yearsToShow.map(year => ({
        label: year.toString(),
        value: year
      }))
    ];
  }

  updateYearsToShow(): void {
    if (!this.patient?.past_appointments.length) return;

    const years = this.patient.past_appointments.map((apt) =>
      new Date(apt.date).getFullYear()
    );

    this.yearsToShow = Array.from(new Set(years)).sort((a, b) => b - a);
    
    if (this.yearsToShow.length > 0 && !this.yearsToShow.includes(this.defaultYear)) {
      this.defaultYear = this.yearsToShow[0];
    }
  }

  updateAppointmentsByYear(): void {
    this.appointmentsByYear = {
      'view-all': [] 
    };

    if (!this.patient?.past_appointments) return;

    this.appointmentsByYear['view-all'] = [...this.patient.past_appointments].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    this.patient.past_appointments.forEach((appointment) => {
      const year = new Date(appointment.date).getFullYear();
      if (!this.appointmentsByYear[year]) {
        this.appointmentsByYear[year] = [];
      }
      this.appointmentsByYear[year].push(appointment);
    });

    Object.keys(this.appointmentsByYear).forEach(year => {
      if (year !== 'view-all') {
        this.appointmentsByYear[+year].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      }
    });

    this.filteredAppointments = this.appointmentsByYear[this.currentYear] || [];
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
    return '12:00 - 1:00 pm';
  }

  toggleAppointment(appointment: Appointment): void {
    this.selectedAppointment = appointment;
    this.showModal = true;
  }

  onYearChange(event: any): void {
    this.currentYear = event.value;
    this.updateAppointmentsByYear();
  }

  onClose(): void {
    this.selectedAppointment = null;
    this.showModal = false;
  }
  
  getTimelineEvents(): any[] {
    if (this.currentYear === 'view-all' || !this.appointmentsByYear[this.currentYear]) {
      return [];
    }
    return this.appointmentsByYear[this.currentYear].map(appointment => ({
      ...appointment,
      status: appointment.type, 
      date: new Date(appointment.date)
    }));
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.updateAppointmentsByYear();
  }


  onDotClick(appointment: any): void {
    this.selectedAppointment = appointment; 
  }

  onDialogClose(): void {
    this.selectedAppointment = null; 
  }
}