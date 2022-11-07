import { TestBed } from '@angular/core/testing';

import { LandingRouteService } from './landing-route.service';

describe('LandingRouteService', () => {
  let service: LandingRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandingRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
