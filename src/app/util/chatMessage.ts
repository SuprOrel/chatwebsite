import {DatePipe} from '@angular/common';

export class ChatMessage {

  public sender: string;
  public date: Date;
  public message: string;

  constructor(value: string) {
    this.date = ChatMessage.formatDate(value.substring(0, 14));
    const index = value.indexOf(':', 16);
    this.sender = value.substring(16, index);
    this.message = value.substring(index + 1);
  }

  public static formatDate(value): Date {
    const parts = value.split(':');
    return new Date(Number(parts[0]) + 2000, Number(parts[1]), Number(parts[2]), Number(parts[3]), Number(parts[4]), 0, 0);
  }
}
