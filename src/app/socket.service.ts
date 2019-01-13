import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as io from 'socket.io-client';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private baseUrl = 'https://chatapi.edwisor.com';
  private socket;

  constructor(private http: HttpClient,
    private cookie: CookieService) {
    this.socket = io(this.baseUrl);
  }

  // events to be received
  public verifyUser() {
    return Observable.create(observer => {
      this.socket.on('verifyUser', data => {
        observer.next(data);
      })
    })
  }

  public onlineUserList() {
    return Observable.create(observer => {
      this.socket.on('online-user-list', userList => {
        observer.next(userList);
      })
    })
  }

  public disconnectedSocket() {
    return Observable.create(observer => {
      this.socket.on('disconnect', () => {
        observer.next();
      })
    })
  }

  public setUser = authToken => this.socket.emit('set-user', authToken);

  public markChatAsSeen = (userDetails) => {
    this.socket.emit('mark-chat-as-seen', userDetails);
  }


  public getChat(senderId, receiverId, skip): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/v1/chat/get/for/user?senderId=${senderId}&receiverId=${receiverId}&skip=${skip}&authToken=${this.cookie.get('authtoken')}`).pipe(
      catchError(this.handleError)
    )
  }

  public chatByUserId = (userId) => {
    return Observable.create((observer) => {
      this.socket.on(userId, (data) => {
        observer.next(data);
      });
    });
  }

  public SendChatMessage = (chatMsgObject) => {
    this.socket.emit('chat-msg', chatMsgObject);
  }

  public exitSocket = () => {
    this.socket.disconnect();
  }

  public handleError(error: HttpErrorResponse) {
    return throwError(error || 'Server error');
  }


}
