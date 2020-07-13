import { Component, OnInit } from '@angular/core';
import {Musica} from "../../shared/models/Musica";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../shared/auth/auth.service";
import {LetraService} from "../../letras/letras.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {response} from "../../letras/add-letra/add-letra-resolver.service";
import {Letra} from "../../shared/models/Letra";
import {instrumento, Tab} from "../../shared/models/Tab";
import {ImageSnippet} from "../../shared/utils/ImageSnippet";
import {TabService} from "../tab.service";
import {ToastService} from "../../shared/services/toast.service";

@Component({
  selector: 'app-add-tab',
  templateUrl: './add-tab.component.html',
  styleUrls: ['./add-tab.component.css']
})
export class AddTabComponent implements OnInit {

  textoTab: string;
  musica: Musica;
  instrumento: instrumento = 'Guitarra';
  afinacao = 'EADGBE';
  options = ['Guitarra', 'Violão', 'Baixo'];

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '660px',
    maxHeight: '660px',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    defaultParagraphSeparator: '',
    defaultFontName: 'monospace',
    defaultFontSize: '',
    // @ts-ignore
    fonts: ['monospace'],
    customClasses: [],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [ 'undo',
        'redo',
      ],
      ['fontName', 'insertImage', 'insertVideo'],
    ]
  };
  txtSorryVisible = false;
  titulo: string;
  descricao: string;
  finished = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private tabService: TabService,
    private toast: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.musica = this.route.snapshot.data.musica;
    const length = this.musica.artistaMusicas.length;
    const nomeUsuario = this.authService.usuarioSubj.value.nome;
    this.titulo = `${this.musica.artistaMusicas.map((am, i) => {
      return length === 1 ? am.artista.nome : i === length - 1 ? am.artista.nome : am.artista.nome + ', ';
    })} - ${this.musica.titulo} para ${this.instrumento} por ${nomeUsuario}`;
    console.log(this.titulo);
  }

  onSubmit() {
    const textoHtml = this.textoTab
      .replace(/<div>/g, '<br>')
      .replace(/<\/div>/g, '')
      .replace('<pre><font face="monospace">', '')
      .replace('</font></pre>', '');
    const textoTabRaw = this.textoTab.replace(/<br>/g, '\n');
    const usuario = this.authService.usuarioSubj.value;
    const tab =
      new Tab(
        this.musica.id,
        usuario.id,
        this.titulo,
        textoTabRaw,
        textoHtml,
        this.afinacao,
        this.descricao,
        this.instrumento
      );
    this.tabService.addTab(tab)
      .subscribe(res => {
        this.toast.toast(`Tablatura de ${res.instrumento.toLowerCase()} da música ${this.musica.titulo} adicionada`, 1500);
        this.finished = true;
        setTimeout(() => {
          this.router.navigate([`/tabs/id/${res.id}`]);
        }, 1500);
      });
  }

  onPaste($event: ClipboardEvent) {
    $event.preventDefault();

    // Pega o texto e substitui as quebras de linha pela tag em html
    let text = ($event).clipboardData.getData('text/plain');
    text = text.replace(' ', '&nbsp;');
    text = '<font face="monospace">' + text + '</font>';
    text = '<pre>' + text + '</pre>';
    // Insere o texto
    document.execCommand("insertHTML", false, text);
  }

  onTuningChange(event: instrumento) {
    if (event === 'Guitarra') {
      this.afinacao = 'EADGBE';
    }
    if (event === 'Baixo') {
      this.afinacao = 'EADG';
    }
    if (event === 'Violao') {
      this.afinacao = 'EADGBE';
    }

    if (/.* - .* para .* por .*/.test(this.titulo)) {
      const nomeUsuario = this.authService.usuarioSubj.value.nome;
      const length = this.musica.artistaMusicas.length;
      this.titulo = `${this.musica.artistaMusicas.map((am, i) => {
        return length === 1 ? am.artista.nome : i === length - 1 ? am.artista.nome : am.artista.nome + ', ';
      })} - ${this.musica.titulo} para ${this.instrumento === 'Violao' ? 'Violão' : this.instrumento} por ${nomeUsuario}`;
    }
  }

  async processFile(input: any) {
    const file: File = input.files[0];
    const reader = new FileReader();

    await new Promise<string | ArrayBuffer>((resolve, reject) => {

      reader.readAsText(file);

      reader.onload = (e: any) => {

        let text = e.target.result;
        console.log(text);
        text = '<font face="monospace">' + text + '</font>';
        text = '<pre>' + text + '</pre>';
        this.textoTab = text;
      };
      reader.onerror = error => reject(error);

    });
  }
}
