import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tab} from "../shared/models/Tab";
import {BASEURL} from "../shared/settings/settings";

@Injectable({
  providedIn: 'root'
})
export class TabService {

  constructor(private http: HttpClient) { }

  fetchTabsByMusicaId(musicaId: number): Observable<Tab[]> {
    return this.http.get<Tab[]>(`${BASEURL}tabs?musicaId=${musicaId}`);
  }

  addTab(tab: Tab) {
    return this.http.post<Tab>(`${BASEURL}tabs`, tab);
  }
}
