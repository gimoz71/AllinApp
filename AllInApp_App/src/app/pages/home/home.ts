import { Module } from './../../models/modules/modules.namespace';

import { CircolariPage } from './../circolari/circolari';
import { NewsPage } from './../news/news';
import { LoginService } from './../../services/login/login.service';
import { StoreService } from './../../services/store/store.service';


import { HomeElement } from './../../models/home-element/home-element.namespace';
import { ProfiloPage } from './../profilo/profilo';
import { ContactsPage } from './../contacts/contacts';
import { ChatPage } from './../chat/chat';
import { MyChatPage } from './../mychat/mychat';
import { LoginPage } from '../../pages/login/login';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ComunicazioniPage } from '../comunicazioni/comunicazioni';
import { Login } from '../../models/login/login.namespace';
import { HttpService } from '../../services/shared/http.service';

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

  public modules : Module.ModuleElem[];

  constructor(public navCtrl: NavController,
    private storage :Storage, private http : HttpService, private alertCtrl: AlertController,
    private store : StoreService, private login : LoginService
  ) {

  }

  public ngOnInit() : void {
    
     //richiedo quali servizi devono essere visualizzati 
     this.presenze["Comunicazioni"]= "false"; 
     this.presenze["Circolari"] == "false";
     this.presenze["Chat"]= "false"; 
     this.presenze["Priorita"]= "false"; 
     this.presenze["Documentale"]= "false";
     this.presenze["Rubrica"] = "false"; 
     this.presenze["Messaggi"] = "false"; 

    this.http.getModules().then(
      (modules : Module.ModuleElem[])=>{
        console.log(modules);
        this.modules = modules;
        for (let i = 0 ; i < modules.length ; i++){
          if (modules[i].tab_moduli_attivo == "S"){
            this.presenze[modules[i].tab_moduli_desc]= "true";
          }
        }
      },
      (error)=>{
        console.log(error);
      }
    )

   
    //ricevo tutti i dati 
    //le prossime verranno eseguite solo se sono presenti nei dati

    let s1 = this.store.getUserDataPromise().then(
      (val : Login.Token)=>{
        console.log(val);
        if (val.flag_richiesta_lettura == true){
          this.navCtrl.push(CircolariPage);
        }
      }
    )
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

  public goToComunicazioni(){
    this.navCtrl.push(ComunicazioniPage);
  }

  public goToCircolari(){
    this.navCtrl.push(CircolariPage);
  }

  public goToNews(){
    this.navCtrl.push(NewsPage);
  }

  public goToMessaggi(){
    this.navCtrl.push(ComunicazioniPage);
  }

  public goToDocumentale(){
    this.navCtrl.push(ComunicazioniPage);
  }
}
