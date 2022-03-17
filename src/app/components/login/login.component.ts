import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
//import { HotToastService } from '@ngneat/hot-toast';public 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   loginForm=new FormGroup({
    email:new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  })
  constructor(private authService: AuthenticationService,private router: Router,) { }

  ngOnInit(): void {}

  // onBack(): void {
  //   this.router.navigate(['/flexy/home']);
  // }
  
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value.email,this.loginForm.value.password).
      
      then(value => {
        //    window.alert(value);
        //    console.log(value);
        //    window.alert("successfully logedin");
        //    console.log('Nice, it worked!');
        // if(this.loginForm.value.email =='Admin@email.com')
        // {this.router.navigate(['/dashboard']); }
        // else
        // this.router.navigate(['/dashboard']);
        })
      .catch(err => {
         console.log('Something went wrong: ', err.message);
       });
     }
  }
}