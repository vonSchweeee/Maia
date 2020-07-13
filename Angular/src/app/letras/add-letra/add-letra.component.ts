import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {Musica} from "../../shared/models/Musica";
import {ActivatedRoute, Router} from "@angular/router";
import {Letra} from "../../shared/models/Letra";
import {Usuario} from "../../shared/models/Usuario";
import {AuthService} from "../../shared/auth/auth.service";
import {LetraService} from "../letras.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {response} from "./add-letra-resolver.service";
import {ToastService} from "../../shared/services/toast.service";

@Component({
  selector: 'app-add-letra',
  templateUrl: './add-letra.component.html',
  styleUrls: ['./add-letra.component.css']
})
export class AddLetraComponent implements OnInit {

  finished = false;
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
    private toast: ToastService,
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
        this.finished = true;
        this.toast.toast(`Letra em ${res.idioma} de ${this.musica.titulo} adicionada`,  1500);
        setTimeout(() => {
          this.router.navigate([`/letras/id/${res.musicaId}`]);
        }, 1500);
      }, erro => this.toast.toast("Erro", 2000, "OK", false));
  }

  onPaste($event: ClipboardEvent) {
    $event.preventDefault();

    // Pega o texto e substitui as quebras de linha pela tag em html
    const text = ($event).clipboardData.getData('text/plain').replace(/\n/g, '<br>');

    // Insere o texto
    document.execCommand("insertHTML", false, text);
  }
}
