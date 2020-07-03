import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs/operators';

import { FeedService } from '../feed.service';
import { Post } from '../post.model';

@Injectable({providedIn: 'root'})
export class PostResolverService implements Resolve<Post> {

  constructor(
    private feedService: FeedService,
    private router: Router,
    private currentRoute: ActivatedRoute
    ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.feedService.fetchPost(+route.params.id)
    .pipe(tap(post => {
      if (! post)
        this.router.navigate(['/feed']);
    }));
  }
}
