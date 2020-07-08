import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/*Component 404*/
import { NotFoundComponent } from './page/not-found/not-found.component';

/*Component home*/
import { HomeComponent } from './page/home/home.component';

/*Component user*/
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HomeCreateComponent } from './components/home-create/home-create.component';
import { HomeListComponent } from './components/home-list/home-list.component';
import { HomeDetailComponent } from './components/home-detail/home-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'home-list', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { animation: 'home' } },
  // { path: 'add-user', component: UserCreateComponent, data: { animation: 'add-user' } },
  // { path: 'use-list', component: UserListComponent, data: { animation: 'use-list' } },
  { path: 'add-home', component: HomeCreateComponent, data: { animation: 'add-home' } },
  { path: 'home-list', component: HomeListComponent, data: { animation: 'home-list' } },
  { path: 'home-detail', component: HomeDetailComponent, data: { animation: 'home-detail' } },
  { path: 'page-not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'page-not-found' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
