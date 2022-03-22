import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  AbstractControl,FormControl,FormGroup,ValidationErrors,ReactiveFormsModule ,Validators,
ValidatorFn,FormBuilder} from '@angular/forms';
import { VirtualmachineService } from 'src/app/services/virtualmachine.service';

export interface PeriodicElement {
  id: number;
  name: string;
  isActive: string;
  user: string;
  delete:boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'VM 1', isActive: 'Yes', user: 'User 12', delete:false},
  { id: 2, name: 'VM 2', isActive: 'Yes', user: 'User 31', delete:false},
  { id: 3, name: 'VM 3', isActive: 'Yes', user: 'User 9', delete:false},
  { id: 4, name: 'VM 4', isActive: 'Yes', user: 'User 17', delete:false},
];

@Component({
  selector: 'app-vm-details',
  templateUrl: './vm-details.component.html',
  styleUrls: ['./vm-details.component.scss']
})
export class VmDetailsComponent implements OnInit {
 
  vmForm = new FormGroup({
      
    vmname:new FormControl(''),
    vmid:new FormControl(''),
    vmusername:new FormControl('', ),
    vmpassword: new FormControl(''),
    vmtype: new FormControl('', ),
    
    
  }
    
   );
  checked = true;  
  hide = true;
  
  displayedColumns: string[] = ['id', 'name', 'isActive', 'user', 'delete'];
  dataSource = ELEMENT_DATA;

  onView(): void{
    this._router.navigate(['/user-detail']);    
  }

  constructor(private _router: Router, public vmservice:VirtualmachineService) { }

  ngOnInit(): void {}

  onBack(): void {

    this.vmservice.createvm(this.vmForm.value);
    this._router.navigate(['/flexy/home']);
  }

  onCheck(): void{
    this.checked = !this.checked;
  }

  panelOpenState = false;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
