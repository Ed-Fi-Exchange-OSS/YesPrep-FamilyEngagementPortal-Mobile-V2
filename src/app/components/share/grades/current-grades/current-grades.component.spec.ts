import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentGradesComponent } from './current-grades.component';

describe('CurrentGradesComponent', () => {
  let component: CurrentGradesComponent;
  let fixture: ComponentFixture<CurrentGradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentGradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
