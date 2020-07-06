import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Tab} from "../shared/models/Tab";
import {Observable} from "rxjs";
import {TabService} from "./tab.service";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TabsResolverService implements Resolve<Tab[]> {

  constructor(private service: TabService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tab[]> | Promise<Tab[]> | Tab[] {
    return this.service.fetchPopularTabs();
  }


}
