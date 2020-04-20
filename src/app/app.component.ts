import {Component, OnInit} from '@angular/core';
import {MessageService} from './util/messageService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public title = 'ChatExample';

  constructor(private router: Router){
  }

  ngOnInit() {
    MessageService.connected$.subscribe(x => this.router.navigate(['/login']));
    MessageService.loggedIn$.subscribe(x => this.router.navigate(['/chat']));
    MessageService.loggedOut$.subscribe(x => this.router.navigate(['/login']));
    MessageService.connect();
  }
}
