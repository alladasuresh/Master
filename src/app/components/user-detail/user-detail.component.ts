import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ProfileUser } from 'src/app/models/user-profile';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  checked = true;  
  hide = true;

  constructor(private _router: Router,public userService:UserService) { }

  ngOnInit(): void {}

  onBack(): void {
    this._router.navigate(['/flexy/home']);
  }

  onCheck(): void{
    this.checked = !this.checked;
  }

  onEdit(): void{
    this._router.navigate(['/add-user']);
  }

  updateUser(){
    this.userService.updateUser
  }
}
