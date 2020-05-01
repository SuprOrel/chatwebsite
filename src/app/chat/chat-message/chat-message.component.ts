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

  formatNumber(value: number): string {
    const asstring = value.toString();
    if (asstring.length < 2) { return '0' + asstring; }
    return asstring;
  }
}
