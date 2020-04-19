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

  loginClick(value) {
    MessageService.login(value);
    $('#input').val('');
  }
}
