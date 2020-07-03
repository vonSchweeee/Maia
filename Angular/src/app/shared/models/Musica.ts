import {ArtistaMusica} from './ArtistaMusica';
import {Album} from "./Album";

export class Musica {
  public mediaNota?: number;
  public id?: number;
  public quantAvaliacoes?: number;
  public artistaMusicas: ArtistaMusica[];
  public album: Album;

  constructor(
    public titulo: string,
    public duracao: string,
    public single: boolean = false,
    public faixa?: number,
    public dataLanc?: Date,
    public urlSpotify?: string,
    public urlYoutube?: string,
    public urlImagem?: string,
    public albumId?: string,
  ) { }
}
