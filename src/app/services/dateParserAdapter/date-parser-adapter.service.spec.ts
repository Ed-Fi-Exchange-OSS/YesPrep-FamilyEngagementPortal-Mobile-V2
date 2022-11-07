import { TestBed } from '@angular/core/testing';

import { DateParserAdapterService } from './date-parser-adapter.service';

describe('DateParserAdapterService', () => {
  let service: DateParserAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateParserAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
