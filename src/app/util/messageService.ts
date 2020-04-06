import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';


export class MessageService {
  // Observable string sources
  private static connectedSource = new Subject();

  // Observable string streams
  public static connected$ = MessageService.connectedSource.asObservable();

  // Service message commands


  public static serverUrl = 'http://localhost:8080/socket';
  public static Username = "Chad";
  public static stompClient;
  public static connected = false;

  static initializeWebSocketConnection(){
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, x => {
      this.connectedSource.next(),
        this.connected = true});
  }

  static sendMessage(message){
    this.stompClient.send("/app/send/message" , {}, this.Username + ':' + message);
    $('#input').val('');
  }

  static login(username) {
    this.Username = username;
    this.stompClient.send("/app/send/login" , {}, username);
  }
}
