import {TestBed} from '@angular/core/testing';

import {AssessmentService} from './assessment.service';

describe('AssessmentFormService', () => {
  let service: AssessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
