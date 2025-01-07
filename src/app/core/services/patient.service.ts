import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor() { }

  getPatients(): Observable<Patient[]> {
    return of([
      {
        patient_name: "Aiden Parker",
        badge: "Gum Guardian",
        pulse: "Everything is good",
        unscheduled_treatment: 0,
        next_preventative_appointment: "1/31/2025",
        next_regular_appointment: "No Appointment",
        date_of_join: "1-Sep-22",
        past_appointments: [
          { date: "Sep 1, 2022", type: "Perio" },
          { date: "Mar 1, 2023", type: "Perio" },
          { date: "Sep 1, 2023", type: "Whitening" },
          { date: "Oct 1, 2023", type: "Filling" },
          { date: "Nov 1, 2023", type: "Perio" },
          { date: "Jun 1, 2024", type: "Perio" },
          { date: "Jan 31, 2025", type: "Perio" }
        ],
        upcoming_appointments: [
          { date: "D4910", type: "Periodontal Maintenance", treatment: "Hygienist 1", fee: "$180", insurance_est: "$180", patient_est: "$0" },
          { date: "D0120", type: "Periodic Oral Exam", treatment: "Dentist 1", fee: "$55", insurance_est: "$55", patient_est: "$0" },
          { date: "D0274", type: "Bitewings-Four Film", treatment: "Hygienist 1", fee: "$86", insurance_est: "$86", patient_est: "$0" }
        ],
        total: { total_fee: "$321", insurance_est: "$321", patient_est: "$0" }
      },
      {
        patient_name: "Lila Parker",
        badge: "Gum Guardian",
        pulse: "Everything is good",
        unscheduled_treatment: 2,
        next_preventative_appointment: "No Appointment",
        next_regular_appointment: "1/15/2025",
        date_of_join: "1-Feb-22",
        past_appointments: [
          { date: "Feb 1, 2022", type: "Prophy" },
          { date: "Sep 1, 2022", type: "Prophy" },
          { date: "Mar 1, 2023", type: "Prophy" },
          { date: "Sep 1, 2023", type: "Prophy" },
          { date: "Feb 1, 2024", type: "Filling" },
          { date: "May 1, 2024", type: "Prophy" },
          { date: "Jan 15, 2025", type: "Aligner" }
        ],
        upcoming_appointments: [
          { date: "D8020", type: "Invisalign", treatment: "Dentist 2", fee: "$7,000", insurance_est: "$0", patient_est: "$7,000" }
        ],
        total: { total_fee: "$7,000", insurance_est: "$0", patient_est: "$7,000" }
      },
      {
        patient_name: "Ethan Chen",
        badge: "Gum Guardian",
        pulse: "Everything is good",
        unscheduled_treatment: 0,
        next_preventative_appointment: "3/31/2025",
        next_regular_appointment: "No Appointment",
        date_of_join: "20-Jan-22",
        past_appointments: [
          { date: "Jan 20, 2022", type: "Prophy" },
          { date: "Aug 15, 2022", type: "Prophy" },
          { date: "Feb 15, 2023", type: "Prophy" },
          { date: "Sep 1, 2023", type: "Prophy" },
          { date: "Mar 15, 2024", type: "Prophy" },
          { date: "Oct 1, 2024", type: "Prophy" },
          { date: "Mar 31, 2025", type: "Prophy" }
        ],
        upcoming_appointments: [
          { date: "D1110", type: "Prophylaxis cleaning", treatment: "Hygienist 2", fee: "$145", insurance_est: "$145", patient_est: "$0" },
          { date: "D0120", type: "Periodic Oral Exam", treatment: "Dentist 1", fee: "$55", insurance_est: "$55", patient_est: "$0" },
          { date: "D0274", type: "Bitewings-Four Film", treatment: "Hygienist 2", fee: "$86", insurance_est: "$86", patient_est: "$0" }
        ],
        total: { total_fee: "$286", insurance_est: "$286", patient_est: "$0" }
      }
    ]);
  }
}
