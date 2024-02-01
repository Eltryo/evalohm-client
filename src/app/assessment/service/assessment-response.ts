import {Semester} from "./semester";

export interface AssessmentResponse {
  id: number,
  course: string,
  lecturer: string,
  deadline: string,
  creationDate: string,
  expired: boolean,
  creator: string,
  reviewCode: string,
  semester: Semester,
  closed: boolean
}
