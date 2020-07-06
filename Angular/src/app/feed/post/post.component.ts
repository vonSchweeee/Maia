import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import moment from 'moment';

import { FeedService } from '../feed.service';
import { Post } from '../post.model';
import {Subject, Subscription} from "rxjs";
import {AuthService} from "../../shared/auth/auth.service";
import {Usuario} from "../../shared/models/Usuario";
import {MatDialog} from "@angular/material/dialog";
import {DialogDeletePostComponent} from "./dialog-delete-post/dialog-delete-post.component";
import {ToastService} from "../../shared/services/toast.service";

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

  constructor(private feedService: FeedService, private authService: AuthService, private dialog: MatDialog, private toast: ToastService) { }
  @Input() fullmode = false;

  ngOnInit(): void {
    this.commentEditModeSubs = this.feedService.commentEditSubj.subscribe(() => this.onHandleComment());
    if (this.fullmode)
      this.usuarioAtual = this.authService.usuarioSubj.value;
  }

  onDelete() {
    const dialogRef = this.dialog.open(DialogDeletePostComponent, {
      width: '400px',
      height: '140px',
      data: { post: this.post}
    });
    dialogRef.afterClosed().subscribe(deveExcluir => {
      if (deveExcluir) {
        this.feedService.deletePost(this.post.id).subscribe(() => this.toast.toast());
      }
    });
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
