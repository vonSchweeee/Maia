import { TestBed } from '@angular/core/testing';

import { TabResolverService } from './tab-resolver.service';

describe('TabResolverService', () => {
  let service: TabResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
