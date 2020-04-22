import {Component, Input, OnInit} from '@angular/core';
import $ from 'jquery';
import {MessageService} from '../../util/messageService';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input()
  public username: string;
  constructor() { this.username = 'chad'; }

  ngOnInit(): void {
  }

  onClicked(): void {
    $('#input').val('@' + this.username);
  }

  isValidUsername(username: string): boolean {
    return username === 'Server' || MessageService.usernames.indexOf(username) > -1;
  }
}
