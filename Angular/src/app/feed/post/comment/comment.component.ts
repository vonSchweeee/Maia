import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comentario} from '../../comentario.model';
import {Usuario} from "../../../shared/models/Usuario";
import {FeedService} from "../../feed.service";
import {ToastService} from "../../../shared/services/toast.service";
import {GenericDialogDeleteComponent} from "../../../shared/components/generic-dialog-delete/generic-dialog-delete.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comentario: Comentario;
  @Input() postId: number;
  comentarioOriginal: Comentario;
  @Input() usuarioAtual: Usuario;
  @Input() fullmode = false;
  @Output() comentarioDeleted = new EventEmitter<Comentario>();
  editMode = false;

  constructor(
    private feedService: FeedService,
    private toast: ToastService,
    private dialog: MatDialog
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

  handleDelete() {
    const dialogRef = this.dialog.open(GenericDialogDeleteComponent, {
      maxWidth: '650px',
      data: this.comentario.texto
    });

    dialogRef.afterClosed().subscribe((deveExcluir: true | undefined) => {
      if (deveExcluir) {
        this.feedService.excluirComentario(this.comentario, this.postId)
          .subscribe(() => {
            this.toast.toast("Comentário removido com sucesso!");
            this.comentarioDeleted.emit(this.comentario);
          });
      }
    });
  }
}
