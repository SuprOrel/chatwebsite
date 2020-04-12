import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from '../util/messageService';
import {Router} from '@angular/router';
import $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public messageService = MessageService;
  constructor(private router: Router) {
    // MessageService.stompClient.subscribe('/login', (message) => {
    //   console.log(message.body);
    //   $('#input').value = message.body;
    //   if (message.body !== 'Occupied'){
    //     this.router.navigate(['/chat']);
    //   }
    // });
    MessageService.loggedIn$.subscribe(x => this.router.navigate(['/chat']));
  }

  ngOnInit(): void {
    // this.messageService.connected$.subscribe(x => {
    //   MessageService.stompClient.subscribe("/login", (message) => {
    //     if (message.body != "retry"){
    //       this.router.navigate(['/chat']);
    //     }
    //     $('#input').val(message.body);
    //   });
    // })
  }

  loginMessage(message): void {

  }

  ngOnDestroy(): void {
  }

}
