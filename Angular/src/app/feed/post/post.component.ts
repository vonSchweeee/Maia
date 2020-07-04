import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import moment from 'moment';

import { FeedService } from '../feed.service';
import { Post } from '../post.model';
import {Subject, Subscription} from "rxjs";
import {AuthService} from "../../shared/auth/auth.service";
import {Usuario} from "../../shared/models/Usuario";

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
  usuarioAtual: Usuario;

  constructor(private feedService: FeedService, private authService: AuthService) { }
  @Input() fullmode = false;

  ngOnInit(): void {
    this.commentEditModeSubs = this.feedService.commentEditSubj.subscribe(() => this.onHandleComment());
    if (this.fullmode)
      this.usuarioAtual = this.authService.usuarioSubj.value;
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
