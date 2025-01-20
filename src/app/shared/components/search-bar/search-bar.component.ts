import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Patient } from '../../../core/models/patient';
import { PatientService } from '../../../core/services/patient.service';

@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  searchTerm: string = '';            
  filteredPatients: Patient[] = [];     
  allPatients: Patient[] = [];          
  selectedIndex: number = -1;           
  @Output() patientSelected = new EventEmitter<Patient>();

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  private loadPatients(): void {
    this.patientService.getPatients().subscribe({
      next: (patients) => {
        this.allPatients = patients;
        this.filteredPatients = [];
      },
      error: (error) => {
        console.error('Error loading patients:', error);
      }
    });
  }

  searchPatients() {
    if (this.searchTerm.trim()) {
      this.filteredPatients = this.allPatients.filter((patient) =>
        patient.patient_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      ).sort((a, b) => a.patient_name.localeCompare(b.patient_name));
    } else {
      this.filteredPatients = [];
    }
  }

  selectPatient(patient: Patient, event?: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    this.patientSelected.emit(patient);
    this.resetSearch();
  }

  resetSearch() {
    this.searchTerm = '';
    this.selectedIndex = -1;
    this.filteredPatients = [];
  }

  onKeydown(event: KeyboardEvent) {
    switch(event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (this.selectedIndex < this.filteredPatients.length - 1) {
          this.selectedIndex++;
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.selectedIndex > 0) {
          this.selectedIndex--;
        }
        break;
      case 'Enter':
        event.preventDefault();
        if (this.selectedIndex >= 0) {
          this.selectPatient(this.filteredPatients[this.selectedIndex]);
        }
        break;
    }
  }

  getHighlightClass(index: number): string {
    return index === this.selectedIndex ? 'highlight' : '';
  }
}
