import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../admin.service';
import {Musica} from '../../../shared/models/Musica';
import {Router} from '@angular/router';
import {NgForm} from "@angular/forms";
import {Post} from "../../../feed/post.model";
import {GenericDialogDeleteComponent} from "../../../shared/components/generic-dialog-delete/generic-dialog-delete.component";
import {MatDialog} from "@angular/material/dialog";
import {ToastService} from "../../../shared/services/toast.service";

@Component({
  selector: 'app-lista-musica',
  templateUrl: './lista-musica.component.html',
  styleUrls: ['./lista-musica-management.component.css']
})
export class ListaMusicaManagementComponent implements OnInit {

  musicas: Musica[] = [];
  musicasRes: Musica[] = null;

  constructor(
    private admService: AdminService,
    private router: Router,
    private dialog: MatDialog,
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.admService.fetchMusicas().subscribe(musicas => {
      this.musicas = musicas;

    });
  }

  onMusicaClick(musica: Musica) {
    this.router.navigate([`/musica/${musica.id}`], {state: {musica} });
  }

  onSearchSubmit(form: NgForm) {
    const pesquisa = form.value.pesquisa;

    this.admService.fetchMusicasByNome(pesquisa)
      .subscribe(res => {
        console.log(res);
        this.musicasRes = res;
      });
  }

  onMusicaDelete(musica: Musica) {
    const dialogRef = this.dialog.open(GenericDialogDeleteComponent, {
      maxWidth: '650px',
      width: '85%',
      data: musica.titulo
    });
    dialogRef.afterClosed().subscribe((deveExcluir: true | undefined) => {
      if (deveExcluir) {
        this.admService.excluirMusica(musica)
          .subscribe(() => {
            this.toast.toast(`Música ${musica.titulo} removida com sucesso!`);
            this.musicas.splice(this.musicas.indexOf(musica), 1);
          },
          error => {
            this.toast.toast('Falha ao remover música', 2000, "OK", true);
          });
      }
    });
  }

  onMusicaEdit(musica: Musica) {
    this.router.navigate([`/admin/musicas/editar/${musica.id}`]);
  }
}
