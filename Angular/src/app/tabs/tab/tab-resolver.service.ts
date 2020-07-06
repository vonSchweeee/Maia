import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Tab} from "../../shared/models/Tab";
import {Observable} from "rxjs";
import {TabService} from "../tab.service";

@Injectable({
  providedIn: 'root'
})
export class TabResolverService implements Resolve<Tab> {

  constructor(private service: TabService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tab> | Promise<Tab> | Tab {
    const id = route.params.id;
    return this.service.fetchTabById(id);
  }
}
