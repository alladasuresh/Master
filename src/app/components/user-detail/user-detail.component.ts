import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileUser } from 'src/app/models/user-profile';
import {  
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,ReactiveFormsModule ,
  Validators,
  ValidatorFn,
  FormBuilder
} from '@angular/forms';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  checked = true;  
  hide = true;
  selectedUserID = this.userService.editSelectedUser != null ? this.userService.editSelectedUser.uid : 0;
  
  constructor(private _router: Router,public userService:UserService) { }
  formControls=this.userService.form.controls;
  ngOnInit(): void {
    
  }

  onBack(): void {
    this._router.navigate(['/flexy/home']);
  }

  onCheck(): void{
    this.checked = !this.checked;
  }

  onEdit(): void{
    console.log(this.userService.editSelectedUser);
    //this._router.navigate(['/add-user']);
  }

  updateUser(){
    this.userService.updateUser
  }
  
  deleteUser(){
    this.userService.deleteUser(this.selectedUserID);
    this._router.navigate(['/manage-users']);
  }
}
