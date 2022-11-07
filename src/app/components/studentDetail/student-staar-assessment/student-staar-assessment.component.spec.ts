import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentStaarAssessmentComponent } from './student-staar-assessment.component';

describe('StudentStaarAssessmentComponent', () => {
  let component: StudentStaarAssessmentComponent;
  let fixture: ComponentFixture<StudentStaarAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentStaarAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentStaarAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
