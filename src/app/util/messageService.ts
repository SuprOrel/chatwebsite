import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';


export class MessageService {

  private static connectedSource = new Subject();
  public static connected$ = MessageService.connectedSource.asObservable();
  public static connected = false;

  private static loggedInSource = new Subject();
  public static loggedIn$ = MessageService.loggedInSource.asObservable();
  public static loggedIn = false;


  public static serverUrl = 'http://localhost:8080/socket';
  public static Username = 'Chad';
  public static stompClient;

  static connect() {
    // let socket = new WebSocket(this.serverUrl);
    function loginAttempted(message) {
      if (message.body !== 'Occupied'){
        MessageService.Username = message.body;
        MessageService.stompClient.unsubscribe('/user/queue/reply', loginAttempted);
        MessageService.loggedIn = true;
        MessageService.loggedInSource.next();
      }
      else {
        alert('Occupied');
      }
    }

    const socket = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/user/queue/errors', message => {
        alert('Error ' + message.body);
      });

      this.stompClient.subscribe('/user/queue/reply', loginAttempted );

      this.connectedSource.next();
      this.connected = true;
    }, error => {
      alert('STOMP error ' + error);
    });
  }



  static disconnect() {
    if (MessageService.stompClient != null) {
      MessageService.stompClient.close();
    }
    this.connected = false;
    console.log('Disconnected');
  }

  // static initializeWebSocketConnection(){
  //   const ws = new SockJS(this.serverUrl);
  //   this.stompClient = Stomp.over(ws);
  //   this.stompClient.connect({}, x => {
  //     this.connectedSource.next(),
  //       this.connected = true; });
  // }

  static sendMessage(message){
    this.stompClient.send('/app/message' , {}, this.Username + ':' + message);
    $('#input').val('');
  }

  static login(username) {
    this.stompClient.send('/app/login' , {}, username);
  }

}
