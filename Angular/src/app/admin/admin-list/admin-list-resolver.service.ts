import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {AdmListDataModel} from "./adm-list-data.model";
import {Observable} from "rxjs";
import {AdminService} from "../admin.service";
import {Usuario} from "../../shared/models/Usuario";

@Injectable({
  providedIn: 'root'
})
export class AdminListResolverService implements Resolve<Usuario[]>{

  constructor(private admService: AdminService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Usuario[]> | Promise<Usuario[]> | Usuario[] {
    return this.admService.fetchAdms();
  }
}
