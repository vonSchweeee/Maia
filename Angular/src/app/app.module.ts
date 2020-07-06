import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {environment} from '../environments/environment';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import {AdminComponent} from './admin/admin.component';
import {AddAlbumComponent} from './admin/albuns-management/add-album/add-album.component';
import {AlbunsManagementComponent} from './admin/albuns-management/albuns-management.component';
import {
  ListaAlbumManagementComponent,
} from './admin/albuns-management/lista-album-management/lista-album-management.component';
import {AddArtistaComponent} from './admin/artistas-management/add-artista/add-artista.component';
import {ArtistasManagementComponent} from './admin/artistas-management/artistas-management.component';
import {
  ListaArtistaManagementComponent,
} from './admin/artistas-management/lista-artista-management/lista-artista-management.component';
import {AddMusicaComponent} from './admin/musicas-management/add-musica/add-musica.component';
import {
  ListaMusicaManagementComponent,
} from './admin/musicas-management/lista-musica-management/lista-musica-management.component';
import {MusicasManagementComponent} from './admin/musicas-management/musicas-management.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FeedComponent} from './feed/feed.component';
import {PostScreenComponent} from './feed/post-screen/post-screen.component';
import {PostWriterComponent} from './feed/post-writer/post-writer.component';
import {CommentFormComponent} from './feed/post/comment-form/comment-form.component';
import {CommentComponent} from './feed/post/comment/comment.component';
import {PostComponent} from './feed/post/post.component';
import {HomeComponent} from './home/home.component';
import {LetrasComponent} from './letras/letras.component';
import {MusicCardComponent} from './letras/music-card/music-card.component';
import {LoginComponent} from './login/login.component';
import {MaterialModule} from './material.module';
import {NavbarComponent} from './navbar/navbar.component';
import {RegistroComponent} from './registro/registro.component';
import {SearchComponent} from './search/search.component';
import {AuthInterceptorService} from './shared/auth/auth-interceptor.service';
import {NgxMaskModule, IConfig} from 'ngx-mask';
import {DialogPreviewArtistaComponent} from "./admin/artistas-management/add-artista/dialog-preview-artista/dialog-preview-artista.component";
import {DialogPreviewAlbumComponent} from "./admin/albuns-management/add-album/dialog-preview-album/dialog-preview-album.component";
import {MusicaComponent} from './musica/musica.component';
import {LineBreakHtmlPipe} from './shared/pipes/line-break-html.pipe';
import {SeeMorePipe} from "./shared/pipes/see-more.pipe";
import {TimeAgoPipe} from "./shared/pipes/time-ago.pipe";
import {ShortenTimePipe} from "./shared/pipes/shorten-time.pipe";
import {LetraComponent} from "./letras/letra/letra.component";
import {AngularEditorModule} from "@kolkov/angular-editor";
import {AddLetraComponent} from "./letras/add-letra/add-letra.component";
import {ShortenPipe} from "./shared/pipes/shorten.pipe";
import {ArtistasPipe} from "./shared/pipes/artistas.pipe";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {UrlSpotifyPipe} from "./shared/pipes/url-spotify.pipe";
import {TabsComponent} from "./tabs/tabs.component";
import {TabComponent} from "./tabs/tab/tab.component";
import {AddTabComponent} from "./tabs/add-tab/add-tab.component";
import {TabsMusicaComponent} from "./tabs/tabs-musica/tabs-musica.component";
import {TabCardComponent} from "./tabs/tab-card/tab-card.component";
import {SearchMusicaComponent} from "./search-musica/search-musica.component";
import {PartituraComponent} from "./partituras/partitura/partitura.component";
import {PartiturasComponent} from "./partituras/partituras.component";
import {AddPartituraComponent} from "./partituras/add-partitura/add-partitura.component";
import {ResponseInterceptorService} from "./shared/services/response-interceptor.service";
import {DialogDeletePostComponent} from "./feed/post/dialog-delete-post/dialog-delete-post.component";

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
    DialogPreviewArtistaComponent,
    DialogPreviewAlbumComponent,
    MusicaComponent,
    LineBreakHtmlPipe,
    SeeMorePipe,
    TimeAgoPipe,
    ShortenTimePipe,
    LetraComponent,
    AddLetraComponent,
    ShortenPipe,
    ArtistasPipe,
    UrlSpotifyPipe,
    TabsComponent,
    TabComponent,
    AddTabComponent,
    TabsMusicaComponent,
    TabCardComponent,
    SearchMusicaComponent,
    PartituraComponent,
    PartiturasComponent,
    AddPartituraComponent,
    DialogDeletePostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    NgxMaskModule.forRoot(),
    AngularEditorModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptorService,
      multi: true
    }],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
