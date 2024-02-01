import {Injectable} from '@angular/core';
import {Rating} from "./rating";
import {RequestService} from "../../utility/services/request/request.service";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  //todo: rename variables
  private rating: Rating = {
    assessmentId: 1,
    reviewCode: '',
    vorlesungsRating: 0,
    uebungsRating: 0,
    unterlagenRating: 0,
    pruefungsRating: 0,
    zeitaufwandRating: 0,
    inhaltRating: 0,
    stoffmengeRating: 0,
    niveauRating: 0,
    relevanzRating: 0,
    bemerkung: '',
  };

  constructor(private requestService: RequestService) {
  }

  sendDataToBackend() {
    return this.requestService.request('POST', '/evaluation', this.rating)
  }

  getGradeForCourse(courseName: string) {
    return this.requestService.request<number>('PUT', '/assessments/grade', {courseName: courseName})
  }

  setRating(rating: number, Category: string) {
    switch (Category) {
      case 'Vorlesungen':
        this.rating.vorlesungsRating = rating;
        break;
      case 'Übungen':
        this.rating.uebungsRating = rating;
        break;
      case 'Unterlagen':
        this.rating.unterlagenRating = rating;
        break;
      case 'Prüfung':
        this.rating.pruefungsRating = rating;
        break;
      case 'Zeitaufwand':
        this.rating.zeitaufwandRating = rating;
        break;
      case 'Inhalt':
        this.rating.inhaltRating = rating;
        break;
      case 'Stoffmenge':
        this.rating.stoffmengeRating = rating;
        break;
      case 'Niveau':
        this.rating.niveauRating = rating;
        break;
      case 'Relevanz':
        this.rating.relevanzRating = rating;
        break;
    }
  }

  setBemerkung(bemerkung: string) {
    this.rating.bemerkung = bemerkung;
  }

  setReviewCode(reviewCode: string) {
    this.rating.reviewCode = reviewCode;
  }

  setAssessmentId(assessmentId: number) {
    this.rating.assessmentId = assessmentId;
  }

  isRatingValid() {
    return this.rating.vorlesungsRating > 0
      && this.rating.uebungsRating > 0
      && this.rating.unterlagenRating > 0
      && this.rating.pruefungsRating > 0
      && this.rating.assessmentId > 0
  }
}
