import {AnotacaoMusical} from "./AnotacaoMusical";
import {Usuario} from "./Usuario";
import {Musica} from "./Musica";

export class Letra extends AnotacaoMusical {

  public idioma: string;
  public texto: string;
  public textoHtml: string;

  constructor(
    musicaId: number, usuarioId: number, idioma: string, texto: string, textoHtml: string, usuario?: Usuario, musica?: Musica, id?: number
  ) {
    super(musicaId, usuarioId, usuario, musica, id);
    this.idioma = idioma;
    this.texto = texto;
    this.textoHtml = textoHtml;
  }
}
