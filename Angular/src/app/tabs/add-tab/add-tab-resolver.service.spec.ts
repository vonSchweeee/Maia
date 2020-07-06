import { TestBed } from '@angular/core/testing';

import { AddTabResolverService } from './add-tab-resolver.service';

describe('AddTabResolverService', () => {
  let service: AddTabResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTabResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
