import { HttpClient } from '@angular/common/http';
import { HttpService } from './../../services/shared/http.service';

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Injectable, ChangeDetectorRef } from '@angular/core';
declare var CCCometChat : any;

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  licenseKey: string = "Z8AZN-TX6NP-3KETR-LDF4L-SF1LP"; // Replace the value with your CometChat License Key;
  apiKey: string = "16d09e11cf125fa84d7450ed3e114642"; // Replace the value with your CometChat Api Key;
  UID1: string = "cometchat";
  UID2: string = "SUPERHERO2";

  isLoading: boolean = false;
  disableInitialize: boolean = false;
  disableSuperHero1: boolean = true;
  disableSuperHero2: boolean = true;
  disableLaunch: boolean = true;
  constructor(private ref: ChangeDetectorRef, private http : HttpClient,
    private navCtrl: NavController) {
    
  }

  back(){
    this.navCtrl.pop();
  }
  
  initializeChat() {
    var __this = this;
    this.showLoader();
    this.disableInitialize = true;
    CCCometChat.getInstance(r => alert("ok"), r=> alert("ko"));
    CCCometChat.initializeCometChat("http://testchat.mesys.it/cometchat/", this.licenseKey, this.apiKey, true,  response => {
      alert("Inside Success Callback " + response);
      __this.disableLogins(false);
      __this.showLoader(false);
      __this.ref.detectChanges();
    }, error => {
      alert("Fail Callback " + error);
      this.disableInitialize = false;
      this.showLoader(false);
    });
  }

  login(UID) {
    var __this = this;
    this.showLoader(false);
    this.disableLogins();
  CCCometChat.login("ugo","1234", function success(response) {
      alert("Logged in as : " + UID + " Response : " + response);
      __this.disableLaunch = false;
      __this.showLoader(false);
    }, function failure(error) {
      alert("Login failure Callback " + error);
      __this.disableLogins(false);
      __this.showLoader(false);
    });
   /**CCCometChat.guestLogin(UID, function success(response) {
      alert("Logged in as : " + UID + " Response : " + response);
      __this.disableLaunch = false;
      __this.showLoader(false);
    }, function failure(error) {
      alert("Login failure Callback " + error);
      __this.disableLogins(false);
      __this.showLoader(false);
    });**/
  }

  /**login(UID) {
    var __this = this;
    this.showLoader(false);
    this.disableLogins();
    CCCometChat.loginWithUID(UID, function success(response) {
      alert("Logged in as : " + UID + " Response : " + response);
      __this.disableLaunch = false;
      __this.showLoader(false);
    }, function failure(error) {
      alert("Login failure Callback " + error);
      __this.disableLogins(false);
      __this.showLoader(false);
    });
  }**/

  launchChat() {
    var __this = this;
    var isFullScreen = false;
    this.showLoader(true);
    CCCometChat.launchCometChat(isFullScreen, function success(data) {
      alert(" success " + data);
      __this.showLoader(false);

    }, function error(data) {
      alert(" fail " + data);
      __this.showLoader(false);
    });
  }

  showLoader(show: boolean = true) {
    this.isLoading = show;
    this.ref.detectChanges();
  }

  disableLogins(disable: boolean = true) {
    this.disableSuperHero1 = disable;
    this.disableSuperHero2 = disable;
    this.ref.detectChanges();
}
  createUser(){
    this.http.post("http://testchat.mesys.it/cometchat/api/createuser", {
      "api-key": "16d09e11cf125fa84d7450ed3e114642",
      "username" : "ugo",
      "password" : "1234",
      "displayname" : "ugo"
    }).subscribe(
      res => alert("success" + res)
    );
  }

}
