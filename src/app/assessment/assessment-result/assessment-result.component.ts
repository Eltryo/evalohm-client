import {Component, OnInit} from '@angular/core';
import {AssessmentResultService} from "../service/assessment-result.service";
import {Rating} from "../../evaluation/service/rating";
import {ErrorHandlingService} from "../../utility/services/error-handling/error-handling.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AssessmentService} from "../service/assessment.service";
import {AssessmentResultData} from "./assessmentResultData"
import {RequestService} from "../../utility/services/request/request.service";
import {Location} from "@angular/common"
import {NotificationService} from "../../utility/services/notifications/notification.service";

//todo: rename variables
@Component({
  selector: 'app-assessment-result',
  templateUrl: './assessment-result.component.html',
  styleUrls: ['./assessment-result.component.scss']
})
export class AssessmentResultComponent implements OnInit {
  assessment: AssessmentResultData = {} as AssessmentResultData;
  assessmentResult: Rating[] = [];
  averageValues: number[] = this.getAverageStars();
  grade: number = this.getGrade(this.averageValues)
  ratingCounts: number[][] = this.getRatingCount();
  starCount: number[][] = this.getStarCount();
  barGraphTitle1 = 'Zeitaufwand';
  zeitaufwandNiveauPunkt1 = 'sehr niedrig';
  zeitaufwandNiveauPunkt2 = 'eher niedrig';
  zeitaufwandNiveauStoffmengePunkt3 = 'angemessen';
  zeitaufwandNiveauPunkt4 = 'eher hoch';
  zeitaufwandNiveauPunkt5 = 'sehr hoch';
  barGraphTitle2 = 'Inhalt';
  inhaltPunkt1 = 'uninteressant';
  inhaltPunkt2 = 'eher uninteressant';
  inhaltRelevanzPunkt3 = 'neutral';
  inhaltPunkt4 = 'eher interessant';
  inhaltPunkt5 = 'interessant';
  barGraphTitle3 = 'Stoffmenge';
  stoffmengePunkt1 = 'sehr wenig';
  stoffmengePunkt2 = 'eher wenig';
  stoffmengePunkt4 = 'eher viel';
  stoffmengePunkt5 = 'sehr viel';
  barGraphTitle4 = 'Niveau';
  barGraphTitle5 = 'Relevanz';
  relevanzPunkt1 = 'irrelevant';
  relevanzPunkt2 = 'eher irrelevant';
  relevanzPunkt4 = 'eher relevant';
  relevanzPunkt5 = 'relevant';
  star = String.fromCodePoint(9733)

  constructor(
    private readonly assessmentResultService: AssessmentResultService,
    private readonly notificationService: NotificationService,
    private readonly errorHandlingService: ErrorHandlingService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly assessmentService: AssessmentService,
    readonly requestService: RequestService,
    private location: Location
  ) {
  }

  getRatingCount(): number[][] {
    let result: number[][] = new Array(5);
    this.fillRatings(result);

    this.assessmentResult.forEach(function (currentResult) {
      result[0][currentResult.zeitaufwandRating - 1]++;
      result[1][currentResult.inhaltRating - 1]++;
      result[2][currentResult.stoffmengeRating - 1]++;
      result[3][currentResult.niveauRating - 1]++;
      result[4][currentResult.relevanzRating - 1]++;
    });

    return result;
  }

  getStarCount(): number[][] {
    let result: number[][] = new Array(4);
    this.fillRatings(result)

    this.assessmentResult.forEach(function (currentResult) {
      result[0][currentResult.vorlesungsRating - 1]++;
      result[1][currentResult.uebungsRating - 1]++;
      result[2][currentResult.unterlagenRating - 1]++;
      result[3][currentResult.pruefungsRating - 1]++;
    });

    return result;
  }

