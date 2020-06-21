import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeedComponent } from './feed/feed.component';
import { PostResolverService } from './feed/post-screen/post-resolver.service';
import { PostScreenComponent } from './feed/post-screen/post-screen.component';
import { LoginComponent } from './login/login.component';
import { SearchResolverService } from './search/search-resolver.service';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './shared/auth/auth.guard';
import {LetrasComponent} from './letras/letras.component';
import {AdminGuard} from './shared/auth/admin.guard';
import {AdminComponent} from './admin/admin.component';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import {MusicasManagementComponent} from './admin/musicas-management/musicas-management.component';
import {ArtistasManagementComponent} from './admin/artistas-management/artistas-management.component';
import {AlbunsManagementComponent} from './admin/albuns-management/albuns-management.component';
import {ListaArtistaManagementComponent} from './admin/artistas-management/lista-artista-management/lista-artista-management.component';
import {AddArtistaComponent} from './admin/artistas-management/add-artista/add-artista.component';
import {ListaMusicaManagementComponent} from './admin/musicas-management/lista-musica-management/lista-musica-management.component';
import {AddMusicaComponent} from './admin/musicas-management/add-musica/add-musica.component';
import {ListaAlbumManagementComponent} from './admin/albuns-management/lista-album-management/lista-album-management.component';
import {AddAlbumComponent} from './admin/albuns-management/add-album/add-album.component';
import {RegistroComponent} from "./registro/registro.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'feed', component: FeedComponent, canActivate: [AuthGuard]},
  {path: 'posts', canActivate: [AuthGuard], children: [
    {path: 'tag/:id', component: SearchComponent, resolve: { posts: SearchResolverService }},
    {path: ':id', component: PostScreenComponent, resolve: { post: PostResolverService }},
  ]},
  {path: 'letras', canActivate: [AuthGuard], children: [
    {path: '', component: LetrasComponent}
  ]},
  {path: 'admin', canActivate: [AdminGuard], component: AdminComponent, children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: AdminDashboardComponent},
      {path: 'artistas', children: [
          {path: '', component: ArtistasManagementComponent},
          {path: 'lista', component: ListaArtistaManagementComponent},
          {path: 'add', component: AddArtistaComponent}
        ]},
      {path: 'albuns', children: [
          {path: '', component: AlbunsManagementComponent},
          {path: 'lista', component: ListaAlbumManagementComponent},
          {path: 'add', component: AddAlbumComponent}
        ]},
      {path: 'musicas', children: [
          {path: '', component: MusicasManagementComponent},
          {path: 'lista', component: ListaMusicaManagementComponent},
          {path: 'add', component: AddMusicaComponent}
        ]},
  ]},
  {path: 'registro', component: RegistroComponent},
  {path: '**', redirectTo: 'login'}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
