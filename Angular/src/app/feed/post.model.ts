import { Usuario } from '../shared/models/Usuario';

export class Post {
  constructor(
    public postId: number,
    public titulo: string,
    public texto: string,
    public dataPub: string,
    public avaliacao: boolean,
    public tags: string[],
    public usuarioId: number,
    public usuario?: Usuario,
    public comentarios?: any[],
    public musicaId?: number,
    public albumId?: number
  ) { }
}
