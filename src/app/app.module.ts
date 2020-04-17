import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoadingComponent } from './loading/loading.component';
import {FormsModule} from '@angular/forms';
import { UserlistComponent } from './chat/userlist/userlist.component';
import { UserComponent } from './chat/user/user.component';

const appRoutes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: '', component: LoadingComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoadingComponent,
    UserlistComponent,
    UserComponent
  ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: true} // <-- debugging purposes only
        ),
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
