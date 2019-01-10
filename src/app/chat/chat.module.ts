import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'chat', component: ChatboxComponent }
]

@NgModule({
  declarations: [ChatboxComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ChatModule { }
