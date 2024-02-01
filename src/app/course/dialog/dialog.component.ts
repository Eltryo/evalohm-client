import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule,} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {Assessment} from "../../assessment/assessments/assessment";
import {MatCardModule} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {RatingService} from "../../evaluation/service/rating.service";
import {Router, RouterLink} from "@angular/router";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDividerModule} from "@angular/material/divider";
import {MatExpansionModule} from "@angular/material/expansion";
import {AssessmentService} from "../../assessment/service/assessment.service";
import {ErrorHandlingService} from "../../utility/services/error-handling/error-handling.service";

export interface DialogData {
  myAssessments: Assessment[][];
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @Input() myAssessments: Assessment[][] = [];

  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    this.dialog.open(DialogContent, {
      data: {myAssessments: this.myAssessments},
      autoFocus: false
    });
  }
}

@Component({
  selector: 'dialog-content',
  templateUrl: 'dialog.content.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatButtonModule,
    MatCardModule,
    NgForOf,
    RouterLink,
    NgIf,
    MatTooltipModule,
    MatDividerModule,
    MatExpansionModule],
})
export class DialogContent implements OnInit {
  IdsOfSubmittedAssessments: number[] = []
  gradeForCourse: number = 0;

  constructor(
    public router: Router,
    private ratingService: RatingService,
    private errorHandlingService: ErrorHandlingService,
    private assessmentService: AssessmentService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  openEvaluation(assessmentID: number) {
    this.router.navigateByUrl('/assessments/' + assessmentID + '/evaluate').then()
  }

  ngOnInit(): void {
    this.ratingService.getGradeForCourse(this.data.myAssessments[0][0].course)
      .subscribe({
        next: (response) => this.gradeForCourse = response,
        error: (error) => this.errorHandlingService.handleError(error)
      });

    this.assessmentService.getAssessmentIdByUserId()
      .subscribe({
        next: assessmentIds => this.IdsOfSubmittedAssessments = [...assessmentIds.map(assessmentIdResponse => assessmentIdResponse.assessmentId)],
        error: (error) => this.errorHandlingService.handleError(error),
      });
  }
}
