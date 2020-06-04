/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SearchResolverService } from './search-resolver.service';

describe('Service: SearchResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchResolverService]
    });
  });

  it('should ...', inject([SearchResolverService], (service: SearchResolverService) => {
    expect(service).toBeTruthy();
  }));
});
