import {Component, Input, OnInit} from '@angular/core';
import {Comentario} from '../../comentario.model';
import {Usuario} from "../../../shared/models/Usuario";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comentario: Comentario;
  @Input() usuarioAtual: Usuario;
  @Input() fullmode = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSeeMoreClick($event: MouseEvent) {
    this.comentario.dontPipe = true;
  }
}
