import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {Musica} from "../../shared/models/Musica";
import {ActivatedRoute, Router} from "@angular/router";
import {Letra} from "../../shared/models/Letra";
import {Usuario} from "../../shared/models/Usuario";
import {AuthService} from "../../shared/auth/auth.service";
import {LetraService} from "../letra.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {response} from "./add-letra-resolver.service";

@Component({
  selector: 'app-add-letra',
  templateUrl: './add-letra.component.html',
  styleUrls: ['./add-letra.component.css']
})
export class AddLetraComponent implements OnInit {

  textoLetra: string;
  musica: Musica;
  idioma = 'PT-BR';
  options = ['PT-BR', 'EN-US'];
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '660px',
    maxHeight: '660px',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: false,
    showToolbar: false,
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    // toolbarHiddenButtons: [
    //   ['bold',
    //     'italic',
    //     'undo',
    //     'redo',
    //     'subscript',
    //     'superscript',
    //     'justifyLeft',
    //     'justifyCenter',
    //     'justifyRight',
    //     'justifyFull'],
    //   ['fontSize', 'fontName', 'insertImage', 'insertVideo'],
    // ]
  };
  txtSorryVisible = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private letraService: LetraService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    const res: response = this.route.snapshot.data.response;

    if (res.completo)
      this.router.navigate(['/feed']);

    if (! res.idiomas || ! res.idiomas.length) {
      this.txtSorryVisible = true;
    }

    this.musica = res.musica;

    res.idiomas.forEach(idioma => {
      const i = this.options.indexOf(idioma);
      this.options.splice(i);
    });
  }

  onSubmit() {
    this.textoLetra = this.textoLetra.replace(/<div>/g, '<br>').replace(/<\/div>/g, '');
    const textoLetraRaw = this.textoLetra.replace(/<br>/g, '\n');
    const usuario = this.authService.usuarioSubj.value;
    const letra = new Letra(this.musica.id, usuario.id, this.idioma, textoLetraRaw, this.textoLetra);
    this.letraService.addLetra(letra)
      .subscribe(res => {
        this.openSnackbar(`Letra em ${res.idioma} de ${this.musica.titulo} adicionada`, 'Ok', 1500);
        setTimeout(() => {
          this.router.navigate([`/letras/id/${res.id}`]);
        }, 1500);
      });
  }

  onPaste($event: ClipboardEvent) {
    $event.preventDefault();

    // get text representation of clipboard
    const text = ($event).clipboardData.getData('text/plain');

    // insert text manually
    document.execCommand("insertHTML", false, text);
  }

  openSnackbar(message: string, action: string, duration: number, error: boolean = false) {
    this.snackbar.open(message, action, {
      duration,
      panelClass: [error ? 'snackbar-error' : 'snackbar-success']
    });
  }
}
