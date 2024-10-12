import {Test} from "./test.model";

export interface Patient {
  ID: number;
  name: string;
  tests: Test[];
}
