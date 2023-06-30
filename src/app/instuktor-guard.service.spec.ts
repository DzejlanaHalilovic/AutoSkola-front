import { TestBed } from '@angular/core/testing';

import { InstuktorGuardService } from './instuktor-guard.service';

describe('InstuktorGuardService', () => {
  let service: InstuktorGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstuktorGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
