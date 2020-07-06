import { TestBed } from '@angular/core/testing';

import { PartiturasResolverService } from './partituras-resolver.service';

describe('PartiturasResolverService', () => {
  let service: PartiturasResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartiturasResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
