import { Component, OnInit } from '@angular/core';
import {MessageService} from '../util/messageService';
import $ from 'jquery';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messageService = MessageService;
  constructor(public router: Router) { }

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
