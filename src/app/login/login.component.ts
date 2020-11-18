// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { Login } from '../login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
 
})
export class LoginComponent  {
  password: boolean = false;
  loginForm: FormGroup;
  model: any = {};
  errorMessage: string;
  loginService:LoginService;
  snackBar :MatSnackBar;
  constructor(
    private router: Router,     
    private fb: FormBuilder,
    //public snackBar: MatSnackBar,
 ) { }
  
 
  ngOnInit() {
    this.loginForm = this.fb.group({
      UserName: [null, [Validators.required]],
      Password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
    });

    sessionStorage.removeItem('UserName');
    sessionStorage.clear();
  }

  togglePassword() {
    this.password = !this.password;
  }

  login() {
    this.loginService.Login(this.model).subscribe(
      data => {
        if (data.Status == "Success") {
          this.router.navigate(['/Dashboard']);
          let snackBarRef = this.snackBar.open('loggedin Successfully!',
      'Got it!', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
        }
        else {
          this.errorMessage = data.Message;
        }
      },
      error => {
        this.errorMessage = error.message;
      });
  };
}     


