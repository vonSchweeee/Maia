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

  constructor(
    private admService: AdminService,
    protected formBuilder: FormBuilder,
    private dialog: MatDialog,
    private imageService: ImageService,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: [null, Validators.required],
      artista: [this.artista.nome, Validators.required],
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
    if (this.artista.id && this.artistaName !== this.artista.nome) {
      this.resultsClosed = false;
    }
    if (this.artista.nome === this.artistaName)
      return;

    if (! this.artistaName)
      return;

    clearTimeout(this.timeoutPesquisa);
    this.timeoutPesquisa = setTimeout(() => {
      this.admService.fetchArtistasByNome(this.artistaName)
        .subscribe(res => {
          this.artistas = res;
        });
    }, 1800);
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
      const urlImagem = await this.imageService.uploadImageArtista(this.image, this.artista.nome);
      if (urlImagem) {
        this.artista.urlImagem = urlImagem;
        this.admService.addAlbum(this.album).subscribe(res => {
            this.openSnackBar(`O álbum '${res.titulo}' foi salvo com sucesso!`, "Ok.", 3500);
            if (this.form)
              this.form.reset();
            this.image = undefined;
            this.loading = false;
          },
          erro => {
            this.openSnackBar(`Erro: ${erro}`, "Ok.", 3500);
            this.loading = false;
            console.log(erro);
          });
      }
    });
  }

  openSnackBar(message: string, action: string, duration: number, error: boolean = false) {
    this.snackBar.open(message, action, {
      duration,
      panelClass: [error ? 'snackbar-error' : 'snackbar-success']
    });
  }

  onSubmit() {
    console.log(this.form);
    const {titulo, musicas} = this.form.value;
    this.album = new Album(titulo, new Date(), '', this.image.src, musicas);
    this.openDialog();
  }
}
