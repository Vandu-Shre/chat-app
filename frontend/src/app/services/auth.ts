import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface User {
  _id: string;
  name: string;
  avatar: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  isAuthenticated$ = this.user$.pipe(map(Boolean));

  constructor(private http: HttpClient) {}

  /** Called ONCE at app startup */
  async init(): Promise<void> {
    await firstValueFrom(
      this.http.get<User>('http://localhost:4000/api/me', { withCredentials: true }).pipe(
        tap((user) => this.userSubject.next(user)),
        catchError(() => {
          this.userSubject.next(null);
          return of(null);
        })
      )
    );
  }

  get user() {
    return this.userSubject.value;
  }

  logout() {
    return this.http.post('http://localhost:4000/auth/logout', {}, { withCredentials: true }).pipe(
      tap(() => this.userSubject.next(null)),
      catchError((err) => {
        console.error('Logout failed:', err);
        return of(null);
      })
    );
  }
}
