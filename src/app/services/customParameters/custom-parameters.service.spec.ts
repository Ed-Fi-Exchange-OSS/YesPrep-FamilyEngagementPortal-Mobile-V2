import { TestBed } from '@angular/core/testing';

import { CustomParametersService } from './custom-parameters.service';

describe('CustomParametersService', () => {
  let service: CustomParametersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomParametersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
