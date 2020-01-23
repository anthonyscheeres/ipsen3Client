import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserUpdate} from "../services/user-update.service";

@Component({
  selector: 'app-update-users-component',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css']
})

export class UpdateUsersComponent implements OnInit {
  changesAlert: string[];

  constructor(
    private activeModal: NgbActiveModal,
    private updateService: UserUpdate
  ) { }

  saveChanges() {
    this.updateService.saveChanges().then(this.activeModal.close);
  }

  discardChanges() {
    this.updateService.emptyChanges();
    this.activeModal.close()

  }

  ngOnInit() {
    this.changesAlert = this.updateService.changesAlert;
  }

}
