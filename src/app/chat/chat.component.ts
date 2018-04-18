import { Component, AfterViewChecked, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  public userEmail: string;
  public message: string;
  private messagesCollection: AngularFirestoreCollection<any>;
  public messages: Observable<Array<any>>;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private afs: AngularFirestore
  ) {
    this._auth.afAuth.authState
      .take(1)
      .toPromise()
      .then(user => {
        this.userEmail = user.email;
      });

    this.message = '';
    this.messagesCollection = afs.collection<any>('messages', ref => ref.orderBy('timestamp'));
    this.messages = this.messagesCollection.valueChanges()
      .do(_ => {
        setTimeout(_ => {
          this.scrollToBottom();
        }, 0);
      });
  }

  ngOnInit() {
  }

  private scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  public send() {
    if (this.message) {
      this.messagesCollection.add({ email: this.userEmail, message: this.message, timestamp: new Date().getTime() });
    }
    this.message = '';
  }

  public logout = () => this._auth.logout().then(success => this._router.navigate(['/login']))

}
