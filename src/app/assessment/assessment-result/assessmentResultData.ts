import {Semester} from "../service/semester";

export interface AssessmentResultData {
  id: number,
  course: string,
  lecturer: string,
  semester?: Semester
}
