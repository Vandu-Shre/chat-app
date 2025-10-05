import { Routes } from '@angular/router';
import { Chat } from './chat/chat';
import { authGuard } from './guards/auth.guard';
import { Login } from './login/login';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'chat', component: Chat, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
