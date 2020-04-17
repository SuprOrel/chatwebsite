import { Component, OnInit } from '@angular/core';
import {MessageService} from '../util/messageService';
import $ from 'jquery';
import {AppComponent} from '../app.component';
import {find} from 'rxjs/operators';
import {UserComponent} from './user/user.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public messageService = MessageService;
  // public usernames: string[] = ['oof'];
  // public messages: string[] = ['07:08:50- HAHA:sd'];
  constructor(){
    // const comp = new UserComponent();
    // comp.username = 'oof';
    // this.usernames.push(comp);
    MessageService.stompClient.subscribe('/global', (message) => {
      console.log(message.body);
      // if (message.body.endsWith('disconnected ' + MessageService.Username)) {
      //   // MessageService.disconnect();
      //   this.router.navigate(['/login']);
      // }
      // else {
      //   $('.chat')
      //       .append('<div class=\'message\'>' + message.body + '</div>');
      // }
      $('.chat')
        .append('<div class=\'message\'>' + message.body + '</div>');
    });
  }

  // addMessage(value: string): void {
  //
  //   // const msgcomp = '<app-message [message]="\'' + message + '\'" [username]="\'' + username + '\'"></app-message>';
  //   // console.log(msgcomp);
  //   // document.getElementById('msgdiv').innerHTML = '<app-message></app-message>';
  //   // $('.chat')
  //   //   .append('<div class=\'message\'><app-message></app-message></div>');
  // }

  ngOnInit(): void {
  }
}
