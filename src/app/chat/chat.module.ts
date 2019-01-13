import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { RouterModule, Routes } from '@angular/router';
import { SocketService } from '../socket.service';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  { path: 'chat', component: ChatboxComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
  providers: [SocketService]
})
export class ChatModule { }
