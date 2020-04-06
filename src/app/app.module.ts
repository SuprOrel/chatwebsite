import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from "@angular/router";
import { ChatComponent } from './chat/chat.component';
import { LoadingComponent } from './loading/loading.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'chat', component: ChatComponent },
  { path: '', component: LoadingComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    LoadingComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
