import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStudentListComponent } from './teacher-student-list.component';

describe('TeacherStudentListComponent', () => {
  let component: TeacherStudentListComponent;
  let fixture: ComponentFixture<TeacherStudentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherStudentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
