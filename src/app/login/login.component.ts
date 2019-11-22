import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  loginUser(event){
    const target = event.target

  const username = target.querySelector('#username').value
  const password = target.querySelector('#password').value

      var xhr = new XMLHttpRequest();
      var host = "localhost"
      var port = "8080"
  var url = "http://" + host + ":" + port +"/user/login";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {

  var data = JSON.stringify({
  "username" : username,
  "password" : password,
  "id" : null,
  "permission" : null,
  "email" : null
  });
  xhr.send(data);


  response = xhr.responseText
  console.log(response)
    if (!response.equals("fail")){
      token = response
      console.log(token)
        //verander van pagina
    }

    }
  }
}
