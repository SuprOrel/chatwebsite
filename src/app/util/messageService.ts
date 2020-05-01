import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';
import {ChatMessage} from './chatMessage';
import {formatDate} from '@angular/common';


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
  public static username = '';
  public static email = '';
  public static premiumDate = new Date();
  public static messageCount = 0;
  public static stompClient;

  static connect() {
    // let socket = new WebSocket(this.serverUrl);
    function messageRecieved(message) {
      const msg = new ChatMessage(message.body);
      console.log(msg.date);
      console.log(msg.sender);
      console.log(msg.message);

      if (msg.sender === 'Server') {
        if (msg.message.startsWith('deleted')){
          const index = MessageService.usernames.indexOf(msg.message.substring(8));
          console.log(index);
          MessageService.usernames.splice(index, 1);
        }
        else if (msg.message.startsWith('registerd')) {
          MessageService.usernames.push(msg.message.substring(10));
        }
        else if (msg.message.startsWith('edited')) {
          const values = msg.message.substring(7);
          const index = values.indexOf(' ');
          const name = values.substring(0, index);
          const newname = values.substring(index + 4);
          console.log(name + ' edited to ' + newname);
          MessageService.usernames.splice(MessageService.usernames.indexOf(name), 1);
          MessageService.usernames.push(newname);
        }
      }
      MessageService.messages.push(msg);
      MessageService.messageReceivedInSource.next();
    }
    function replyRecieved(message) {
      if (message.body.startsWith('Login failed') || message.body.startsWith('Register failed') || message.body.startsWith('Edit failed')) {
        alert(message.body);
      }
      else if (message.body.startsWith('Logged in')) {
        const loginValues = message.body.substring(11).split(',');
        MessageService.username = loginValues[0];
        console.log(loginValues[1]);
        MessageService.messageCount = Number(loginValues[1]);
        MessageService.premiumDate = ChatMessage.formatDate(loginValues[2]);
        MessageService.loggedIn = true;
        MessageService.loggedInSource.next();
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
    this.stompClient.send('/app/message' , {}, this.username + ':' + message);
    this.messageCount++;
  }

  static editUser(password, newpassword, newusername) {
    this.stompClient.send('/app/edit' , {}, this.email + ',' + password + ',' + newpassword + ',' + newusername);
  }
  static loginAsGuest() {
    this.login('Empty', 'abc123');
  }
  static login(mail, password) {
    this.email = mail;
    this.stompClient.send('/app/login' , {}, mail + ',' + password);
  }

  static register(mail, password, username) {
    this.stompClient.send('/app/register', {}, mail + ',' + password + ',' + username);
  }

  static sendCommand(command) {
    this.stompClient.send('/app/command', {}, command);
  }
}
