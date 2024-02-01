import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AssessmentService} from "../service/assessment.service";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorHandlingService} from "../../utility/services/error-handling/error-handling.service";
import {AssessmentResponse} from '../service/assessment-response';
import {NotificationService} from "../../utility/services/notifications/notification.service";
import {
  AssessmentCloseConfirmationDialogComponent
} from "../assessment-close-confirmation-dialog/assessment-close-confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-assessment',
  templateUrl: './edit-assessment.component.html',
  styleUrls: ['./edit-assessment.component.scss']
})
export class EditAssessmentComponent implements OnInit {
  assessment: AssessmentResponse | undefined;
  minDate: Date = new Date();
  maxDate: Date = new Date();
  loading = false;
  form: FormGroup;

  constructor(
    private assessmentService: AssessmentService,
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    private errorHandlingService: ErrorHandlingService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {
    this.form = new FormGroup({
      course: new FormControl('', [Validators.required]),
      lecturer: new FormControl('', [Validators.required]),
      deadline: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.assessmentService.getAssessmentById(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe({
        next: (response) => {
          if (response.closed || response.expired) {
            this.router.navigateByUrl('/assessments').then(
              () => this.notificationService.createErrorNotification("Diese Evaluation ist bereits beendet")
            )
          } else {
            this.assessment = response

            let creationDate = new Date(response.creationDate)
            let deadline = new Date(response.deadline)

            this.form = new FormGroup({
              course: new FormControl(response.course, [Validators.required]),
              lecturer: new FormControl(response.lecturer, [Validators.required]),
              deadline: new FormControl(deadline, [Validators.required])
            })
            this.minDate = new Date(creationDate.getFullYear(), creationDate.getMonth(), creationDate.getDate() + 7)

            let currentDate = new Date();
            if (currentDate > this.minDate) this.minDate = currentDate

            this.maxDate = calcMaxDate()

            function calcMaxDate(): Date {
              const currentDayMonth = creationDate.getMonth() * 100 + creationDate.getDate()
              const endOfWinterSemesterDayMonth = 214
              const endOfSummerSemesterDayMonth = 830
              return (currentDayMonth <= endOfWinterSemesterDayMonth || currentDayMonth > endOfSummerSemesterDayMonth)
                ? new Date(currentDayMonth >= 1 ? creationDate.getFullYear() + 1 : creationDate.getFullYear(), 2, 14)
                : new Date(creationDate.getFullYear(), 8, 30)
            }
          }
        },
        error: (error) => {
          this.router.navigateByUrl("/assessments").then(
            () => this.errorHandlingService.handleError(error)
          )
        },
      })
  }

  onSubmit() {
    this.loading = true;

    let assessmentFormValue = this.form.value;
    let course = assessmentFormValue.course;
    let lecturer = assessmentFormValue.lecturer;
    let deadline = assessmentFormValue.deadline;
    let formattedDeadline = this.datePipe.transform(deadline, 'yyyy-MM-dd');
    let assessmentFormData = this.assessment!;
    assessmentFormData.course = course
    assessmentFormData.lecturer = lecturer
    assessmentFormData.deadline = formattedDeadline!

    this.assessmentService.editAssessment(assessmentFormData)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('assessments').then(
            () => this.notificationService.createSuccessNotification("Deine Änderungen wurden gespeichert!")
          )
        },
        error: (error) => this.errorHandlingService.handleError(error),
      }).add(() => this.loading = false)
  }

  closeAssessment() {
    const dialogRef = this.dialog.open(AssessmentCloseConfirmationDialogComponent)

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        if (this.assessment !== undefined) {
          this.loading = true;
          this.assessmentService.closeAssessment(this.assessment.id).subscribe({
            next: (response) => {
              this.router.navigateByUrl('assessments').then(
                () => this.notificationService.createSuccessNotification(response.message)
              )
            },
            error: (error) => this.errorHandlingService.handleError(error)
          }).add(() => this.loading = false)
        }
      }
    })
  }

  isClosedOrExpired() {
    if (!this.assessment) return true

    return this.assessment.expired || this.assessment.closed
  }

  shouldBeAbleToClose() {
    if (!this.assessment) return true

    let currentDate = new Date()
    let creationDate = new Date(this.assessment.creationDate)
    let minDate = new Date(creationDate.getFullYear(), creationDate.getMonth(), creationDate.getDate() + 7)

    return currentDate > minDate
  }
}
