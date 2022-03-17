import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private _router: Router,) { }

  ngOnInit(): void {}

  onBack(): void {
    this._router.navigate(['/flexy/home']);
  }

}
