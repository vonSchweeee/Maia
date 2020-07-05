import { Pipe, PipeTransform } from '@angular/core';
import {Artista} from "../models/Artista";
import {ArtistaMusica} from "../models/ArtistaMusica";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Pipe({
  name: 'artistas'
})
export class ArtistasPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(am: ArtistaMusica[], type: 'string' | 'link' = 'link'): SafeHtml {
    if (type === 'link') {
      if (am.length === 1) {
        const link = `/artistas/id/${am[0].artista.id}`;
        const artistaStr = `<a href="${link}" style="color: #FAFAFA;">` + am[0].artista.nome + '</a>';
        return this.sanitizer.bypassSecurityTrustHtml(artistaStr);
      } else {
        let artistasStr = '';

        am.forEach((item, index) => {
          const link = `/artistas/id/${item.artista.id}`;

          if ((index === 0 && am.length === 1) || index === am.length - 1)
            artistasStr += `<a href="${link}" style="color: #FAFAFA;">` + item.artista.nome + '</a>';
          else
            artistasStr += `<a href="${link}" style="color: #FAFAFA;">` + item.artista.nome + '</a>, ';

        });

        return this.sanitizer.bypassSecurityTrustHtml(artistasStr);
      }
    }
    else {
      if (am.length === 1) {
        const artistaStr = am[0].artista.nome;
        return artistaStr;
      } else {
        let artistasStr = '';

        am.forEach((item, index) => {
          if ((index === 0 && am.length === 1) || index === am.length - 1)
            artistasStr += item.artista.nome;
          else
            artistasStr += item.artista.nome + ', ';

        });

        return artistasStr;
      }
    }
  }

}
