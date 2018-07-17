import { ProfiloPage } from './../profilo/profilo';
import { ContactsPage } from './../contacts/contacts';
import { HttpClient } from '@angular/common/http';
import { ChatPage } from './../chat/chat';
import { MyChatPage } from './../mychat/mychat';
import { LoginPage } from '../../pages/login/login';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ComunicazioniPage } from '../comunicazioni/comunicazioni';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  public header1: string;
  public header2: string;
  public header3: string;
  public headerChat : string;

  public content1: string;
  public content2: string;
  public content3: string;
  public contentChat: string;

  public logoImg : string;

  public name : string;
  public message : string;

  constructor(public navCtrl: NavController,
    private storage :Storage, private http : HttpClient) {

  }

  public ngOnInit() : void {
    this.header1 = "header1_prova";
    this.header2 = "Priorità";
    this.header3 = "Comunicazioni";
    this.headerChat = "Chat";
    this.content1 = "content1_prova";
    this.content2 = "content2_prova";
    this.content3 = "content3_prova";
    this.contentChat = "vai alla chat";
  }

  public load() : void {
    this.navCtrl.push(ComunicazioniPage, {val: 'pippo'});
  }

  public goToChat(){
    this.navCtrl.push(ChatPage);
  }

  public goToMyChat(){
    this.navCtrl.push(MyChatPage);
  }

  public goToContact(){
    this.navCtrl.push(ContactsPage);
  }
  public logOut(): void{
    this.storage.clear();
    this.navCtrl.setRoot(LoginPage);
  }

  public GoProfile(){
    this.navCtrl.push(ProfiloPage);
  }

  public send(): void {
    alert(this.message);
    this.http.get("http://testchat.mesys.it/cometchat/api/index.php?action=sendmessage&api-key=16d09e11cf125fa84d7450ed3e114642" + 
      "&senderID=benefind&receiverID=benefind&isGroup=0&message="+this.message+"&visibility=0"
    ).subscribe(
      res => alert("success"+ JSON.stringify(res))
    );
  }

  
}
