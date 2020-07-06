import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchSubj = new BehaviorSubject<string>(null);

  constructor() { }
}
