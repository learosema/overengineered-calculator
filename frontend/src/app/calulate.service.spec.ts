import { TestBed } from '@angular/core/testing';

import { CalulateService } from './calulate.service';

describe('CalulateService', () => {
  let service: CalulateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalulateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
