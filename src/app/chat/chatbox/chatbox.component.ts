import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/socket.service';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  public authToken: any;
  public userInfo: any;
  public receiverId: any;
  public receiverName: any;
  public userList: any = [];
  public disconnectedSocket: boolean;

  constructor(
    private socketService: SocketService,
    private appService: AppService,
    private cookie: CookieService,
    private router: Router
  ) {
    this.receiverId = cookie.get('receiverId');
    this.receiverName = cookie.get('receiverName');
   }

  ngOnInit() {
    this.authToken = this.cookie.get('authtoken');
    this.userInfo = this.appService.getUserInfoLocalStorage();
    this.checkStatus();
    this.verifyUserConfirmation();
    this.getOnlineUserList();
  }

  public checkStatus() {
    if (
        this.cookie.get('authtoken') === undefined ||
        this.cookie.get('authtoken') === '' || 
        this.cookie.get('authtoken') === null
        ) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }

  public verifyUserConfirmation() {
    this.socketService.verifyUser().subscribe(
      data => {
        this.disconnectedSocket = false;
        this.socketService.setUser(this.authToken);
        this.getOnlineUserList();
      }
    )
  }

  public getOnlineUserList() {
    this.socketService.onlineUserList().subscribe(
      userList => {
        this.userList = [];
        for (let list in userList) {
          let temp = {
            'userId': list,
            'name': userList[list],
            'unread': 0,
            'chatting': false
          }
          this.userList.push(temp);
        }
      }
    )
  }

}
