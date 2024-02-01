import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AssessmentRequest} from "./assessment-request";
import {RequestService} from "../../utility/services/request/request.service";
import {AssessmentResponse} from "./assessment-response";
import {MessageResponse} from "./message-response";
import {AssessmentIdResponse} from "./assessment-id-response";

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  constructor(private requestService: RequestService) {
  }

  addAssessment(assessmentRequestDto: AssessmentRequest): Observable<AssessmentRequest> {
    return this.requestService.request<AssessmentRequest>('POST', '/assessments', assessmentRequestDto)
  }

  getMyAssessments(): Observable<AssessmentResponse[]> {
    return this.requestService.request<AssessmentResponse[]>('GET', '/assessments/myAssessments', {})
  }

  getAllAssessments(): Observable<AssessmentResponse[]> {
    return this.requestService.request<AssessmentResponse[]>('GET', '/assessments', {})
  }

  getAssessmentById(id: number) {
    return this.requestService.request<AssessmentResponse>('GET', '/assessments/' + id, {})
  }

  editAssessment(assessment: AssessmentResponse) {
    return this.requestService.request('PUT', '/assessments/' + assessment.id, assessment)
  }

  closeAssessment(id: number) {
    return this.requestService.request<MessageResponse>('PUT', '/assessments/' + id + '/close', {})
  }

  getAssessmentIdByUserId() {
    return this.requestService.request<AssessmentIdResponse[]>('GET', '/assessments/mySubmittedAssessments', {})
  }
}
