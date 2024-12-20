import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((c) => c.HomeComponent),
  },

  {
    path: 'blog',
    loadComponent: () =>
      import('./components/blog/blog.component').then((c) => c.BlogComponent),
  },

  {
    path: 'test',
    loadComponent: () =>
      import('./components/test/test.component').then((c) => c.TestComponent),
  },

  {
    path: 'contact',
    loadComponent: () =>
      import('./components/contact/contact.component').then((c) => c.ContactComponent),
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then((c) => c.LoginComponent),
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then((c) => c.RegisterComponent),
  },

  {
    path: 'bl-child',
    loadComponent: () =>
      import('./components/bl-child/bl-child.component').then((c) => c.BlChildComponent),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
