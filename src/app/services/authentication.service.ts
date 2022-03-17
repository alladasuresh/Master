import { Injectable,NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
//import { Auth,authState} from '@angular/fire/auth'
//import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile,} from '@angular/fire/auth';
import { ProfileUser } from 'src/app/models/user-profile';
import {AngularFirestore,AngularFirestoreDocument,} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {from,Observable, of, switchMap} from 'rxjs'

import { AngularFireDatabase, AngularFireList  } from '@angular/fire/compat/database'
import { getDatabase ,ref,query, orderByChild} from "firebase/database";

//import {FirebaseListObservable} from '@angular/fire/compat/database'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //currentUser$ = authState(this.auth);
  userData: any;
  user: Observable<ProfileUser| undefined |null>;
  name:any;
  doj?:any;
  dob?:any;
  photoURL?:any;
  emailVerified?:any;

  password:any;
  lastName: any;
  displayName: any;
  gender: any;
  hiredate: any;
  role: any;
  phone: any;
  address: any;

  userpostList:AngularFireList<ProfileUser>;
   


  constructor( public afs: AngularFirestore,public afAuth: AngularFireAuth,public router: Router, public ngZone: NgZone,
    public db:AngularFireDatabase) 
    {
      
      
      this.userpostList = db.list('/users');
      


    this.user = this.afAuth.authState.pipe(switchMap(user => {
      
      if(user){
        
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
         // JSON.parse(localStorage.getItem('user'));
          return this.afs.doc<ProfileUser>(`users/${user.uid}`).valueChanges();
      }
      else {
          localStorage.setItem('user',"");
         // JSON.parse(localStorage.getItem('user'));
          return of(null);
      } 
  })) 
   }

  
  
  signUp(email:string,password:string,name:string,doj:string,dob:string,photoURL:string){
    return (this.afAuth.createUserWithEmailAndPassword(email, password))
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.password=password;
        this.name=name;
        this.doj=doj;
        this.dob=dob;
        this.photoURL=photoURL;
       // this.emailVerified=this.emailVerified
        
        this.SendVerificationMail();
         this.SetUserData(result.user);
      // })
      // .catch((error) => {
      //   window.alert(error.message);
      // 
        



    });
  }
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
    }
  SetUserData(user: any) {
    console.log(user)
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(
        `users/${user.uid}`
      );
      console.log(this.emailVerified)
      const userData: ProfileUser = {
        uid: user.uid,
        email: user.email,
        name:this.name,
        doj:this.doj,
        dob:this.dob,
        photoURL:this.photoURL,
        //emailVerified:this.emailVerified
        //password:this.password,
        
        
        

      };
      return userRef.set(userData, {
        merge: true,
      });
    }


    login(email: string, password: string) {
      
     return  this.afAuth.signInWithEmailAndPassword(email, password).then(
       (result)=>{
         console.log(result.user?.emailVerified)
         console.log(email)
         
        if (result.user?.emailVerified !==true) {
          
          if (result.user?.emailVerified === false){
            window.alert(
              'Please validate your email address. Kindly check your inbox.');
          }
          else{
            window.alert("please give valied crediantials")
          }
         
        }
        else{
         
        if(email =='wabocim123@tonaeto.com')
        {this.router.navigate(['/dashboard']); }
        else
        this.router.navigate(['/dashboard']);
        }
     
     
        
      })}
    
    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user')!);
      return user !== null && user.emailVerified !== false ? true : false;
    }

    getAllUser(): AngularFireList<ProfileUser> {
      console.log(this.userpostList)
      return this.userpostList;
    }
    
      
  }