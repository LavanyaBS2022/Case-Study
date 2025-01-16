import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface AppointmentCard {
  count: number;
  title: string;
  type: string;
  icon: string;
  color: string;
}

interface PatientStats {
  title: string;
  count: number;
  trend: number;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  standalone:false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'] ,
})
export class DashboardComponent implements OnInit {

  todayAppointments = 12;
  pendingActions = 5;
  recentUpdates = 3;

  recentActivities = [
    {
      title: 'New patient registration completed',
      time: '2 minutes ago',
      icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Treatment plan updated',
      time: '1 hour ago',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-500'
    },
    {
      title: 'Appointment rescheduled',
      time: '3 hours ago',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-500'
    }
  ];

  constructor() { }

  ngOnInit(): void { }
}
