import {Component, ContentChild, Input, OnInit, ViewChild} from '@angular/core';
import {ChatMessage} from '../../util/chatMessage';
import $ from 'jquery';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  @Input()
  public chatMessage: ChatMessage;

  constructor() { }

  ngOnInit(): void {
  }

}
