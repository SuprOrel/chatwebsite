import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from '../../util/messageService';

@Component({
  selector: 'app-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.css']
})
export class ProfileOptionsComponent implements OnInit {

  messageService = MessageService;
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
