import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { baseUrl } from '../shared/settings/settings';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  postsSubj = new BehaviorSubject<Post[]>(null);

  constructor(private http: HttpClient) { }

  fetchPosts() {
    return this.http.get<Post[]>(baseUrl + 'posts/all')
      .pipe(tap(posts => {
        this.postsSubj.next(posts);
      }));
  }

  fetchPost(postId: number): Observable<Post> {
    return this.http.get<Post>(baseUrl + `posts/id/${postId}`);
  }

  fetchPostsByTag(tag: string) {
    return this.http.get<Post[]>(baseUrl + `posts/tag/${tag}`);
  }

  makePost(post: Post) {
    return this.http.post<Post>(baseUrl + `posts`, post);
  }

  deletePost(postId: number) {
    console.log(baseUrl + `posts/id/${postId}`);
    return this.http.delete<void>(baseUrl + `posts/id/${postId}`)
      .pipe(tap(() => {
        this.postsSubj.next(this.postsSubj.value.filter(post => post.postId !== postId));
      }));
  }
}
