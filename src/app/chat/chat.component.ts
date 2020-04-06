import { Component, OnInit } from '@angular/core';
import {MessageService} from "../util/messageService";
import $ from 'jquery';
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public messageService = MessageService;
  constructor(){
    MessageService.stompClient.subscribe("/chat", (message) => {
      $(".chat").append("<div class='message'>"+message.body+"</div>");
      console.log(message.body);
    });
  }

  ngOnInit(): void {
  }
}
