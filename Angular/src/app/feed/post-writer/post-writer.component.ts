import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../shared/auth/auth.service';
import { FeedService } from '../feed.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-writer',
  templateUrl: './post-writer.component.html',
  styleUrls: ['./post-writer.component.css']
})
export class PostWriterComponent implements OnInit {

  editing = false;
  tags: string[] = [];
  @ViewChild('inputNewPost') inputNewPost: ElementRef<HTMLInputElement>;
  loading = false;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.editing = true;
    } else {
      this.editing = false;
    }
  }

  constructor(private eRef: ElementRef, private authService: AuthService, private feedService: FeedService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    const texto = form.value.texto;
    const titulo = form.value.titulo;
    const usuario = this.authService.usuarioSubj.value;
    if (! this.tags.length || ! this.tags[0])
      this.tags = undefined;
    if (usuario && usuario.id) {
      const post = new Post(titulo, texto, this.tags, usuario.id);
      this.feedService.makePost(post).subscribe(post => {
        this.loading = false;
        const newPosts = this.feedService.postsSubj.value;
        post.usuario = usuario;
        newPosts.unshift(post);
        this.feedService.postsSubj.next(newPosts);
        form.reset();
        this.tags = [];
      },
      erro => {
        this.loading = false;
      });
    }
    else throw new Error('Não há usuário!');
  }

  onAddTag(form: NgForm) {
    let tag: string = form.value.tag;

    if (tag) {
      if (tag.startsWith('#')) {
        if (/^#?[\w\-\s]+$/.test(tag)){
          tag = tag.replace(' ', '_');
        }
      }
      else {
        tag = tag.replace(' ', '_');
      }
      this.tags.push(tag);

      return form.setValue({
        'tag': ''
      });
    }
  }

}
