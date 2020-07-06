import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../admin.service';
import {Musica} from '../../../shared/models/Musica';
import {Router} from '@angular/router';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-lista-musica',
  templateUrl: './lista-musica.component.html',
  styleUrls: ['./lista-musica-management.component.css']
})
export class ListaMusicaManagementComponent implements OnInit {

  musicas: Musica[] = [];
  musicasRes: Musica[] = null;

  constructor(private admService: AdminService, private router: Router) { }

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
}
