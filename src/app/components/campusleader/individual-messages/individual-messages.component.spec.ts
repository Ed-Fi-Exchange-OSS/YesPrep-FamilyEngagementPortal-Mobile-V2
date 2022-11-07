import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualMessagesComponent } from './individual-messages.component';

describe('IndividualMessagesComponent', () => {
  let component: IndividualMessagesComponent;
  let fixture: ComponentFixture<IndividualMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
