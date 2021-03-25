import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuestService } from './services/auth-guard.service';

const routes: Routes = [

  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { canActivate: [AuthGuestService], path: 'dashboard', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
  { canActivate: [AuthGuestService], path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
