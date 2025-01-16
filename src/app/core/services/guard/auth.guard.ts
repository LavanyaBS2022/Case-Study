import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return user.getIdToken().then(() => {
            localStorage.setItem('user', JSON.stringify({
              uid: user.uid,
              email: user.email
            }));
            return true;
          }).catch(() => {
            localStorage.removeItem('user');
            return false;
          });
        }
        localStorage.removeItem('user');
        return Promise.resolve(false);
      }),
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/forbidden'], {
            queryParams: { returnUrl: state.url }
          });
        }
      })
    );
  }
}