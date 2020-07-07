import { Component, OnInit } from '@angular/core';
import {Musica} from "../../shared/models/Musica";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {PartituraService} from "../partitura.service";
import {AuthService} from "../../shared/auth/auth.service";
import {Partitura} from "../../shared/models/Partitura";
import {ToastService} from "../../shared/services/toast.service";

@Component({
  selector: 'app-add-partitura',
  templateUrl: './add-partitura.component.html',
  styleUrls: ['./add-partitura.component.css']
})
export class AddPartituraComponent implements OnInit {

  musica: Musica;
  nomeArquivo = '';
  pdf: File;
  titulo = '';
  nomeUsuario: string;
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private pttService: PartituraService,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.musica = this.route.snapshot.data.musica;
    this.nomeUsuario = this.authService.usuarioSubj.value.nome;
    const artistas = this.musica.artistaMusicas.map(am => am.artista.nome);
    this.titulo = `${artistas.join(', ')} - ${this.musica.titulo} por ${this.nomeUsuario}`;
  }


  async onSubmit() {
    this.loading = true;
    const idUsuario = this.authService.usuarioSubj.value.id;
    const urlPdf = await this.pttService.uploadPdf(
      this.pdf, this.musica.artistaMusicas, this.musica.titulo, this.nomeUsuario
    );
    const partitura = new Partitura(this.titulo, urlPdf, this.musica.id, idUsuario);

    this.pttService.addPartitura(partitura)
      .subscribe(res => {
        this.toastService.toast('Partitura adicionada com sucesso!', 1400)
          .afterDismissed().subscribe(() => this.router.navigate([`/partituras/id/${res.id}`]));

      },
      err => {
        this.toastService.toast('Erro ao adicionar partitura.', 2600, "OK", true);
        this.loading = false;
      });
  }

  processFile(inputFile: HTMLInputElement) {
    const file: File = inputFile.files[0];
    this.nomeArquivo = file.name;
    this.pdf = file;


  }
}
