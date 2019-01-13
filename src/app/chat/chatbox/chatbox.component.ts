import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('scrollMe', { read: ElementRef })
  public scrollMe: ElementRef;

  public authToken: any;
  public userInfo: any;
  public receiverId: any;
  public receiverName: any;
  public userList: any = [];
  public disconnectedSocket: boolean;

  public scrollToChatTop: boolean = false;
  public previousChatList: any = [];
  public messageText: any;
  public messageList: any = [];
  public pageValue: number = 0;
  public loadingPreviousChat: boolean = false;


  constructor(
    private socketService: SocketService,
    private appService: AppService,
    private cookie: CookieService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.authToken = this.cookie.get('authtoken');
    this.userInfo = this.appService.getUserInfoLocalStorage();
    this.receiverId = this.cookie.get('receiverId');
    this.receiverName = this.cookie.get('receiverName');
    if (this.receiverId != null && this.receiverId != undefined && this.receiverId != '') {
      this.userSelectedToChat(this.receiverId, this.receiverName)
    }
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

  public getPreviousChatWithAUser :any = ()=>{
    let previousData = (this.messageList.length > 0 ? this.messageList.slice() : []);
    this.socketService.getChat(this.userInfo.userId, this.receiverId, this.pageValue * 10)
    .subscribe((apiResponse) => {
      console.log(apiResponse);
      if (apiResponse.status == 200) {
        this.messageList = apiResponse.data.concat(previousData);
      } else {
        this.messageList = previousData;
        alert('No Messages available')
      }
      this.loadingPreviousChat = false;
    }, (err) => {
      alert('some error occured')
    });
  }


  public loadEarlierPageOfChat: any = () => {
    this.loadingPreviousChat = true;
    this.pageValue++;
    this.scrollToChatTop = true;
    this.getPreviousChatWithAUser() 
  }

  public userSelectedToChat: any = (id, name) => {
    this.userList.map((user)=>{
        if(user.userId==id){
          user.chatting=true;
        }
        else{
          user.chatting = false;
        }
    })
    this.cookie.set('receiverId', id);
    this.cookie.set('receiverName', name);
    this.receiverName = name;
    this.receiverId = id;
    this.messageList = [];
    this.pageValue = 0;
    let chatDetails = {
      userId: this.userInfo.userId,
      senderId: id
    }
    this.socketService.markChatAsSeen(chatDetails);
    this.getPreviousChatWithAUser();
  }

  public sendMessageUsingKeypress: any = (event: any) => {
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  }
  public sendMessage: any = () => {
    if(this.messageText){
      let chatMsgObject = {
        senderName: this.userInfo.firstName + " " + this.userInfo.lastName,
        senderId: this.userInfo.userId,
        receiverName: this.cookie.get('receiverName'),
        receiverId: this.cookie.get('receiverId'),
        message: this.messageText,
        createdOn: new Date()
      }
      console.log(chatMsgObject);
      this.socketService.SendChatMessage(chatMsgObject)
      this.pushToChatWindow(chatMsgObject)
    }
    else{
      alert('text message can not be empty')
    }
  }

  public pushToChatWindow : any =(data)=>{
    this.messageText="";
    this.messageList.push(data);
    this.scrollToChatTop = false;
  }

  public getMessageFromAUser :any =()=>{
      this.socketService.chatByUserId(this.userInfo.userId)
      .subscribe((data)=>{
        (this.receiverId==data.senderId)?this.messageList.push(data):'';
        alert(`${data.senderName} says : ${data.message}`)
        this.scrollToChatTop=false;
      });
  }


  public logout: any = () => {
    this.appService.logout()
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          console.log("logout called")
          this.cookie.delete('authtoken');
          this.cookie.delete('receiverId');
          this.cookie.delete('receiverName');
          this.socketService.exitSocket();
          this.router.navigate(['/']);
        } else {
          alert(apiResponse.message)
        }
      }, (err) => {
        alert('some error occured')
      });
  }
}
