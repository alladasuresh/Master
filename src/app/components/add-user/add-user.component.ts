import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/compat/storage";
import { AngularFireStorageReference } from '@angular/fire/compat/storage';
import { Observable, Subject } from 'rxjs';
import {AngularFirestore,AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { map, finalize } from "rxjs/operators";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';




import {  
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,ReactiveFormsModule ,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
 
  task:AngularFireUploadTask | undefined
  ref:AngularFireStorageReference | undefined
  
  selectedFile:any= File ;
  fb:any;
  downloadURL:Observable<string> | undefined;
  checked = true;  
  hide = true;


  
 
  
  

  

    signUpForm = new FormGroup({
      
      name:new FormControl('',Validators.required),
      email:new FormControl('', [Validators.email,Validators.required]),
      password: new FormControl('', Validators.required),
      doj:new FormControl('', Validators.required),
      dob:new FormControl(''),
      photoURL: new FormControl(''),
      
     })


    constructor(private _router: Router,private authService: AuthenticationService, 
      public afs: AngularFirestore,
      public afAuth: AngularFireAuth,private storage: AngularFireStorage,
      ) { } 

  ngOnInit(): void {
    
    
  }



  onBack(): void {
    this._router.navigate(['/flexy/home']);
  }

  onCheck(): void{
    this.checked = !this.checked;
  }

  onFileSelected(event:any) {
    
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });

    }

    get name(){
      return this.signUpForm.get('name');
     }
    get email(){
      return this.signUpForm.get('email');
    }
    get password(){
      return this.signUpForm.get('password');
    }

    submit(){                
      //const{email, password}=this.myForm.value;       
      //console.log(password);
      this.authService.signUp(this.signUpForm.value.email, this.signUpForm.value.password,this.signUpForm.value.name,
                              this.signUpForm.value.doj, this.signUpForm.value.dob,this.signUpForm.value.photoURL)                                 
    }


   
}
