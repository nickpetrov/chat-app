import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginData: any;

  constructor(
    private _auth: AuthService,
    private _afs: AngularFirestore,
    private _flashMessagesService: FlashMessagesService,
    private _router: Router
  ) {
    this.loginData = {
      email: '',
      pass: ''
    }
  }

  ngOnInit() {
  }

  private createUser(user: firebase.User) {
    return this._afs.collection('users', ref => ref.where('userid', '==', user.uid))
      .valueChanges()
      .take(1)
      .toPromise()
      .then(res => {
        if (!res.length) {
          this._afs.collection('users').add({ uid: user.uid, email: user.email, displayName: user.displayName });
        }
      });
  }

  public login = (f: NgForm) => this._auth.login()
    .then((user: any) => this.createUser(user.user))
    .then(_ => this._router.navigate(['/chat']))
    .catch(error => this._flashMessagesService.show(error, { cssClass: 'alert-error', timeout: 3000 }));

  public loginInWithEmailAndPassword = () => this._auth.loginInWithEmailAndPassword(this.loginData)
    .then(success => this._router.navigate(['/chat']))
    .catch(error => {
      this._flashMessagesService.show(error, { cssClass: 'alert-error', timeout: 3000 });
      this._auth.createUserWithEmailAndPassword(this.loginData)
        .then((user: firebase.User) => this.createUser(user))
        .then(_ => this._router.navigate(['/chat']))
        .catch(error => {
          this._flashMessagesService.show(error, { cssClass: 'alert-error', timeout: 3000 });
        });
    });

}