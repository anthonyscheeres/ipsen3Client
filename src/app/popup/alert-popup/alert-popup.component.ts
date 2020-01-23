import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-succes-popup',
  templateUrl: './alert-popup.component.html',
  styleUrls: ['./alert-popup.component.css']
})
export class AlertPopupComponent  {
  message: string;
  type: string;

  // ngOnInit(): void {
  //   setTimeout(() => this.staticAlertClosed = true, 1000);
  //
  //   this._success.subscribe(
  //     (message) => this.successMessage = message
  //   );
  //   this._success.pipe(
  //     debounceTime(1000)
  //   ).subscribe(() => this.successMessage = null);
  // }
  //
  //
  // get success(): Subject<string> {
  //   return this._success;
  // }
}
