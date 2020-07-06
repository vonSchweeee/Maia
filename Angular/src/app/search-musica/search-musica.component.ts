import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Musica} from "../shared/models/Musica";
import {MusicaService} from "../musica/musica.service";
import {SearchService} from "../search/search.service";

@Component({
  selector: 'app-search-musica',
  templateUrl: './search-musica.component.html',
  styleUrls: ['./search-musica.component.css']
})
export class SearchMusicaComponent implements OnInit {

  musicas: Musica[];
  pesquisa: string;

  constructor(private route: ActivatedRoute, private mscService: MusicaService, private searchService: SearchService) { }

  ngOnInit(): void {
    this.musicas = this.route.snapshot.data.musicas;
    this.pesquisa = this.route.snapshot.queryParams.nome;
    this.searchService.searchSubj.next(this.pesquisa);
    this.searchService.searchSubj.next(this.pesquisa);
    this.route.queryParams.subscribe(params => {
      this.pesquisa = params.nome;
      this.mscService.fetchMusicasByNome(params.nome)
        .subscribe(musicas => this.musicas = musicas);
    });
  }

}
