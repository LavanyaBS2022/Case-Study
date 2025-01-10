import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS = [
    { email: 'admin@dental.com', password: 'admin123' }
  ];

  login(credentials: { email: string; password: string }): Observable<any> {
    const user = this.USERS.find(u => 
      u.email === credentials.email && 
      u.password === credentials.password
    );

    if (user) {
      const userData = {
        email: user.email,
        token: 'mock-jwt-token'
      };
      localStorage.setItem('user', JSON.stringify(userData));
      return of(userData).pipe(delay(800));
    }
    return throwError(() => new Error('Invalid credentials'));
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
  
}