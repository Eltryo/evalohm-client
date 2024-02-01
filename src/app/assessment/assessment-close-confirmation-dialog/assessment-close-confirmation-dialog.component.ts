import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-assessment-close-confirmation-dialog',
  templateUrl: './assessment-close-confirmation-dialog.component.html',
  styleUrls: ['./assessment-close-confirmation-dialog.component.scss']
})
export class AssessmentCloseConfirmationDialogComponent {

  constructor(private dialogRef: MatDialogRef<AssessmentCloseConfirmationDialogComponent>) {
  }

  onDenyClick(): void {
    this.dialogRef.close(false)
  }

  onConfirmClick(): void {
    this.dialogRef.close(true)
  }
}
