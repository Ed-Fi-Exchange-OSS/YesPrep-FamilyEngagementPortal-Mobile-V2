import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusleaderlandingComponent } from './campusleaderlanding.component';

describe('CampusleaderlandingComponent', () => {
  let component: CampusleaderlandingComponent;
  let fixture: ComponentFixture<CampusleaderlandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusleaderlandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusleaderlandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
