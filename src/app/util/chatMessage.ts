export class ChatMessage {

  public sender: string;
  public date: string;
  public message: string;

  constructor(value: string) {
    this.date = value.substring(0, 8);
    const index = value.indexOf(':', 10);
    this.sender = value.substring(10, index);
    this.message = value.substring(index + 1);
  }
}
