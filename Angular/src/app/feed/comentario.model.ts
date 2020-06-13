import {Usuario} from '../shared/models/Usuario';

export class Comentario {
   public id: number;
   public texto: string;
   public usuarioId: number;
   public usuario: Usuario;
   public postId: number;
   public respostas: any[];


  constructor(texto: string, usuarioId: number, postId: number) {
    this.texto = texto;
    this.usuarioId = usuarioId;
    this.postId = postId;
  }
}
