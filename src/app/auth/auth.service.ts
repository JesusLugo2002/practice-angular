import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthRequest, AuthResponse } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly API = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const body: AuthRequest = { username, password };

    return this.http.post<AuthResponse>(`${this.API}/login`, body).pipe(
      tap(res => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  deleteToken(): boolean {
    localStorage.removeItem(this.TOKEN_KEY);
    return true;
  }
}