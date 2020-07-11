import { TestBed } from '@angular/core/testing';

import { MusicaEditResolverService } from './musica-edit-resolver.service';

describe('MusicaEditResolverService', () => {
  let service: MusicaEditResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicaEditResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
