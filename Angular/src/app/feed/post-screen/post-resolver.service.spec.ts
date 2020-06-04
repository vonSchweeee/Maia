/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PostResolverService } from './post-resolver.service';

describe('Service: PostResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostResolverService]
    });
  });

  it('should ...', inject([PostResolverService], (service: PostResolverService) => {
    expect(service).toBeTruthy();
  }));
});
