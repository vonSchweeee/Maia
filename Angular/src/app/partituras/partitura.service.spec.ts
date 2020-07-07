import { TestBed } from '@angular/core/testing';

import { PartituraService } from './partitura.service';

describe('PartituraService', () => {
  let service: PartituraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartituraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
