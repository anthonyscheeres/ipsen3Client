import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-users-component',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css']
})
export class UpdateUsersComponent implements OnInit {
  @Input() changesAlert: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
