import { TestBed } from '@angular/core/testing';

import { AddLetraResolverService } from './add-letra-resolver.service';

describe('AddLetraResolverService', () => {
  let service: AddLetraResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddLetraResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
