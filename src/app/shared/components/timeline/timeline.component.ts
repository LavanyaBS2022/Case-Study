import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-timeline',
  standalone: false,
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  @Input() patient: any;

  currentYear = new Date().getFullYear();
  yearsToShow = [this.currentYear - 2, this.currentYear - 1, this.currentYear];
  appointmentsByYear: { [key: number]: any[] } = {};

  ngOnInit() {
    if (this.patient?.past_appointments) {
      this.yearsToShow.forEach((year) => {
        this.appointmentsByYear[year] = this.patient.past_appointments.filter((appointment: any) => {
          const appointmentYear = new Date(appointment.date).getFullYear();
          return appointmentYear === year;
        });
      });
    }
  }

  formatDateToMonth(date: string): string {
    const dateObj = new Date(date);
    const options: Intl.DateTimeFormatOptions = { month: 'short' };
    return dateObj.toLocaleDateString('en-US', options);
  }

  onViewAll() {
    console.log('View All clicked');
  }
}