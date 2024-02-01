import {TestBed} from '@angular/core/testing';

import {AssessmentResultService} from './assessment-result.service';

describe('AssessmentResultService', () => {
  let service: AssessmentResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssessmentResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
