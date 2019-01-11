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
  public message:string;
  public theme:string = 'alert-danger';

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
      this.message = 'Enter your email ID!';
    } else if (!this.password) {
      this.message = 'Enter a password!';
    } else {
      let data = {
        email: this.email,
        password: this.password
      }

      this.appService.loginFn(data)
        .subscribe(apiResponse => {
          if (apiResponse.status === 200) {

            this.Cookie.set('authtoken',apiResponse.data.authToken)
            this.Cookie.set('receiverId',apiResponse.data.userDetails.userId)
            this.Cookie.set('receiverName',apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);

            this.appService.setUserInfoLocalStrorage(apiResponse.data.userDetails);

            this.message = 'Success! You will be logged in shortly.';
            this.theme = 'alert-success';

            setTimeout(() => {
              this.router.navigate(['/chat']);
            }, 1500)
          }
        },
        err => {
          this.message = err.error.message;
        });

    }

  }

}
