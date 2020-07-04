import {Component, Input, OnInit} from '@angular/core';
import {Comentario} from '../../comentario.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comentario: Comentario;

  constructor() { }

  ngOnInit(): void {

  }

  onSeeMoreClick($event: MouseEvent) {
    this.comentario.dontPipe = true;
  }
}
