import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit{
  patients: any[] = [];
  testResults: any[] = [];
  selectedTestResult: any = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadPatients();
    this.loadTestResults();
  }

  loadPatients(): void {
    this.dataService.getPatients().subscribe((data: any) => {
      this.patients = data.patients;
    });
  }

  loadTestResults(): void {
    this.dataService.getTestResults().subscribe((data: any) => {
      this.testResults = data;
    });
  }

  onTestClick(testTypeId: string): void {
    this.selectedTestResult = this.testResults.find(tr => tr.id === testTypeId);
  }

  // Clears the selected test result
  clearSelection(): void {
    this.selectedTestResult = null;
  }
}
