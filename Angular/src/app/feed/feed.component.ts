import { animate, style, transition, trigger } from '@angular/animations';
import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';

import { FeedService } from './feed.service';
import { Post } from './post.model';
import {ActivatedRoute, Router} from "@angular/router";
import {SearchService} from "../search/search.service";

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
export class FeedComponent implements OnInit, OnDestroy {

  public searchMode = false;
  private searchSub: Subscription;

  constructor(
    private feedService: FeedService,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private router: Router
  ) { }

  posts: Post[];
  postsSub: Subscription;
  querySub: Subscription;
  enableAnimations = false;

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe(params => {
      if (params.tag) {
        this.enableAnimations = false;
        this.searchMode = true;
        this.searchService.searchSubj.next('#'.concat(params.tag));
        this.feedService.fetchPostsByTag(this.route.snapshot.queryParams.tag)
          .subscribe(posts => {
            this.posts = posts;
            this.enableAnimations = true;

            this.searchSub = this.searchService.searchSubj.subscribe(search => {
              if (! search) {
                this.router.navigate([], {
                  relativeTo: this.route
                });
              }
            });
          });
      }
      else if (! params.tag) {
        this.searchMode = false;
        this.searchService.searchSubj.next(null);
        this.fetchAllPosts();
      }
    });
    if (this.route.snapshot.queryParams.tag) {
      this.searchMode = true;
      this.feedService.fetchPostsByTag(this.route.snapshot.queryParams.tag)
        .subscribe(posts => {
          this.posts = posts;
          this.enableAnimations = true;
        });
    }
    else {
      this.fetchAllPosts();
    }
  }

  ngOnDestroy() {
    if (this.postsSub)
      this.postsSub.unsubscribe();
    if (this.querySub)
      this.querySub.unsubscribe();
    if (this.searchSub)
      this.searchSub.unsubscribe();
  }

  fetchAllPosts() {
    this.enableAnimations = false;
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

}
