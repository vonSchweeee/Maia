import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { FeedService } from './feed.service';
import { Post } from './post.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements AfterViewInit, OnDestroy {

  constructor(private feedService: FeedService) { }

  posts: Post[];
  postsSub: Subscription;

  ngAfterViewInit(): void {
    this.feedService.postsSubj.subscribe(posts => this.posts = posts);
    this.feedService.fetchPosts();
  }

  ngOnDestroy() {
    if (this.postsSub) {
      this.postsSub.unsubscribe();
    }
  }

}
