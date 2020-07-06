import { Component, OnInit } from '@angular/core';
import {ImageSnippet} from "../../../shared/utils/ImageSnippet";
import {ImageService} from "../../../shared/services/image.service";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {NgForm} from "@angular/forms";
import {AdminService} from "../../admin.service";
import {Artista} from "../../../shared/models/Artista";
import {Album} from "../../../shared/models/Album";
import {Musica} from "../../../shared/models/Musica";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ArtistaMusica} from "../../../shared/models/ArtistaMusica";
import {ToastService} from "../../../shared/services/toast.service";

@Component({
  selector: 'app-add-musica',
  templateUrl: './add-musica.component.html',
  styleUrls: ['./add-musica.component.css']
})
export class AddMusicaComponent implements OnInit {

  image: ImageSnippet;
  single = true;
  loading = false;
  nomeArtista: string;
  artista = new Artista('', '');
  artistas: Artista[];
  nomeAlbum: string;
  album: Album;
  albuns: Album[];
  timeoutPesquisa: any;
  resultsArtistaClosed = false;
  resultsAlbumClosed = false;
  urlSpotify: string;
  urlYoutube: string;

  constructor(
    private imageService: ImageService,
    private admService: AdminService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
  }

  async processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    await new Promise<string | ArrayBuffer>((resolve, reject) => {

      reader.readAsDataURL(file);

      reader.onload = e => {

        if (typeof(reader.result) === typeof('') && typeof(e.target.result) === typeof(''))
          this.image = new ImageSnippet(e.target.result as string, reader.result as string, file);
      };
      reader.onerror = error => reject(error);

    });
  }

  onArtistaTxtChange() {
    this.resultsArtistaClosed = false;

    if (! this.nomeArtista) {
      this.resultsArtistaClosed = true;
      return;
    }

    if (this.artista.id && this.nomeArtista !== this.artista.nome) {
      this.resultsArtistaClosed = false;
    }
    if (this.artista.nome === this.nomeArtista)
      return;


    clearTimeout(this.timeoutPesquisa);
    this.timeoutPesquisa = setTimeout(() => {
      this.admService.fetchArtistasByNome(this.nomeArtista)
        .subscribe(res => {
          this.artistas = res;
        });
    }, 1000);
  }

  onAlbumTxtChange() {
    this.resultsAlbumClosed = false;

    if (! this.nomeAlbum) {
      this.resultsAlbumClosed = true;
      return;
    }

    if (this.album) {
      if (this.album.id && this.nomeAlbum !== this.album.titulo) {
        this.resultsAlbumClosed = false;
      }
      if (this.album.titulo === this.nomeAlbum)
        return;
    }


    clearTimeout(this.timeoutPesquisa);
    this.timeoutPesquisa = setTimeout(() => {
      this.admService.fetchAlbunsByNome(this.nomeAlbum)
        .subscribe(res => {
          console.log(res);
          this.albuns = res;
        });
    }, 1000);
  }

  get cantSubmit() {
    return ! this.artista.id ||  (this.single && ! this.image) || (! this.single && ! this.album) || this.loading;
  }

  onSelectArtista(artista: Artista) {
    this.artista = artista;
    this.nomeArtista = artista.nome;
    this.resultsArtistaClosed = true;
  }

  onSelectAlbum(album: Album) {
    this.album = album;
    this.nomeAlbum = album.titulo;
    this.artista = album.artista;
    this.nomeArtista = album.artista.nome;
    this.resultsAlbumClosed = true;
  }

  onSingleCheck($event: MatCheckboxChange) {
    this.single = $event.checked;
  }

  onSubmit(f: NgForm) {
    const {nome, urlSpotify, urlYoutube, duracao} = f.value;

    console.log(f.value);

    if (duracao === '00:00:00' || ! /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/gm.test(duracao)) {
      return alert('Insira uma duração no formato HH:mm:ss, que seja diferente de 00:00:00!');
    }

    this.loading = true;
    if (this.single) {
      this.imageService.uploadImageSingle(this.image, nome, this.artista.nome)
        .then(urlImagem => {
          const musica = new Musica(nome, duracao, this.single, undefined, undefined, urlSpotify, urlYoutube, urlImagem);
          musica.artistaMusicas = [new ArtistaMusica(this.artista.id, this.artista)];
          this.admService.addSingle(musica)
            .subscribe(res => {
              this.toast.toast(`Single ${res.titulo} adicionado com sucesso.`, 2000);
              this.loading = false;
              this.artista = new Artista('', '');
              this.nomeArtista = '';
              this.image = undefined;
              f.reset();
            }, erro => {
              console.log(erro);
              this.toast.toast(`Erro ao adicionar música.`, 2500, "OK", true);
              this.loading = false;
            });
        })
        .catch(err => {
          console.log(err);
          this.toast.toast(`Erro ao adicionar música.`, 2500, 'Ok', true);
          this.loading = false;
        });
    }

  }
}
