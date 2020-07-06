import { TestBed } from '@angular/core/testing';

import { PartiturasMusicaResolverService } from './partituras-musica-resolver.service';

describe('PartiturasMusicaResolverService', () => {
  let service: PartiturasMusicaResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartiturasMusicaResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
