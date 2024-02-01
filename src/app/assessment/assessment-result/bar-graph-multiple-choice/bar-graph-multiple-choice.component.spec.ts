import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BarGraphMultipleChoiceComponent} from './bar-graph-multiple-choice.component';

describe('BarGraphMultipleChoiceComponent', () => {
  let component: BarGraphMultipleChoiceComponent;
  let fixture: ComponentFixture<BarGraphMultipleChoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarGraphMultipleChoiceComponent]
    });
    fixture = TestBed.createComponent(BarGraphMultipleChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
