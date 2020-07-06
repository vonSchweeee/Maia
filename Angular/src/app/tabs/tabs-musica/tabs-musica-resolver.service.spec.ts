import { TestBed } from '@angular/core/testing';

import { TabsMusicaResolverService } from './tabs-musica-resolver.service';

describe('TabsMusicaResolverService', () => {
  let service: TabsMusicaResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabsMusicaResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
