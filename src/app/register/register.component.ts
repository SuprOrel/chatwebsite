import { Component, OnInit } from '@angular/core';
import {MessageService} from '../util/messageService';
import $ from 'jquery';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  messageService = MessageService;
  constructor() { }

  ngOnInit(): void {
  }

  register(mail, password, repassword, username) {
    if (username === '' || password === '' || mail === '') {
      alert('Register failed: Must fill fields');
    }
    else if (password !== repassword) {
      alert('Register failed: Password mismatch');
    }
    else {
      MessageService.register(mail, password, username);
      $('#usernameInput').val('');
      $('#passwordInput').val('');
    }
  }
}
