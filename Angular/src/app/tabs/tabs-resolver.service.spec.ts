import { TestBed } from '@angular/core/testing';

import { TabsResolverService } from './tabs-resolver.service';

describe('TabsResolverService', () => {
  let service: TabsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
