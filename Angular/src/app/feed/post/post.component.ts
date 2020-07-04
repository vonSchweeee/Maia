import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import moment from 'moment';

import { FeedService } from '../feed.service';
import { Post } from '../post.model';
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  commentMode = false;
  @Input() fixedCommentMode = false;
  commentEditModeSubs: Subscription;
  constructor(private feedService: FeedService) { }

  ngOnInit(): void {
    this.commentEditModeSubs = this.feedService.commentEditSubj.subscribe(() => this.onHandleComment());
  }

  onDelete() {
    this.feedService.deletePost(this.post.id).subscribe(() => console.log('deletado'));
  }

  onHandleComment() {
    this.commentMode = !this.commentMode;
  }

  handleFavorite() {
    if (this.post.favoritado) {
      this.feedService.desfavoritar(this.post.id);
    }
    else {
      this.feedService.favoritar(this.post.id);
    }
  }
}
