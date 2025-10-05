import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../services/auth';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss'],
})
export class Chat {
  private auth = inject(AuthService);
  private router = inject(Router);
  user: User | null = null;

  ngOnInit() {
    this.auth.user$.subscribe((u) => (this.user = u));
  }

  onLogout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
