import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Tab} from "../../shared/models/Tab";
import {Observable} from "rxjs";
import {TabService} from "../tab.service";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TabsMusicaResolverService implements Resolve<Tab[]>{

  constructor(private service: TabService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tab[]> | Promise<Tab[]> | Tab[] {
    const id = route.params.id;
    return this.service.fetchTabsByMusicaId(id)
      .pipe(tap(tabs => {
        if (! tabs || ! tabs.length)
          this.router.navigate([`/tabs/add/musica/${id}`]);
      }));
  }

}
