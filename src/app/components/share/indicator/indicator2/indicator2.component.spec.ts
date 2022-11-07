import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Indicator2Component } from './indicator2.component';

describe('Indicator2Component', () => {
  let component: Indicator2Component;
  let fixture: ComponentFixture<Indicator2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Indicator2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Indicator2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
