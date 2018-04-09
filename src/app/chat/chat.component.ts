import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(
    private _auth: AuthService,
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  public logout = () => this._auth.logout().then(success => this._router.navigate(['/login']))

}
