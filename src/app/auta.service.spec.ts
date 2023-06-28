import { TestBed } from '@angular/core/testing';

import { AutaService } from './auta.service';

describe('AutaService', () => {
  let service: AutaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
