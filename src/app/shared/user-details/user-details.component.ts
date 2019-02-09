import { Component, OnChanges, Input, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() userFirstName: any;
  @Input() userLastName: string;
  @Input() userStatus: string;
  @Input() messageRead: string

  public firstChar: string;

  constructor() {}

  ngOnInit():void {
    this.firstChar = this.userFirstName[0];
  }

}
