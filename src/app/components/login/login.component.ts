import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import {from,Observable, of, switchMap} from 'rxjs'
import { ProfileUser } from 'src/app/models/user-profile';
//import { HotToastService } from '@ngneat/hot-toast';public
import { UserService } from 'src/app/services/user.service'; 

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
  error="";
  user: Observable<ProfileUser> | undefined;
  constructor(public authService: AuthenticationService,private router: Router,
    public userService:UserService) { }

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
    this.error="";
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value.email,this.loginForm.value.password)
      
    .   then(result => {

      this.userService.getAllUsers().subscribe(res=>{
        // this.dataSourceone=res;
        // this.datasoc =new MatTableDataSource(this.dataSourceone);
        for(var i=0;i<res.length;i++)
        {
          if(result.user?.uid == res[i].uid)
          {
            this.userService.selectedUser = res[i];
            //this.userName = this.selectedUser.displayName;
            break;
          }
        }
      //this.authService.currentUser = result.user;
      // if (result.user?.emailVerified !==true) {
        
      //   if (result.user?.emailVerified === false){
      //     this.error="Please validate your email address. Kindly check your inbox.";
          
      //   }
      //   else{
      //     window.alert("please give valid credentials")
      //   }
      // }
      // else
      // {
        this.router.navigate(['/dashboard']);
        console.log(result.user);
        
      })       
      })  
     .catch(err => {
       this.error="Invalid credentials!";
     
    //  });
       });
     }
}}