  getAverageStars(): number[] {
    if (this.assessmentResult.length == 0) {
      return new Array(9);
    }

    let counter: number[] = new Array(9).fill(0);
    let result: number[] = new Array(9);
    let sumOfVorlesungsRating = 0;
    let sumOfUebungsRating = 0;
    let sumOfUnterlagenRating = 0;
    let sumOfPruefungsRating = 0;
    let sumOfZeitaufwandRating = 0;
    let sumOfInhaltRating = 0;
    let sumOfStoffRating = 0;
    let sumOfNivaeuRating = 0;
    let sumOfRelevanzRating = 0;

    this.assessmentResult.forEach(function (currentResult) {
      if (currentResult.vorlesungsRating != 0) {
        sumOfVorlesungsRating += currentResult.vorlesungsRating;
        counter[0]++;
      }
      if (currentResult.uebungsRating != 0) {
        sumOfUebungsRating += currentResult.uebungsRating;
        counter[1]++;
      }
      if (currentResult.unterlagenRating != 0) {
        sumOfUnterlagenRating += currentResult.unterlagenRating;
        counter[2]++;
      }
      if (currentResult.pruefungsRating != 0) {
        sumOfPruefungsRating += currentResult.pruefungsRating;
        counter[3]++;
      }
      if (currentResult.zeitaufwandRating != 0) {
        sumOfZeitaufwandRating += currentResult.zeitaufwandRating;
        counter[4]++;
      }
      if (currentResult.inhaltRating != 0) {
        sumOfInhaltRating += currentResult.inhaltRating;
        counter[5]++;
      }
      if (currentResult.stoffmengeRating != 0) {
        sumOfStoffRating += currentResult.stoffmengeRating;
        counter[6]++;
      }
      if (currentResult.niveauRating != 0) {
        sumOfNivaeuRating += currentResult.niveauRating;
        counter[7]++;
      }
      if (currentResult.relevanzRating != 0) {
        sumOfRelevanzRating += currentResult.relevanzRating;
        counter[8]++;
      }
    });

    result[0] = parseFloat((sumOfVorlesungsRating / counter[0]).toFixed(2));
    result[1] = parseFloat((sumOfUebungsRating / counter[1]).toFixed(2));
    result[2] = parseFloat((sumOfUnterlagenRating / counter[2]).toFixed(2));
    result[3] = parseFloat((sumOfPruefungsRating / counter[3]).toFixed(2));
    result[4] = parseFloat((sumOfZeitaufwandRating / counter[4]).toFixed(2));
    result[5] = parseFloat((sumOfInhaltRating / counter[5]).toFixed(2));
    result[6] = parseFloat((sumOfStoffRating / counter[6]).toFixed(2));
    result[7] = parseFloat((sumOfNivaeuRating / counter[7]).toFixed(2));
    result[8] = parseFloat((sumOfRelevanzRating / counter[8]).toFixed(2));

    return result;
  }

  ngOnInit(): void {
    let assessmentId = this.route.snapshot.paramMap.get('id');

    this.assessmentService.getAssessmentById(Number(assessmentId))
      .subscribe({
        next: response => {
          this.assessment = {
            id: response.id,
            course: response.course,
            lecturer: response.lecturer,
            semester: response.semester
          }
        }
      })

    this.assessmentResultService.getAssessmentResults(Number(assessmentId))
      .subscribe({
        next: (response) => {
          this.assessmentResult = response;
          this.averageValues = this.getAverageStars();
          this.grade = this.getGrade(this.averageValues);
          this.ratingCounts = this.getRatingCount();
          this.starCount = this.getStarCount()
        },
        error: (error) => this.errorHandlingService.handleError(error)
      });
  }

  navigateToComments() {
    this.router.navigateByUrl(`assessments/${this.assessment.id}/result/comments`, {
      state: this.assessmentResult.map(result => result.bemerkung)
    })
  }

  commentsPresent() {
    for (let rating of this.assessmentResult) {
      if (rating.bemerkung) return true;
    }

    return false;
  }

  backClicked() {
    this.location.back();
  }

  private fillRatings(ratings: number[][]) {
    for (let i = 0; i < 5; i++) {
      ratings[i] = new Array(5);
    }

    for (let i = 0; i < ratings.length; i++) {
      for (let j = 0; j < ratings[i].length; j++) {
        ratings[i][j] = 0;
      }
    }
  }

  private getGrade(averageValues: number[]) {
    if (averageValues[0] == 0) {
      return 6;
    }

    let score = 0
    let gradedAspectsAmount = 0

    for (let i = 0; i < averageValues.length; i++) {
      let value = averageValues[i]

      if (value == 0) break;

      if (i == 4 || i == 6 || i == 7) {
        let averageValue = Math.round(value)
        if (averageValue == 1 || averageValue == 5) {
          score += 1
        } else if (averageValue == 2 || averageValue == 4) {
          score += 3
        } else {
          score += 5
        }
      } else {
        score += value
      }

      gradedAspectsAmount++
    }

    return 6 - parseFloat((score / gradedAspectsAmount).toFixed(2))
  }
}
