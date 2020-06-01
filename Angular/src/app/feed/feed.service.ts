import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { baseUrl } from '../shared/settings/settings';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  postsSubj = new Subject<Post[]>();

  constructor(private http: HttpClient) { }

  fetchPosts() {
    this.http.get<Post[]>(baseUrl + 'post/all').subscribe(posts => {
      this.postsSubj.next(posts);
    }, error => console.log(error));
  }
}
