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
  resetformone= new FormGroup({
    uid:new FormControl(''),  
    id:new FormControl(''),
    firstName:new FormControl(''),
    lastName:new FormControl(''),
    dob:new FormControl(''),
    doj:new FormControl(''),
    email:new FormControl(''),
    photoURL:new FormControl(''),
    role:new FormControl(''),
  });
  checked = true;  
  hide = true;
  selectedUserID = this.userService.editSelectedUser != null ? this.userService.editSelectedUser.uid : 0;
  
  constructor(private _router: Router,public userService:UserService) { }
  //formControls=this.userService.form.controls;
  formControls=this.resetformone.controls;

  ngOnInit(): void {
    this.populateForm(this.userService.editSelectedUser);   
  }
  
  onBack(): void {
    this._router.navigate(['/flexy/home']);
  }

  onCheck(): void{
    this.checked = !this.checked;
  }

  onEdit(): void{
    console.log(this.userService.editSelectedUser.uid);
    //this._router.navigate(['/add-user']);
  }

  updateUser(){
    this.userService.updateUser
  }
  
  deleteUser(){
    this.userService.deleteUser(this.selectedUserID);                   
    this._router.navigate(['/manage-users']);
  }
  updateeditUser(){
    //console.log(this.selectedUserID);
    //console.log(this.resetformone.value.firstName);
    this.userService.updateEditUser(this.selectedUserID,this.resetformone.value.firstName,this.resetformone.value.lastName,
    this.resetformone.value.dob,this.resetformone.value.doj);
  }

  populateForm(user:any){
    this.resetformone.setValue(user);
  }
}
