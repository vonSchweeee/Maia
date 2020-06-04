import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs/operators';

import { FeedService } from '../feed/feed.service';
import { Post } from '../feed/post.model';

@Injectable({providedIn: 'root'})
export class SearchResolverService implements Resolve<Post[]> {

  constructor(
    private feedService: FeedService,
    private router: Router,
    private currentRoute: ActivatedRoute
    ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.url[1]) {
      return this.feedService.fetchPostsByTag(route.url[1].path)
      .pipe(tap(posts => {
        if (! posts)
          this.router.navigate(['/feed']);
      }));
    }
  }
}
