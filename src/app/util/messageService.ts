import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';
import {ChatMessage} from './chatMessage';


export class MessageService {

  public static messages: ChatMessage[] = [];
  public static usernames: string[] = [];

  private static connectedSource = new Subject();
  public static connected$ = MessageService.connectedSource.asObservable();
  public static connected = false;

  private static loggedInSource = new Subject();
  public static loggedIn$ = MessageService.loggedInSource.asObservable();
  private static loggedOutSource = new Subject();
  public static loggedOut$ = MessageService.loggedOutSource.asObservable();
  public static loggedIn = false;

  private static messageReceivedInSource = new Subject();
  public static messageReceived$ = MessageService.messageReceivedInSource.asObservable();

  public static serverUrl = 'http://localhost:8080/socket';
  public static Username = '';
  public static stompClient;

  static connect() {
    // let socket = new WebSocket(this.serverUrl);
    function messageRecieved(message) {
      const msg = new ChatMessage(message.body);
      console.log(msg.date);
      console.log(msg.sender);
      console.log(msg.message);

      if (msg.sender === 'Server') {
        if (msg.message.startsWith('logged out')){
          const index = MessageService.usernames.indexOf(msg.message.substring(11));
          console.log(index);
          MessageService.usernames.splice(index, 1);
        }
        else if (msg.message.startsWith('logged in')) {
          MessageService.usernames.push(msg.message.substring(10));
        }
      }
      MessageService.messages.push(msg);
      MessageService.messageReceivedInSource.next();
    }
    function replyRecieved(message) {
      if (message.body.startsWith('Login failed')) {
        alert(message.body);
      }
      else if (message.body === 'logged in') {
        MessageService.loggedIn = true;
        MessageService.loggedInSource.next();
      }
      else if (message.body === 'logged out') {
        MessageService.loggedIn = false;
        MessageService.loggedOutSource.next();
      }
      else {
        const usernames = message.body.split(',');
        usernames.pop();
        MessageService.usernames = usernames;
      }
      // for (const username of usernames) {
      //   console.log(username);
      // }
      //   MessageService.stompClient.unsubscribe('/user/queue/reply', loginAttempted);
    }

    const socket = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/user/queue/errors', message => {
        alert('Error ' + message.body);
      });

      this.stompClient.subscribe('/user/queue/reply', replyRecieved );
      this.stompClient.subscribe('/global', messageRecieved);

      this.connectedSource.next();
      this.connected = true;

      this.stompClient.send('/app/userlist' , {}, 'get');
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
  }

  static messageGetDate(message: string) {
    return message.substring(0, 8);
  }
  static messageGetName(message: string) {
    return message.substring(10, message.indexOf(':', 10));
  }
  static messageGetValue(message: string) {
    return message.substring(message.indexOf(':', 10));
  }

  static logout() {
    this.stompClient.send('/app/login' , {}, 'log out ' + this.Username);
  }
  static login(username) {
    this.Username = username;
    this.stompClient.send('/app/login' , {}, username);
  }

}
