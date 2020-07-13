import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';

import { FeedService } from '../feed.service';
import { Post } from '../post.model';
import {Subject, Subscription} from "rxjs";
import {AuthService} from "../../shared/auth/auth.service";
import {Usuario} from "../../shared/models/Usuario";
import {MatDialog} from "@angular/material/dialog";
import {DialogDeletePostComponent} from "./dialog-delete-post/dialog-delete-post.component";
import {ToastService} from "../../shared/services/toast.service";
import {DialogEditPostComponent} from "./dialog-edit-post/dialog-edit-post.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Comentario} from "../comentario.model";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  commentMode = false;
  @Input() fixedCommentMode = false;
  @Input() showActions = true;
  commentEditModeSubs: Subscription;
  usuarioAtual: Usuario;

  constructor(
    private feedService: FeedService,
    private authService: AuthService,
    private dialog: MatDialog,
    private toast: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  @Input() fullmode = false;

  ngOnInit(): void {
    this.commentEditModeSubs = this.feedService.commentEditSubj.subscribe(() => this.onHandleComment());
    this.usuarioAtual = this.authService.usuarioSubj.value;
  }

  onDelete() {
    const dialogRef = this.dialog.open(DialogDeletePostComponent, {
      width: '400px',
      data: { post: this.post}
    });
    dialogRef.afterClosed().subscribe(deveExcluir => {
      if (deveExcluir) {
        this.feedService.deletePost(this.post.id).subscribe(() => {
            this.toast.toast("Post removido com sucesso.");
            this.router.navigate(['/feed']);
          }
        );
      }
    });
  }

  onEdit() {
    const dialogRef = this.dialog.open(DialogEditPostComponent, {
      maxWidth: '650px',
      width: '85%',
      data: { post: this.post}
    });
    dialogRef.afterClosed().subscribe((post: Post) => {
      if (post) {
        this.feedService.editPost(post).subscribe(res => {
          res.usuario = this.post.usuario;
          this.post = res;
          this.toast.toast();
        });
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

  onCommentMade() {
    this.commentMode = false;
  }

  onTagClick(tag: string) {
    this.router.navigate(['/feed'], {
      queryParams: { tag }
    });
  }

  onComentarioDeleted(comentario: Comentario) {
    this.post.comentarios.splice(
      this.post.comentarios.indexOf(comentario),
      1
    );
    this.post.quantCmt--;
  }
}
