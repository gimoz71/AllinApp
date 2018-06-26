import { HttpClient } from '@angular/common/http';
import { HttpService } from './../../services/shared/http.service';

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Injectable, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'page-mychat',
  templateUrl: 'mychat.html'
})
export class MyChatPage {

  licenseKey: string = "Z8AZN-TX6NP-3KETR-LDF4L-SF1LP"; // Replace the value with your CometChat License Key;
  apiKey: string = "16d09e11cf125fa84d7450ed3e114642"; // Replace the value with your CometChat Api Key;
  name : string = "ugo";
  password : string = "1234";
  host : string = "http://testchat.mesys.it";
  localhost : string = "http://localhost:8100";

  constructor(private ref: ChangeDetectorRef, private http : HttpClient,
    private navCtrl: NavController) {
    this.login(this.name, this.password);
  }

  back(){
    this.navCtrl.pop();
  }
  
  initializeChat() {
    
  }

  login(name, password) {
    let ind = "http://localhost:8100/cometchat/api/index.php?action=authenticateUser&api-key="+this.apiKey+
              "&username="+name+"&password="+password;
    alert(ind);
    console.log(ind);
    this.http.get(ind).subscribe(
      res => {
        console.log(res);
        alert("success"+ JSON.stringify(res));
      }
    );
    
  };
   
  launchChat() {
   
  }

  

}
