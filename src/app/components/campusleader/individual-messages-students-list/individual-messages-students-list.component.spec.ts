import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualMessagesStudentsListComponent } from './individual-messages-students-list.component';

describe('IndividualMessagesStudentsListComponent', () => {
  let component: IndividualMessagesStudentsListComponent;
  let fixture: ComponentFixture<IndividualMessagesStudentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualMessagesStudentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualMessagesStudentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
