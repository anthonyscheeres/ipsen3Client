import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  registerUser(event){
    event.preventDefault()
    const target = event.target

const username= target.querySelector('#username').value
const password = target.querySelector('#password').value
const email = target.querySelector('#email').value

      var xhr = new XMLHttpRequest();
      var host = "localhost"
      var port = "8080"
var url = "http://" + host + ":" + port +"/user/register";
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = function () {

  var data = JSON.stringify({
  "username" : username,
  "password" : password,
  "id" : null,
  "permission" : null,
  "email" : email
});
  xhr.send(data);


response = xhr.responseText
console.log(response)
    if (!response.equals("fail")){
      //verander van pagina

    }
    }

}
}
