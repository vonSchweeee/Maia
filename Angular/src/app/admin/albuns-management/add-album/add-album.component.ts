import { Component, OnInit } from '@angular/core';
import {ImageSnippet} from "../../../shared/utils/ImageSnippet";
import {Artista} from "../../../shared/models/Artista";
import {AdminService} from "../../admin.service";
import {Musica} from "../../../shared/models/Musica";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogPreviewArtistaComponent} from "../../artistas-management/add-artista/dialog-preview-artista/dialog-preview-artista.component";
import {MatDialog} from "@angular/material/dialog";
import {ImageService} from "../../../shared/services/image.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Album} from "../../../shared/models/Album";
import {DialogPreviewAlbumComponent} from "./dialog-preview-album/dialog-preview-album.component";
import {ToastService} from "../../../shared/services/toast.service";

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css']
})
export class AddAlbumComponent implements OnInit {

  image: ImageSnippet;
  loading = false;
  artista = new Artista('', '');
  artistas: Artista[];
  timeoutPesquisa: any;
  resultsClosed = false;
  form: FormGroup;
  album: Album;
  faixaAtual = 1;
  urlSpotify: string;

  constructor(
    private admService: AdminService,
    protected formBuilder: FormBuilder,
    private dialog: MatDialog,
    private imageService: ImageService,
    private toast: ToastService
  ) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: [null, Validators.required],
      artista: [this.artista.nome, Validators.required],
      urlSpotify: [null],
      musicas: new FormArray([])
    });
    this.form.get('artista').valueChanges.subscribe(value => {
      this.onArtistaTxtChange();
    });
  }


  get musicasForm() {
    return this.form.get('musicas') as FormArray;
  }

  get artistaName() {
    return this.form.get('artista').value as string;
  }

  set artistaName(value: string) {
    this.form.get('artista').setValue(value);
  }

  addMusica() {
    const musica = this.formBuilder.group({
      titulo: [null, Validators.required],
      duracao: ['00:00:00'
        // , Validators.pattern(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/gm)
      ],
      urlSpotify: [null],
      urlYoutube: [null],
      faixa: this.faixaAtual
    });
    this.musicasForm.push(musica);

    this.faixaAtual++;
  }

  deleteMusica(i: number) {
    this.musicasForm.removeAt(i);

    this.faixaAtual--;
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

    this.resultsClosed = false;

    if (! this.artistaName) {
      console.log('a');
      this.resultsClosed = true;
      return;
    }

    if (this.artista.id && this.artistaName !== this.artista.nome) {
      this.resultsClosed = false;
    }
    if (this.artista.nome === this.artistaName)
      return;

    clearTimeout(this.timeoutPesquisa);
    this.timeoutPesquisa = setTimeout(() => {
      this.admService.fetchArtistasByNome(this.artistaName)
        .subscribe(res => {
          this.artistas = res;
        });
    }, 1000);
  }

  onSelectArtista(artista: Artista) {
    this.artista = artista;
    this.artistaName = artista.nome;
    this.resultsClosed = true;
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogPreviewAlbumComponent, {
      width: '470px',
      height: '550px',
      data: this.album
    });

    dialogRef.afterClosed().subscribe(async () => {
      this.loading = true;
      const urlImagem = await this.imageService.uploadImageAlbum(this.image, this.artista.nome);
      if (urlImagem) {
        this.album.urlImagem = urlImagem;
        this.admService.addAlbum(this.album).subscribe(res => {
            this.toast.toast(`O álbum '${res.titulo}' foi salvo com sucesso!`, 3500);
            if (this.form)
              this.form.reset();
            this.image = undefined;
            this.loading = false;
            this.artista = undefined;
            this.musicasForm.clear();
          },
          erro => {
            this.toast.toast(`Erro: ${erro}`, 3500);
            this.loading = false;
            console.log(erro);
          });
      }
    });
  }

  onSubmit() {
    console.log(this.form);
    const {titulo, musicas, urlSpotify} = this.form.value;

    if (! this.validate(musicas))
      return;

    if (! confirm(`Deseja adicionar o álbum ${titulo}?`))
      return;
    this.album = new Album(titulo, new Date(), urlSpotify, this.image.src, musicas, this.artista.id);
    this.openDialog();
  }


  validate(musicas: Musica[]): boolean {
    const erros: string[] = [];
    if (musicas.length < 1)
      erros.push("Insira pelo menos uma música!");
    else {
      musicas.forEach(musica => {
        if (musica.duracao === '00:00:00' || ! /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/gm.test(musica.duracao)) {
          erros.push(`${musica.titulo}: Insira uma duração no formato HH:mm:ss, que seja diferente de 00:00:00!`);
        }
      });
    }
    if (! this.artista.id)
      erros.push("Por favor selecione um artista que aparece nos resultados!");

    if (erros.length > 0) {
      const mensagem = erros.join('\n');
      alert(mensagem);
      return false;
    }
    else
      return true;
  }

}
