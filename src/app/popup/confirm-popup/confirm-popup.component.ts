import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css']
})

export class ConfirmPopupComponent {
  @Input() confirmationMessage;

  constructor(public modal: NgbActiveModal) {}

}
