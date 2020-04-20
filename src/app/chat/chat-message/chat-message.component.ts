import {Component, Input, OnInit} from '@angular/core';
import {ChatMessage} from '../../util/chatMessage';

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
