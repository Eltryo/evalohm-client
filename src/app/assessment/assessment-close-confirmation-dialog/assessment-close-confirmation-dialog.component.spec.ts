import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AssessmentCloseConfirmationDialogComponent} from './assessment-close-confirmation-dialog.component';

describe('AssessmentCloseConfirmationDialogComponent', () => {
  let component: AssessmentCloseConfirmationDialogComponent;
  let fixture: ComponentFixture<AssessmentCloseConfirmationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssessmentCloseConfirmationDialogComponent]
    });
    fixture = TestBed.createComponent(AssessmentCloseConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
