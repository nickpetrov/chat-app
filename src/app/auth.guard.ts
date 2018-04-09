import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase/app';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
     public auth: AuthService,
     public router: Router
    ) { }

  private authStateHandler(user: firebase.User) {
    if (!!user) return true;
    this.router.navigate(['/login']);
    return false;
  }

  public canActivate = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean => this.auth.afAuth.authState.map(user => this.authStateHandler(user));
}