import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
      path: 'home',
      loadComponent: () => import('./components/home/home.component').then((c) => c.HomeComponent)
    },
    {
      path: 'blog',
      loadComponent: () => import('./components/blog/blog.component').then((c) => c.BlogComponent)
    },
    {
      path: 'login',
      loadComponent: () => import('./components/login/login.component').then((c) => c.LoginComponent)
    },
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }