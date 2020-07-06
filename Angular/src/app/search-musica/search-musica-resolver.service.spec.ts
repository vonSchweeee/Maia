import { TestBed } from '@angular/core/testing';

import { SearchMusicaResolverService } from './search-musica-resolver.service';

describe('SearchMusicaResolverService', () => {
  let service: SearchMusicaResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchMusicaResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
