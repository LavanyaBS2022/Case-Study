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
    this.patientService.getPatients().subscribe((patients) => {
      this.allPatients = patients;
      this.filteredPatients = patients; 
    });
  }

  searchPatients() {
    if (this.searchTerm.trim()) {
      this.filteredPatients = this.allPatients.filter((patient) =>
        patient.patient_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );

      this.filteredPatients.sort((a, b) =>
        a.patient_name.localeCompare(b.patient_name)
      );
    } else {
      this.filteredPatients = [];
    }
  }

  selectPatient(patient: Patient) {
    this.patientSelected.emit(patient);
    this.resetSearch(); 
  }

  resetSearch() {
    this.searchTerm = '';
    this.selectedIndex = -1;
    this.filteredPatients = [];
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      if (this.selectedIndex < this.filteredPatients.length - 1) {
        this.selectedIndex++;
      }
    } else if (event.key === 'ArrowUp') {
      if (this.selectedIndex > 0) {
        this.selectedIndex--;
      }
    } else if (event.key === 'Enter' && this.selectedIndex >= 0) {
      this.selectPatient(this.filteredPatients[this.selectedIndex]);
    }
  }

  getHighlightClass(index: number): string {
    return index === this.selectedIndex ? 'highlight' : '';
  }
}
