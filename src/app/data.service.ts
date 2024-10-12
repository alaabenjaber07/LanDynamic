import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getPatients(): Observable<any> {
    return this.http.get('assets/patients.json');
  }

  getTestResults(): Observable<any> {
    return this.http.get('assets/TestResult.json');
  }
}
