import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { FeedService } from './feed.service';
import { Post } from './post.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate('700ms cubic-bezier(.8, -0.6, 0.2, 1.3)',
          style({ transform: 'scale(1)', opacity: 1 }))  // final
      ])
    ])
  ]
})
export class FeedComponent implements AfterViewInit, OnDestroy {

  constructor(private feedService: FeedService) { }

  posts: Post[];
  postsSub: Subscription;
  enableAnimations = false;

  ngAfterViewInit(): void {
    this.feedService.postsSubj.subscribe(posts => this.posts = posts);
    this.feedService.fetchPosts().subscribe(
      posts => {
         this.posts = posts;
         this.enableAnimations = true;
      },
      erro => {
        console.log(erro);
        this.enableAnimations = true;
      });
  }

  ngOnDestroy() {
    if (this.postsSub) {
      this.postsSub.unsubscribe();
    }
  }

}
