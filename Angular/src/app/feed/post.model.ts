import { Usuario } from '../shared/models/Usuario';

export class Post {
  constructor(
    public titulo: string,
    public texto: string,
    public avaliacao: boolean,
    public tags: string[],
    public usuarioId?: number,
    public dataPub?: Date,
    public usuario?: Usuario,
    public comentarios?: any[],
    public musicaId?: number,
    public albumId?: number,
    public postId?: number,
  ) { }
}
