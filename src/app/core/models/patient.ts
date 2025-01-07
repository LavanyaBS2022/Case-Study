export interface Appointment {
    date: string;
    type: string;
    treatment?: string;
    fee?: string;
    insurance_est?: string;
    patient_est?: string;
  }
  
  export interface Total {
    total_fee: string;
    insurance_est: string;
    patient_est: string;
  }
  
  export interface Patient {
    patient_name: string;
    badge: string;
    pulse: string;
    unscheduled_treatment: number;
    next_preventative_appointment: string;
    next_regular_appointment: string;
    date_of_join: string;
    past_appointments: Appointment[];
    upcoming_appointments: Appointment[];
    total: Total;
  }