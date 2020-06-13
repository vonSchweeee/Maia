import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { tap } from 'rxjs/operators';

import { baseUrl } from '../shared/settings/settings';
import { Post } from './post.model';
import {Comentario} from './comentario.model';
import {Usuario} from "../shared/models/Usuario";

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  postsSubj = new BehaviorSubject<Post[]>(null);
  commentEditSubj: Subject<any> = new Subject();

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
    return this.http.delete<void>(baseUrl + `posts/id/${postId}`)
      .pipe(tap(() => {
        this.postsSubj.next(this.postsSubj.value.filter(post => post.id !== postId));
      }));
  }

  makeComment(comentario: Comentario, usuario: Usuario) {
    return this.http.post<Comentario>(baseUrl + `comentarios`, comentario)
      .pipe(tap(res => {
        const postsAtualizado = this.postsSubj.value;
        postsAtualizado.map(post => {
          res.usuario = usuario;
          if (post.id === comentario.postId)
            post.comentarios.push(res);
        });
        this.commentEditSubj.next('aa');
        this.postsSubj.next(postsAtualizado);
      }));
  }
}
