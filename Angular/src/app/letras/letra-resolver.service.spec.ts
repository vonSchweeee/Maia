import { TestBed } from '@angular/core/testing';

import { LetraResolverService } from './letra-resolver.service';

describe('LetraResolverService', () => {
  let service: LetraResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LetraResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
