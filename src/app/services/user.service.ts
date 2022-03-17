import { Injectable } from '@angular/core';

import { filter, from, map, Observable, of, switchMap } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ProfileUser } from 'src/app/models/user-profile';
import * as auth from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData: any; 
  userlist:any=[]
  constructor(public afs: AngularFirestore, // Inject Firestore service
  public afAuth: AngularFireAuth, // Inject Firebase auth service
  public router: Router,) { 
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });  
  }
   
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


  updateUser(user: ProfileUser){
    
    return this.afs.doc('/users'+user.uid).update(user)
                  
  }

  
}
