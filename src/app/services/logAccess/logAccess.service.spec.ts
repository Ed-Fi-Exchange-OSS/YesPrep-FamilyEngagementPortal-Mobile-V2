import { TestBed } from '@angular/core/testing';

import { LogAccessService } from './logAccess.service';

describe('LogAccessService', () => {
  let service: LogAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
