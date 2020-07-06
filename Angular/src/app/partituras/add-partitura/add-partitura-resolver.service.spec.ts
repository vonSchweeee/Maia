import { TestBed } from '@angular/core/testing';

import { AddPartituraResolverService } from './add-partitura-resolver.service';

describe('AddPartituraResolverService', () => {
  let service: AddPartituraResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPartituraResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
