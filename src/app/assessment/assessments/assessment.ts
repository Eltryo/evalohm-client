import {Semester} from "../service/semester";

export interface Assessment {
  id: number,
  course: string,
  lecturer: string,
  deadline: Date,
  creationDate: Date,
  expired: boolean,
  creator: string,
  reviewCode: string,
  semester: Semester,
  closed: boolean
}
