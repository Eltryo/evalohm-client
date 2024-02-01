import {Component, OnInit} from '@angular/core';
import {RatingService} from "./service/rating.service";
import {ErrorHandlingService} from "../utility/services/error-handling/error-handling.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../utility/services/notifications/notification.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss'],

})
export class EvaluationComponent implements OnInit {
  loading = false;
  bemerkungFormControl = new FormControl('');
  reviewCodeFormControl = new FormControl('', [Validators.required]);

  constructor(
    private readonly ratingService: RatingService,
    private errorHandlingService: ErrorHandlingService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  Submit() {
    this.loading = true;

    if (this.bemerkungFormControl.value) this.ratingService.setBemerkung(this.bemerkungFormControl.value);
    if (this.reviewCodeFormControl.value) this.ratingService.setReviewCode(this.reviewCodeFormControl.value);

    this.ratingService.sendDataToBackend()
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('home')
            .then(() => this.notificationService.createSuccessNotification("Vielen Dank für deine Bewertung!"))
        },
        error: (error) => this.errorHandlingService.handleError(error)
      }).add(() => this.loading = false);
  }

  ngOnInit(): void {
    this.ratingService.setAssessmentId(Number(this.route.snapshot.paramMap.get('id')))
  }

  ratingIsInvalid() {
    return !this.ratingService.isRatingValid() || this.reviewCodeFormControl.invalid;
  }
}
