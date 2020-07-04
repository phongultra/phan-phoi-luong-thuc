import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/*Component 404*/
import { NotFoundComponent } from './page/not-found/not-found.component';

/*Component home*/
import { HomeComponent } from './page/home/home.component';

/*Component user*/
import { UserCreateComponent } from './components/user-create/user-create.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { animation: 'home' } },
  { path: 'add-user', component: UserCreateComponent, data: { animation: 'add-user' } },
  { path: 'page-not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'page-not-found' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
