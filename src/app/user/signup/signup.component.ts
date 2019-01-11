import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName: string;
  public lastName: string;
  public mobile: number;
  public email: string;
  public password: string;
  public apiKey: string;

  constructor(
    private appService: AppService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  public goToLogin() {
    this.router.navigate(['/']);
  }

  public signUpFn() {
    if (!this.firstName) {
      alert('Enter first name')
      // this.toastr.warning('Enter first name')
    } else if (!this.lastName) {
      alert('Enter last name')
      // this.toastr.warning('Enter last name')
    } else if (!this.mobile) {
      alert('Enter mobile number')
      // this.toastr.warning('Enter mobile number')
    } else if (!this.email) {
      alert('Enter email ID')
      // this.toastr.warning('Enter email ID')
    } else if (!this.password) {
      alert('Enter password')
      // this.toastr.warning('Enter password')
    } else if (!this.apiKey) {
      alert('Enter your API key')
      // this.toastr.warning('Enter your API key')
    } else {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobile: this.mobile,
        email: this.email,
        password: this.password,
        apiKey: this.apiKey
      }
      console.log(data);

      this.appService.signUpFn(data).subscribe( apiResponse => {
        if (apiResponse.status === 200) {
          alert('Signup succesful!')
          // this.toastr.success('Signup succesful!')
          setTimeout(() => {
            this.goToLogin();
          },2000)
        } else {
          alert(apiResponse.message);
          // this.toastr.error(apiResponse.message);
        }
      }, err => alert(err));
      // }, err => this.toastr.error(err));
    }
  }

}
