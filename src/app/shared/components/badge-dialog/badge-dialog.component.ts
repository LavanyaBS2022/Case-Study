import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Treatment {
  code: string;
  description: string;
  provider: string;
  fee: number;
  insuranceEst: number;
  patientEst: number;
}

@Component({
  selector: 'app-badge-dialog',
  standalone: false,
  templateUrl: './badge-dialog.component.html',
  styleUrls: ['./badge-dialog.component.scss']
})
export class BadgeDialogComponent {
  @Input() patient: any;
  @Input() selectedAppointment: any;
  @Output() closeDialog = new EventEmitter<void>();

  isModalOpen: boolean = true; 
  treatments: Treatment[] = [
    {
      code: 'D4910',
      description: 'Periodontal maintenance',
      provider: 'Allison L.',
      fee: 180,
      insuranceEst: 180,
      patientEst: 0
    },
    {
      code: 'D0120',
      description: 'Periodic oral examination',
      provider: 'Dr. Kwak',
      fee: 55,
      insuranceEst: 55,
      patientEst: 0
    },
    {
      code: 'D0274',
      description: 'Bitewings-four films',
      provider: 'Allison L.',
      fee: 86,
      insuranceEst: 86,
      patientEst: 0
    }
  ];

  getTotalFee(): number {
    return this.treatments.reduce((sum, treatment) => sum + treatment.fee, 0);
  }

  getTotalInsuranceEst(): number {
    return this.treatments.reduce((sum, treatment) => sum + treatment.insuranceEst, 0);
  }

  getTotalPatientEst(): number {
    return this.treatments.reduce((sum, treatment) => sum + treatment.patientEst, 0);
  }

  onClose(): void {
    this.isModalOpen = false;  
    this.closeDialog.emit(); 
  }

  ngOnInit(): void {
    const style = document.createElement('style');
    style.textContent = `
      .fixed {
        transition: opacity 0.15s ease-out;
      }
    `;
    document.head.appendChild(style);
  }

  ngOnDestroy(): void {
  }
}
