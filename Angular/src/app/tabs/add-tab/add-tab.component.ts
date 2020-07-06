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
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [],
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

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private tabService: TabService,
    private snackbar: MatSnackBar,
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
    this.textoTab = this.textoTab.replace(/<div>/g, '<br>').replace(/<\/div>/g, '');
    const textoTabRaw = this.textoTab.replace(/<br>/g, '\n');
    const usuario = this.authService.usuarioSubj.value;
    const tab =
      new Tab(
        this.musica.id,
        usuario.id,
        this.titulo,
        textoTabRaw,
        this.textoTab,
        this.afinacao,
        this.descricao,
        this.instrumento
      );
    this.tabService.addTab(tab)
      .subscribe(tab => {
        this.openSnackbar(`Tablatura de ${tab.instrumento.toLowerCase()} da música ${this.musica.titulo} adicionada`, 'Ok', 1500);
        setTimeout(() => {
          this.router.navigate([`/tabs/id/${tab.id}`]);
        }, 1500);
      });
  }

  onPaste($event: ClipboardEvent) {
    $event.preventDefault();

    // Pega o texto e substitui as quebras de linha pela tag em html
    const text = ($event).clipboardData.getData('text/plain').replace(/\n/g, '<br>');

    // Insere o texto
    document.execCommand("insertHTML", false, text);
  }

  openSnackbar(message: string, action: string, duration: number, error: boolean = false) {
    this.snackbar.open(message, action, {
      duration,
      panelClass: [error ? 'snackbar-error' : 'snackbar-success']
    });
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

        this.textoTab = e.target.result.replace(/\n/g, '<br>');

      };
      reader.onerror = error => reject(error);

    });
  }
}
