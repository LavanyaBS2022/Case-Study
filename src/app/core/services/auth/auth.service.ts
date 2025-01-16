import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import firebase from 'firebase/compat/app'; 

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState.pipe(
      tap(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify({
            uid: user.uid,
            email: user.email,
          }));
        }
      })
    );
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return user !== null;
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      if (result.user) {
        localStorage.setItem('user', JSON.stringify({
          uid: result.user.uid,
          email: result.user.email,
        }));
      }
      return result;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }

  
  signup(email: string, password: string): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(() => {});
  }

  forgotPassword(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
  }
}