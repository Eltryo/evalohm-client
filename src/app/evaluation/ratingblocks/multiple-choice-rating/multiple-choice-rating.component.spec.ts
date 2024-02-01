import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MultipleChoiceRatingComponent} from './multiple-choice-rating.component';

describe('MultipleChoiceRatingComponent', () => {
  let component: MultipleChoiceRatingComponent;
  let fixture: ComponentFixture<MultipleChoiceRatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultipleChoiceRatingComponent]
    });
    fixture = TestBed.createComponent(MultipleChoiceRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
