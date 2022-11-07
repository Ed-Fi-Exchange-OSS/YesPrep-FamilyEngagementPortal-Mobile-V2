import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpretationIconComponent } from './interpretation-icon.component';

describe('InterpretationIconComponent', () => {
  let component: InterpretationIconComponent;
  let fixture: ComponentFixture<InterpretationIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpretationIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpretationIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
