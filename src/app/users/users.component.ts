import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { ServerModel } from '../models/ServerModel';
import { Router } from '@angular/router';
import { loadUsers } from '../services/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  dataFromServer: any = loadUsers();
  static currentSelected: Number = null;

  constructor(private _router: Router) { }



  async ngOnInit() {
    await loadUsers().then(r => {
      this.dataFromServer = r
    });



  }


}
