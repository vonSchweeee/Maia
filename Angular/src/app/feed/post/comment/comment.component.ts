import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comentario} from '../../comentario.model';
import {Usuario} from "../../../shared/models/Usuario";
import {FeedService} from "../../feed.service";
import {ToastService} from "../../../shared/services/toast.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comentario: Comentario;
  comentarioOriginal: Comentario;
  @Input() usuarioAtual: Usuario;
  @Input() fullmode = false;
  editMode = false;

  constructor(
    private feedService: FeedService,
    private toast: ToastService
    ) { }

  ngOnInit(): void {
    this.comentarioOriginal = { ...this.comentario };
  }

  onSeeMoreClick($event: MouseEvent) {
    this.comentario.dontPipe = true;
  }

  handleEdit() {
    this.editMode = ! this.editMode;
  }

  onKeyEditPress($event: KeyboardEvent) {
    if ($event.key === 'Enter') {
      this.onCommentChanged();
    }
  }

  onCommentChanged() {
    const comentarioReq = { ...this.comentario };
    delete comentarioReq.usuario;
    this.editMode = false;
    this.feedService.updateComentario(comentarioReq)
      .subscribe(() => {
      }, error => {
        this.comentario = { ...this.comentarioOriginal };
        this.toast.toast('Falha ao editar comentário!', 1200, "OK", true);
      });
  }
}
