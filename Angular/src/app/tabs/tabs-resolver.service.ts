import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Tab} from "../shared/models/Tab";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TabsResolverService implements Resolve<Tab[]> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tab[]> | Promise<Tab[]> | Tab[] {
    return undefined;
  }


}
