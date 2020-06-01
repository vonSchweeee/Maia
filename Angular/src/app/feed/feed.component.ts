import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { FeedService } from './feed.service';
import { Post } from './post.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnDestroy {

  constructor(private feedService: FeedService) { }

  posts: Post[];
  postsSub: Subscription;

  ngOnInit(): void {
    this.feedService.postsSubj.subscribe(posts => this.posts = posts);
    this.feedService.fetchPosts();
  }

  ngOnDestroy() {
    if (this.postsSub) {
      this.postsSub.unsubscribe();
    }
  }

}
