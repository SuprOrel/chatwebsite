import { Component, OnInit } from '@angular/core';
import {MessageService} from '../util/messageService';
import $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messageService = MessageService;
  constructor() { }

  ngOnInit(): void {
  }

  login(username, password) {
    if (username === '' || password === '') {
      alert('Login failed: Must fill fields');
    }
    else {
      MessageService.login(username, password);
      $('#usernameInput').val('');
      $('#passwordInput').val('');
    }
  }
}
