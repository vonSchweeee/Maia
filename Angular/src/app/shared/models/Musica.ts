import {ArtistaMusica} from './ArtistaMusica';

export class Musica {
  public mediaNota?: number;
  public id?: number;
  public quantAvaliacoes?: number;
  public artistaMusicas: ArtistaMusica[];

  constructor(
    public titulo: string,
    public duracao: string,
    public single: boolean = false,
    public faixa?: number,
    public dataLanc?: Date,
    public urlSpotify?: string,
    public urlYoutube?: string,
    public urlImagem?: string,
  ) { }
}
