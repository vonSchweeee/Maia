import {AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FeedService} from "../../feed.service";
import {NgForm} from "@angular/forms";
import {Comentario} from "../../comentario.model";
import {AuthService} from "../../../shared/auth/auth.service";
import {Post} from "../../post.model";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements AfterViewInit {

  @ViewChild('inputComment') inputComment: ElementRef<HTMLInputElement>;
  @Input() idPost: number;
  @Input() post: Post;

  constructor(private feedService: FeedService, private authService: AuthService) { }

  ngAfterViewInit() {
    this.inputComment.nativeElement.focus();
  }

  onSubmit(form: NgForm) {
    const commentText = form.value.comentario;
    const usuario = this.authService.usuarioSubj.value;
    const comentario = new Comentario(commentText, usuario.id, this.idPost);
    form.reset();
    this.feedService.makeComment(comentario, usuario, this.post)
      .subscribe();
  }

}
