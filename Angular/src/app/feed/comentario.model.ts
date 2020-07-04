import {Usuario} from '../shared/models/Usuario';

export class Comentario {
   public id: number;
   public texto: string;
   public usuarioId: number;
   public usuario: Usuario;
   public postId: number;
   public respostas: any[];
   public dataPub: Date;
   public dontPipe = false; // Atributo apenas para a view;


  constructor(texto: string, usuarioId: number, postId: number) {
    this.texto = texto;
    this.usuarioId = usuarioId;
    this.postId = postId;
  }
}
