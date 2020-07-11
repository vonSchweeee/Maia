import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { tap } from 'rxjs/operators';

import { BASEURL } from '../shared/settings/settings';
import { Post } from './post.model';
import {Comentario} from './comentario.model';
import {Usuario} from "../shared/models/Usuario";
import {AuthService} from "../shared/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  postsSubj = new BehaviorSubject<Post[]>(null);
  commentEditSubj: Subject<any> = new Subject();

  constructor(private http: HttpClient, private authService: AuthService) { }

  fetchPosts() {
    return this.http.get<Post[]>(BASEURL + 'posts/all')
      .pipe(tap(posts => {
        this.postsSubj.next(posts);
      }));
  }

  fetchPost(postId: number): Observable<Post> {
    return this.http.get<Post>(BASEURL + `posts/id/${postId}`);
  }

  fetchPostsByTag(tag: string) {
    return this.http.get<Post[]>(BASEURL + `posts/tag/${tag}`);
  }

  makePost(post: Post) {
    return this.http.post<Post>(BASEURL + `posts`, post);
  }

  deletePost(postId: number) {
    return this.http.delete<void>(BASEURL + `posts/id/${postId}`)
      .pipe(tap(() => {
        this.postsSubj.next(this.postsSubj.value.filter(post => post.id !== postId));
      }));
  }

  makeComment(comentario: Comentario, usuario: Usuario, post: Post) {
    return this.http.post<Comentario>(BASEURL + `comentarios`, comentario)
      .pipe(tap(res => {
        res.usuario = usuario;
        post.comentarios.push(res);
        post.quantCmt++;
        this.commentEditSubj.next('aa');
      }));
  }

  desfavoritar(postId: number) {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        postId,
        usuarioId: this.authService.usuarioSubj.value.id
      },
    };

    const posts = this.postsSubj.value;

    posts.forEach((post, index) => {
      if (post.id === postId) {
        posts[index].favoritado = false;
        posts[index].quantFav--;
      }
      return;
    });

    this.postsSubj.next(posts);

    this.http.delete(BASEURL + 'favoritos', options).subscribe();
  }

  favoritar(postId: number) {
    const posts = this.postsSubj.value;

    const body = {
      postId,
      usuarioId: this.authService.usuarioSubj.value.id
    };

    posts.forEach((post, index) => {
      if (post.id === postId) {
        posts[index].favoritado = true;
        posts[index].quantFav++;
      }
      return;
    });

    this.postsSubj.next(posts);

    this.http.post(BASEURL + 'favoritos', body).subscribe();
  }

  editPost(post: Post) {
    return this.http.put<Post>(BASEURL + 'posts', post);
  }

  updateComentario(comentario: Comentario) {
    return this.http.patch(BASEURL + 'comentarios' , comentario);
  }
}
