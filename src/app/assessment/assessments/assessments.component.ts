import {Component, OnInit} from '@angular/core';
import {AssessmentService} from "../service/assessment.service";
import {ErrorHandlingService} from "../../utility/services/error-handling/error-handling.service";
import {Assessment} from "./assessment";

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.scss']
})
export class AssessmentsComponent implements OnInit {
  myAssessments: Assessment[] = [];

  constructor(private assessmentService: AssessmentService, private errorHandlingService: ErrorHandlingService) {
  }

  ngOnInit() {
    this.assessmentService.getMyAssessments()
      .subscribe({
        next: (response) => {
          this.myAssessments = [];
          //todo refactoring
          for (let assessmentResponse of response) {
            let assessment: Assessment = {
              id: assessmentResponse.id,
              course: assessmentResponse.course,
              lecturer: assessmentResponse.lecturer,
              semester: assessmentResponse.semester,
              creationDate: new Date(assessmentResponse.creationDate),
              deadline: new Date(assessmentResponse.deadline),
              expired: assessmentResponse.expired,
              creator: assessmentResponse.creator,
              reviewCode: assessmentResponse.reviewCode,
              closed: assessmentResponse.closed
            }

            this.myAssessments.push(assessment)
          }

          this.myAssessments.sort(
            (a, b) => {
              let result = b.semester.year - a.semester.year
              if (result == 0) result = b.semester.season.toLocaleString().localeCompare(a.semester.season.toLocaleString())
              if (result == 0) result = a.course.localeCompare(b.course.toLocaleString())

              return result
            }
          )
        },
        error: (error) => this.errorHandlingService.handleError(error),
      })
  }
}
