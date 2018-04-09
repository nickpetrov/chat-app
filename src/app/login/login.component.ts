import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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
    private _router: Router,
    private _flashMessagesService: FlashMessagesService
  ) {
    this.loginData = {
      email: '',
      pass: ''
    }
  }

  ngOnInit() {
  }

  public login = (f: NgForm) => this._auth.login()
    .then(success => this._router.navigate(['/chat']))
    .catch(error => this._flashMessagesService.show(error, { cssClass: 'alert-error', timeout: 3000 }));

  public loginInWithEmailAndPassword = () => this._auth.loginInWithEmailAndPassword(this.loginData)
    .then(success => this._router.navigate(['/chat']))
    .catch(error => {
      this._flashMessagesService.show(error, { cssClass: 'alert-error', timeout: 3000 });
      this._auth.createUserWithEmailAndPassword(this.loginData)
        .then(success => this._router.navigate(['/chat']))
        .catch(error => {
          this._flashMessagesService.show(error, { cssClass: 'alert-error', timeout: 3000 });
        });
    });

}