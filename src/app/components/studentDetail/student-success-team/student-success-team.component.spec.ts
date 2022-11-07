import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSuccessTeamComponent } from './student-success-team.component';

describe('StudentSuccessTeamComponent', () => {
  let component: StudentSuccessTeamComponent;
  let fixture: ComponentFixture<StudentSuccessTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSuccessTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSuccessTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
