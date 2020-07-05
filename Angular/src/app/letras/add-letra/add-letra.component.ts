import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {Musica} from "../../shared/models/Musica";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-add-letra',
  templateUrl: './add-letra.component.html',
  styleUrls: ['./add-letra.component.css']
})
export class AddLetraComponent implements OnInit {

  textoLetra: string;
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
  musica: Musica;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.musica = this.route.snapshot.data.musica;
    console.log(this.musica);
  }

  onSubmit() {
    this.textoLetra = this.textoLetra.replace(/<div>/g, '<br>').replace(/<\/div>/g, '');
    console.log(this.textoLetra);
  }
}
