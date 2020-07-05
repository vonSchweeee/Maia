import { TestBed } from '@angular/core/testing';

import { LetrasResolverService } from './letras-resolver.service';

describe('LetrasResolverService', () => {
  let service: LetrasResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LetrasResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
