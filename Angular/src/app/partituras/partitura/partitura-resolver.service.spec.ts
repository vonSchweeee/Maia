import { TestBed } from '@angular/core/testing';

import { PartituraResolverService } from './partitura-resolver.service';

describe('PartituraResolverService', () => {
  let service: PartituraResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartituraResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
