import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../shared/auth/auth.service';
import { Usuario } from '../shared/models/Usuario';
import {MusicaService} from "../musica/musica.service";
import {SearchService} from "../search/search.service";

type positions = {
  admin: number;
  feed: number;
  letras: number;
  partituras: number;
  tabs: number;
};

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  usuario: Usuario;
  usuarioSub: Subscription;
  searching = false;
  searchSub: Subscription;
  pesquisa = '';
  admin = false;
  position = 1;
  maxPos = 4;
  pos: positions = {
    admin: null,
    feed: 1,
    letras: 2,
    partituras: 3,
    tabs: 4
  };

  constructor(private authService: AuthService,
              private router: Router, private searchService: SearchService) {
    this.admin = authService.usuarioSubj.value.isAdm;
    if (this.admin) {
      this.maxPos = 5;
      this.pos = {
        admin: 1,
        feed: 2,
        letras: 3,
        partituras: 4,
        tabs: 5
      };

      switch (router.url.split('/')[0]) {
        case 'admin':
          this.position = 1;
          break;
        case 'feed':
          this.position = 2;
          break;
        case 'letras':
          this.position = 3;
          break;
        case 'partituras':
          this.position = 4;
          break;
        case 'tabs':
          this.position = 5;
          break;
      }
    }
    else {
      this.maxPos = 4;
      switch (router.url.split('/')[0]) {
        case 'feed':
          this.position = 1;
          break;
        case 'letras':
          this.position = 2;
          break;
        case 'partituras':
          this.position = 3;
          break;
        case 'tabs':
          this.position = 4;
          break;
      }
    }
  }

  ngOnInit() {
    this.usuarioSub = this.authService.usuarioSubj
      .subscribe(usuario => this.usuario = usuario);
    this.searchSub = this.searchService.searchSubj.subscribe(value => this.pesquisa = value);
  }

  ngOnDestroy() {
    if (this.usuarioSub)
      this.usuarioSub.unsubscribe();
    if (this.searchSub)
      this.searchSub.unsubscribe();

  }

  onLogout() {
    this.authService.logout();
  }

  onSearch() {
    if (! this.searching) {
      this.searching = ! this.searching;
      setTimeout(() => {
        (document.querySelector('.input-pesquisa') as HTMLInputElement).focus();
      }, 250);
    }
    else {
      if (! this.pesquisa) {
        this.searching = ! this.searching;
      }
      else {
        if (this.pesquisa.startsWith('#')) {
          this.router.navigate([`/posts/tag/${this.pesquisa.replace('#', '')}`]);
        }
        else {
          this.router.navigate(['/musicas'], {queryParams: { nome: this.pesquisa }});
        }
      }
    }
  }

  onCancelSearch() {
    this.searching = false;
    this.searchService.searchSubj.next(null);
  }

  onKeyPress($event: KeyboardEvent) {
    if ($event.key !== "Enter")
      return;
    else {
      this.onSearch();
    }
  }

  onNavigate(route: 'admin'| 'feed' | 'letras' | 'partituras' | 'tabs') {
    const animation = this.getAnimation(route);

    const nextRoute = this.router.config.find(r => r.path === `${route}`);
    const previousRoute = this.router.config.find(r => r.path === `${this.router.url.split('/')[1]}`);


    nextRoute.data = { animation };
    this.router.navigate([`/${route}`]);

    this.searchService.searchSubj.next(null);
    this.searching = false;
  }

  getAnimation(position: 'admin'| 'feed' | 'letras' | 'partituras' | 'tabs'): 'isRight' | 'isLeft' {
    const currentPos = +this.position;
    this.position = this.pos[position];
    return this.pos[position] - currentPos >  0 ? 'isRight' : 'isLeft';
  }
}
