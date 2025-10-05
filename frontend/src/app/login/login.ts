import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  email = '';
  password = '';

  onEmailLogin(event: Event) {
    event.preventDefault();
    console.log('Email login (placeholder):', { email: this.email, password: this.password });
  }

  onGoogleLogin() {
    console.log('Google login clicked (placeholder)');
  }
}
