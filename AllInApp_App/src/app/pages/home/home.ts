import { ChatPage } from './../chat/chat';
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


  constructor(public navCtrl: NavController,
    private storage :Storage) {

  }

  public ngOnInit() : void {
    this.header1 = "header1_prova";
    this.header2 = "header2_prova";
    this.header3 = "header3_prova";
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

  public logOut(): void{
    this.storage.clear();
    this.navCtrl.setRoot(LoginPage);
  }
}
