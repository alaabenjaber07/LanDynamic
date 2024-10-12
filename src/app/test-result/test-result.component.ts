import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.css']
})
export class TestResultComponent implements OnChanges{
  @Input() testResult: any; // Input from the parent component
  @Output() clear = new EventEmitter<void>(); // Output event to notify parent

  dates: string[] = []; // Store unique dates
  parameterKeys: string[] = []; // Store the test parameter keys

  // Called when testResult input changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['testResult'] && this.testResult) {
      this.dates = this.extractDates(this.testResult);
      this.parameterKeys = this.getParameterKeys(this.testResult);
    }
  }

  // Extract unique dates from test result data
  extractDates(testResult: any): string[] {
    const datesSet = new Set<string>(); // Using a set to ensure uniqueness
    const parameters = this.getParameterKeys(testResult);

    parameters.forEach(param => {
      if (this.isTestResultArray(testResult[param])) {
        const paramDates = testResult[param][0]?.data[0]?.Date || [];
        paramDates.forEach((date: string) => datesSet.add(date));
      }
    });

    return Array.from(datesSet).sort(); // Sort the dates in ascending order
  }

  // Get the test parameter keys (excluding 'Date')
  getParameterKeys(testResult: any): string[] {
    return Object.keys(testResult).filter(key => key !== 'id' && key !== 'name' && key !== 'Date' && key !== 'data');
  }

  // Check if a parameter contains an array of test results
  isTestResultArray(param: any): boolean {
    return Array.isArray(param);
  }

  // Retrieve the test result value for a specific date and parameter
  getTestResultValue(testResult: any, param: string, date: string): string | null {
    const paramData = testResult[param][0]?.data || [];
    const dates = paramData[0]?.Date || []; // Ensure dates array is present
    const values = paramData[1]?.[Object.keys(paramData[1] || {})[0]] || []; // Ensure values array is present

    const dateIndex = dates.indexOf(date);
    if (dateIndex !== -1) {
      return values[dateIndex]; // Return the value corresponding to the date
    }
    return null; // Return null if no value found for the date
  }

  // Method to trigger the 'clear' event and go back to the patients list
  goBack(): void {
    this.clear.emit();
  }
}
