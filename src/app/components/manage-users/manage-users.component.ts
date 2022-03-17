import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'firebase/auth';
import { ProfileUser } from 'src/app/models/user-profile';
import firebase from 'firebase/compat';
import { MatTableDataSource } from '@angular/material/table';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';



export interface PeriodicElement {
  id: number;
  name?: string;
  work: string;
  project: string;
  priority: string;
  badge: string;
  doj: string;
}
export interface Element {
  ID: any;
  Title: string;
  Created: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'User 1', work: 'Frontend Devloper', project: 'ATF', priority: 'On Phone', badge: 'badge-info', doj: "someday"},
  { id: 2, name: 'User 2', work: 'Project Manager', project: 'WPF', priority: 'On Leave', badge: 'badge-primary', doj: "someday"},
  { id: 3, name: 'User 3', work: 'Web Designer', project: 'Angular', priority: 'No Update', badge: 'badge-danger',  doj: "someday"},
  { id: 4,  work: 'Backend Devloper', project: 'ATF', priority: 'Available', badge: 'badge-success',  doj: "someday"},
];




@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  employeeList: any;
  hospitalsArray=[];
  displayedColumns: string[] = ['uid', 'assigned', 'name', 'priority', 'doj', 'view'];
  
  
  //dataSource:firebase.firestore.DocumentData[]=[];
    dataSourceone:any;
    //dataSource:MatTableDataSource<Element>;
    customerArray = [];
    
   datasoc:any;
  //dataSource = this.dataSourceone;
  
  constructor(private _router: Router,public firestore:AngularFirestore,private userService:UserService ) { 
  }

  ngOnInit(): void {
    
     this.getAllUser();
  }



  onBack(): void {
    this._router.navigate(['/flexy/home']);
  }

  onView(): void{
    this._router.navigate(['/user-detail']);    
  }
  
  onAddUser(): void{
    this._router.navigate(['/add-user']);    
  }
  
    
  
 
  getAllUser(){


    this.userService.getAllUsers().subscribe(res=>{
      this.dataSourceone=res;
      this.datasoc =new MatTableDataSource(this.dataSourceone);
      console.log(this.datasoc.data)
    }
      )
  }
  
}
