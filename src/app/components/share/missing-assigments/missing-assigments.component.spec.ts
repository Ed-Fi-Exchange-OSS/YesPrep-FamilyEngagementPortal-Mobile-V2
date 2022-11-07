import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingAssigmentsComponent } from './missing-assigments.component';

describe('MissingAssigmentsComponent', () => {
  let component: MissingAssigmentsComponent;
  let fixture: ComponentFixture<MissingAssigmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissingAssigmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingAssigmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
