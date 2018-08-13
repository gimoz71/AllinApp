import { NewsPage } from './../news/news';
import { LoginService } from './../../services/login/login.service';
import { StoreService } from './../../services/store/store.service';


import { HomeElement } from './../../models/home-element/home-element.namespace';
import { ProfiloPage } from './../profilo/profilo';
import { ContactsPage } from './../contacts/contacts';
import { HttpClient } from '@angular/common/http';
import { ChatPage } from './../chat/chat';
import { MyChatPage } from './../mychat/mychat';
import { LoginPage } from '../../pages/login/login';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
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
  public contentCom : string;

  public presenze : string[] = [];

  public logoImg : string;

  public name : string;
  public message : string;

  constructor(public navCtrl: NavController,
    private storage :Storage, private http : HttpClient, private alertCtrl: AlertController,
    private store : StoreService, private login : LoginService
  ) {

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
    this.contentCom = '';

    //richiedo quali servizi devono essere visualizzati 
    this.presenze["comunicazioni"]= "true"; 
    this.presenze["chat"]= "true"; 
    this.presenze["priorita"]= "true"; 
    this.presenze["documentale"]= "true";
    this.presenze["contatti"] = "true"; 
    this.presenze["messaggi"] = "true"; 
    //ricevo tutti i dati 
    //le prossime verranno eseguite solo se sono presenti nei dati
  }

  public load() : void {
    this.navCtrl.push(ComunicazioniPage, {val: 'pippo'});
  }

  public goToChat(){
    this.navCtrl.push(ChatPage);
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

  changePassword() {
    const prompt = this.alertCtrl.create({
      title: 'Cambio Password',
      message: "inserisci i dati",
      inputs: [
        {
          name: 'old',
          placeholder: 'password corrente'
        },
        {
          name: 'new',
          placeholder: 'Nuova password'
        },
        {
          name: 'repeat',
          placeholder: 'reinserisci nuova passoword'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: 'Send',
          handler: data => {
            if (this.checkPassword(data.old) == true){
              if (data.new.length > 5){
                if (data.new == data.repeat ){
                  let s = this.store.userData$.subscribe((val)=>{
                    s.unsubscribe();
                    let s1 =this.login.changePassword(val, data.old, data.new , data.repeat).subscribe((r)=>{
                      s1.unsubscribe();
                      if (r.ErrorMessage.msg_code == 0){
                        alert("password cambiata correttamente");
                      }else{
                        alert("errore modifica password");
                      }
                    });
                  })
                  this.store.getUserData();
                }else{
                  alert("le password non corrispondono");
                }
              }else{
                alert("la password deve essere più lunga di 5 caratteri");
              }
            }else{
              alert("password corrente non corretta");
            }
          }
        }
      ],
      enableBackdropDismiss: false
    });
    prompt.present();
  }

  checkPassword(old): boolean{
    return true;
  }
  
}
