import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: any;

  constructor(
    private appService: AppService,
    private router: Router,
    private Cookie: CookieService
  ) { }

  ngOnInit() {
  }

  public goToSignUp() {
    this.router.navigate(['/signup']);
  }

  public loginFn() {
    if (!this.email) {
      alert('Enter email')
    } else if (!this.password) {
      alert('Enter a password')
    } else {
      let data = {
        email: this.email,
        password: this.password
      }

      this.appService.loginFn(data)
        .subscribe(apiResponse => {
          if (apiResponse.status === 200) {
            console.log(apiResponse);
            this.router.navigate(['/chat']);
          } else {
            alert(apiResponse.message);
          }
        },
        err => alert(err));

    }

  }

}
