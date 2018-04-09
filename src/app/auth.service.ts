import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import 'rxjs/add/operator/first';

interface LocalAuthCreds {
  email: string,
  pass: string
};

@Injectable()
export class AuthService {

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth
  ) { }

  public login = () => this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  public loginInWithEmailAndPassword = ({ email, pass }: LocalAuthCreds) => firebase.auth().signInWithEmailAndPassword(email, pass);
  public createUserWithEmailAndPassword = ({ email, pass }: LocalAuthCreds) => firebase.auth().createUserWithEmailAndPassword(email, pass);
  public logout = () => this.afAuth.auth.signOut();

}