import {Component, Input, OnInit} from '@angular/core';
import {UserComponent} from '../user/user.component';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  @Input()
  public usernames: string[];
  constructor() {  }

  ngOnInit(): void {
  }

}
