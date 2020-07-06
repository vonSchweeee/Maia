import {AnotacaoMusical} from "./AnotacaoMusical";
import {Usuario} from "./Usuario";
import {Musica} from "./Musica";

export class Partitura extends AnotacaoMusical {
  public titulo: string;
  public urlPdf: string;

  constructor(titulo: string, urlPdf: string, musicaId: number, usuarioId: number, id?: number, usuario?: Usuario, musica?: Musica) {
    super(musicaId, usuarioId, usuario, musica, id);
    this.titulo = titulo;
    this.urlPdf = urlPdf;
  }
}
