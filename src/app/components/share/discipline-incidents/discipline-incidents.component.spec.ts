import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplineIncidentsComponent } from './discipline-incidents.component';

describe('DisciplineIncidentsComponent', () => {
  let component: DisciplineIncidentsComponent;
  let fixture: ComponentFixture<DisciplineIncidentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplineIncidentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplineIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
