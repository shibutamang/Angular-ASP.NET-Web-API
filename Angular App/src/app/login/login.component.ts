import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validationMsg: string;
  btnText= 'Login';

  constructor(private router: Router, private service: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  adminLogin(value: any) {
    this.btnText = 'Logging..';
    if (value.email === '' || value.email === null && value.password === '' || value.password === null) {
      this.validationMsg = '* All the fields are required';
      this.btnText = 'Login';
    } else {
      this.service.login(value.email, value.password).subscribe(
        (data: any) => {
          this.toastr.success('Login success');
          localStorage.setItem('usrToken', data.access_token);
          console.log(localStorage.getItem('usrToken'));
          this.router.navigate(['home']);
          },

          (err: any) => { 
            this.toastr.error('Error!', 'Login failed');
            console.log('error occured!');
            setTimeout(() => {this.btnText = 'Login';}, 1500);
          }
      );
    }
  }
}
