import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmPopupComponent } from "./popup/confirm-popup/confirm-popup.component";
import {forwardRef, Inject, Injectable, OnInit} from "@angular/core";
import {AlertPopupComponent} from "./popup/alert-popup/alert-popup.component";

/*
 * @Inject forwardRef()
 * Allows to refer to references which are not yet defined.
 */

export class PopupService implements OnInit {


  constructor(@Inject(forwardRef(() => NgbModal)) private modalService: NgbModal) {}

  ngOnInit(): void {

  }

  showConfirmPopup(message: string) {
    const modalRef = this.modalService.open(ConfirmPopupComponent);
    modalRef.componentInstance.confirmationMessage = message;

    return modalRef.result;
  }

  succesPopup(name: string) {
    this.showPopup(name, 'succes');
  }

  infoPopup(name: string) {
    this.showPopup(name, 'info')
  }

  warningPopup(name: string) {
    this.showPopup(name, 'warning')
  }

  dangerPopup(name: string) {
    this.showPopup(name, 'danger')

  }

  showPopup(name: string, type: string) {
    const modalRef = this.modalService.open(
      AlertPopupComponent,
      {backdropClass: 'modal-backdrop-transparent',
      }
    );
    modalRef.componentInstance.message = name;
    modalRef.componentInstance.type = type;

    setTimeout(
      () => {
        modalRef.close()}, 2000
    );
  }

}
