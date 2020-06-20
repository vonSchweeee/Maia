import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Artista } from '../../../shared/models/Artista';
import { ImageService } from '../../../shared/services/image.service';
import { ImageSnippet } from '../../../shared/utils/ImageSnippet';
import { DialogPreviewComponent } from './dialog-preview/dialog-preview.component';
import {AdminService} from "../../admin.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-artista',
  templateUrl: './add-artista.component.html',
  styleUrls: ['./add-artista.component.css']
})
export class AddArtistaComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private imageService: ImageService,
    private admService: AdminService,
    private snackBar: MatSnackBar
  ) { }
  image: ImageSnippet;
  artista: Artista;
  formArtista: NgForm;
  loading = false;

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

  onSubmit(form: NgForm) {
    if (! this.image || (! this.image.src || ! this.image.base64 || ! this.image.file)) {
      return alert('A imagem é obrigatória!');
    }

    this.formArtista = form;

    const { nome, biografia } = form.value;

    // O src da imagem é local e deve ser utilizado apenas para mostrar
    // o preview, o url verdadeiro vem após o upload.

    this.artista = new Artista(nome, biografia, this.image.src);

    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogPreviewComponent, {
      width: '470px',
      height: '550px',
      data: this.artista
    });

    dialogRef.afterClosed().subscribe(async () => {
      this.loading = true;
      const urlImagem = await this.imageService.uploadImageArtista(this.image, this.artista.nome);
      if (urlImagem) {
        this.artista.urlImagem = urlImagem;
        this.admService.addArtista(this.artista).subscribe(res => {
          this.openSnackBar(`O artista '${res.nome}' foi salvo com sucesso!`, "Ok.", 3500);
          if (this.formArtista)
            this.formArtista.reset();
          this.image = undefined;
          this.loading = false;
        },
          erro => {
            this.openSnackBar(`Erro: ${erro}`, "Ok.", 3500);
            this.loading = false;
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
}
