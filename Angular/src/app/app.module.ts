import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { PostScreenComponent } from './feed/post-screen/post-screen.component';
import { PostWriterComponent } from './feed/post-writer/post-writer.component';
import { CommentComponent } from './feed/post/comment/comment.component';
import { PostComponent } from './feed/post/post.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistroComponent } from './registro/registro.component';
import { SearchComponent } from './search/search.component';
import { AuthInterceptorService } from './shared/auth/auth-interceptor.service';
import {CommentFormComponent} from "./feed/post/comment-form/comment-form.component";
import {LetrasComponent} from "./letras/letras.component";
import {MusicCardComponent} from './letras/music-card/music-card.component';
import {AdminComponent} from "./admin/admin.component";
import {MusicasManagementComponent} from './admin/musicas-management/musicas-management.component';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import {ArtistasManagementComponent} from './admin/artistas-management/artistas-management.component';
import {AlbunsManagementComponent} from './admin/albuns-management/albuns-management.component';
import {AddArtistaComponent} from './admin/artistas-management/add-artista/add-artista.component';
import {ListaArtistaManagementComponent} from './admin/artistas-management/lista-artista-management/lista-artista-management.component';
import {ListaAlbumManagementComponent} from './admin/albuns-management/lista-album-management/lista-album-management.component';
import {AddAlbumComponent} from './admin/albuns-management/add-album/add-album.component';
import {ListaMusicaManagementComponent} from './admin/musicas-management/lista-musica-management/lista-musica-management.component';
import {AddMusicaComponent} from './admin/musicas-management/add-musica/add-musica.component';


@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      RegistroComponent,
      LoginComponent,
      FeedComponent,
      NavbarComponent,
      PostComponent,
      PostScreenComponent,
      SearchComponent,
      PostWriterComponent,
      CommentComponent,
      CommentFormComponent,
      LetrasComponent,
      MusicCardComponent,
      AdminComponent,
      AdminDashboardComponent,
      ArtistasManagementComponent,
      AddArtistaComponent,
      ListaArtistaManagementComponent,
      AlbunsManagementComponent,
      AddAlbumComponent,
      ListaAlbumManagementComponent,
      MusicasManagementComponent,
      AddMusicaComponent,
      ListaMusicaManagementComponent,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MaterialModule,
   ],
   providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
