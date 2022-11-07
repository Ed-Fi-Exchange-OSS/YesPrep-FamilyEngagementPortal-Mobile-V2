import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMessagesSentComponent } from './group-messages-sent.component';

describe('GroupMessagesSentComponent', () => {
  let component: GroupMessagesSentComponent;
  let fixture: ComponentFixture<GroupMessagesSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMessagesSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMessagesSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
