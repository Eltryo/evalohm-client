import {Injectable} from '@angular/core';
import {RequestService} from "../../utility/services/request/request.service";
import {Observable} from "rxjs";
import {Rating} from "../../evaluation/service/rating";

@Injectable({
  providedIn: 'root'
})
export class AssessmentResultService {

  constructor(private requestService: RequestService) {
  }

  getAssessmentResults(assessmentId: number): Observable<Rating[]> {
    return this.requestService.request<Rating[]>('GET', '/assessments/' + assessmentId + '/results', {})
  }
}
