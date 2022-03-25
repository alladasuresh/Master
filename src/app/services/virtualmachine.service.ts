import { Injectable } from '@angular/core';
import { Vminfo } from '../models/virtual-machine';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VirtualmachineService {

  constructor(private firestore: AngularFirestore) { }


  getvms() {
    return this.firestore.collection('vms').snapshotChanges().pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.doc.data() as Vminfo;
          const id = a.payload.doc.id;
          const vmid=a.payload.doc.get("vmid")

          return { id, ...data };
        })
        )
      )   
  }

  createvm(vm: Vminfo){
    return this.firestore.collection('vms').add(vm);
}
}
