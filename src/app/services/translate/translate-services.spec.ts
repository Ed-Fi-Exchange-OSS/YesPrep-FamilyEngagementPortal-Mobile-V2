import { TestBed } from '@angular/core/testing';
import { TranslateServices } from './translate-services';



describe('TranslateServices', () => {
  let service: TranslateServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
