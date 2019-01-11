import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName: string;
  public lastName: string;
  public mobileNumber: number;
  public email: string;
  public password: string;
  public apiKey: string;
  public message: string;
  public theme:string = 'alert-danger';

  constructor(
    private appService: AppService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public goToLogin() {
    this.router.navigate(['/']);
  }

  public signUpFn() {
    if (!this.firstName) {
      this.message = 'Enter your first name';
    } else if (!this.lastName) {
      this.message = 'Enter your last name';
    } else if (!this.mobileNumber) {
      this.message = 'Enter your mobile number';
    } else if (!this.email) {
      this.message = 'Enter your email ID';
    } else if (!this.password) {
      this.message = 'Enter a password';
    } else if (!this.apiKey) {
      this.message = 'Enter your API key';
    } else {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobileNumber: this.mobileNumber,
        email: this.email,
        password: this.password,
        apiKey: this.apiKey
      }

      this.appService.signUpFn(data).subscribe( apiResponse => {
        if (apiResponse.status === 200) {
          this.message = 'Signup is successful! You will be redirected shortly';
          this.theme = 'alert-success';
          setTimeout(() => {
            this.goToLogin();
          },2000)
        }
      }, err => {
        this.message = err.error.message;
      });
    }
  }

}
