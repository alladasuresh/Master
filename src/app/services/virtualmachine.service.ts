import { Injectable } from '@angular/core';
import { Vminfo } from '../models/virtual-machine';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class VirtualmachineService {

  constructor(private firestore: AngularFirestore) { }


  getvms() {
    return this.firestore.collection('vms').snapshotChanges();
  }

  createvm(vm: Vminfo){
    return this.firestore.collection('vms').add(vm);
}
}
