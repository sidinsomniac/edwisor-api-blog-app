import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';
import { SocketService } from './socket.service';
import { ChatboxComponent } from './chat/chatbox/chatbox.component';
import { SignupComponent } from './user/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatboxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChatModule,
    UserModule,
    AppRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [CookieService, AppService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
