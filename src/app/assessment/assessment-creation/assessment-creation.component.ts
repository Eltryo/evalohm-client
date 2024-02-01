import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators,} from '@angular/forms';
import {AssessmentRequest} from "../service/assessment-request";
import {AssessmentService} from "../service/assessment.service";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {ErrorHandlingService} from "../../utility/services/error-handling/error-handling.service";
import {NotificationService} from "../../utility/services/notifications/notification.service";

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment-creation.html',
  styleUrls: ['./assessment-creation.scss'],
})
export class AssessmentCreationComponent {
  minDate: Date;
  maxDate: Date;
  loading = false;
  form: FormGroup;

  constructor(private assessmentFormService: AssessmentService, private datePipe: DatePipe, private router: Router, private errorHandlingService: ErrorHandlingService, private notificationService: NotificationService) {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
    const currentDay = new Date().getDate()

    this.maxDate = calcMaxDate()
    this.minDate = new Date(currentYear, currentMonth, currentDay + 7)
    this.form = new FormGroup({
      course: new FormControl('', [Validators.required]),
      lecturer: new FormControl('', [Validators.required]),
      deadline: new FormControl(this.minDate, [Validators.required])
    })

    function calcMaxDate(): Date {
      const currentDayMonth = currentMonth * 100 + currentDay
      const endOfWinterSemesterDayMonth = 214
      const endOfSummerSemesterDayMonth = 830
      return (currentDayMonth <= endOfWinterSemesterDayMonth || currentDayMonth > endOfSummerSemesterDayMonth)
        ? new Date(currentDayMonth >= 1 ? currentYear + 1 : currentYear, 2, 14)
        : new Date(currentYear, 8, 30)
    }
  }

  onSubmit() {
    this.loading = true;

    const assessmentFormValue = this.form.value;
    const course = assessmentFormValue.course;
    const lecturer = assessmentFormValue.lecturer;
    const deadline = assessmentFormValue.deadline;
    const formattedDeadline = this.datePipe.transform(deadline, 'yyyy-MM-dd');
    const assessmentFormData = {course: course, lecturer: lecturer, deadline: formattedDeadline}
    this.assessmentFormService.addAssessment(assessmentFormData as AssessmentRequest)
      .subscribe({
        next: () =>
          this.router.navigateByUrl('assessments').then(
            () => this.notificationService.createSuccessNotification("Bewertung erfolgreich erstellt!")
          ),
        error: (error) => this.errorHandlingService.handleError(error),
      }).add(() => this.loading = false)
  }
}
