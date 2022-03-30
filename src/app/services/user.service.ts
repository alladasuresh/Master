import { Injectable } from '@angular/core';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ProfileUser } from 'src/app/models/user-profile';
import * as auth from 'firebase/auth';
import{AngularFireList,AngularFireDatabase} from '@angular/fire/compat/database'
import {  
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,ReactiveFormsModule ,
  Validators,
  ValidatorFn,
  FormBuilder
} from '@angular/forms';
import * as internal from 'stream';



import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  
  

  constructor(public afs: AngularFirestore,  // Inject Firestore service
  public afAuth: AngularFireAuth, // Inject Firebase auth service
  public router: Router,
  public afd:AngularFireDatabase,public authService:AuthenticationService) {}
  //
  
  user$ = this.afAuth.user;
  


  userList: AngularFireList<any> | undefined;
  public selectedUser : any = "";
  public editSelectedUser : any = "";
  form = new FormGroup({
    id:new FormControl(''),
    photoURL:new FormControl(''),
      email:new FormControl(''),
      
     // lastName:new FormControl(''),
     // email:new FormControl(''),      
      doj:new FormControl(''),
      dob:new FormControl(''),     
     firstName:new FormControl(''),
     uid :new FormControl(''),
     role  :new FormControl(''),
     lastName: new FormControl('')

    });
   
  getAllUsers() {
   return  this.afs.collection('users').snapshotChanges().pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.doc.data() as ProfileUser;
          const id = a.payload.doc.id;
          const email=a.payload.doc.get("email")

          return { id,email, ...data };
        })
        )
      )   
  }

  populateForm(user:any){
    this.form.setValue(user);
  }
  getUsers(){
    this.userList=this.afd.list('users');
    return this.userList.snapshotChanges();
  }

  updateUser(uid:any,value:any){
    //console.log(this.afs.doc('/users'+user.uid).snapshotChanges())
    return this.afs.collection('users').doc(uid).set(value);                
  }

  deleteUser(uid:any){
    return this.afs.collection('users').doc(uid).delete();
  } 
  
  //-- vm related method --
 // ******   Do not remove if condition -- it loops infinite times ********
   updateEditUser(_id: string, _name: string,_namet:string ) {
    let i=1;
    let doc = this.afs.collection('users', ref => ref.where('uid', '==', _id));
    doc.snapshotChanges().subscribe((res: any) => {      
    if (i===1){
      let id = res[0].payload.doc.uid;      
      this.afs.collection('users').doc(id).update({name: _name,namet:_namet});
      i++;
      return;
    }
    });
   }
}
