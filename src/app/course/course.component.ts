import {Component, OnInit} from '@angular/core';
import {RequestService} from "../utility/services/request/request.service";
import {ErrorHandlingService} from "../utility/services/error-handling/error-handling.service";
import {Course} from "./course";
import {Assessment} from "../assessment/assessments/assessment";
import {AssessmentService} from "../assessment/service/assessment.service";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})

export class CourseComponent implements OnInit {
  courses: Course[] = [];
  myAssessments: Assessment[] = [];

  constructor(private requestService: RequestService, private errorHandlingService: ErrorHandlingService, private assessmentService: AssessmentService) {
  }

  filter(course: Course): Assessment[][] {
    let assessmentsByCourse = this.myAssessments.filter(assessment => assessment.course == course.courseName)
    let sortedAssessments = assessmentsByCourse.sort(
      (a, b) => {
        let result = b.semester.year - a.semester.year
        if (result == 0) result = b.semester.season.toLocaleString().localeCompare(a.semester.season.toLocaleString())
        if (result == 0) result = a.lecturer.localeCompare(b.lecturer.toLocaleString())

        return result
      }
    )

    let assessments: Assessment[][] = []
    let semesterIndex = 0;

    assessments[semesterIndex] = []
    assessments[semesterIndex].push(sortedAssessments[0])
    for (let i = 1; i < sortedAssessments.length; i++) {
      if (sortedAssessments[i].semester.year !== sortedAssessments[i - 1].semester.year
        || sortedAssessments[i].semester.season.toLocaleString() !== sortedAssessments[i - 1].semester.season.toLocaleString()) {
        semesterIndex++;
        assessments[semesterIndex] = []
      }

      assessments[semesterIndex].push(sortedAssessments[i])
    }

    return assessments
  }

  ngOnInit() {
    this.requestService.request<Course[]>('GET', '/courses', {})
      .subscribe({
        next: (response) => this.courses = response.sort((a, b) => a.courseName.localeCompare(b.courseName)),
        error: (error) => this.errorHandlingService.handleError(error)
      })

    this.assessmentService.getAllAssessments()
      .subscribe({
        next: (assessmentResponses) => {
          this.myAssessments = [];

          for (let assessmentResponse of assessmentResponses) {
            //todo: make mapper
            let assessment: Assessment = {
              id: assessmentResponse.id,
              course: assessmentResponse.course,
              lecturer: assessmentResponse.lecturer,
              semester: assessmentResponse.semester,
              creationDate: new Date(assessmentResponse.creationDate),
              deadline: new Date(assessmentResponse.deadline),
              expired: assessmentResponse.expired,
              reviewCode: assessmentResponse.reviewCode,
              closed: assessmentResponse.closed,
              creator: assessmentResponse.creator
            }

            this.myAssessments.push(assessment)
          }
        },
        error: (error) => this.errorHandlingService.handleError(error),
      })
  }
}
