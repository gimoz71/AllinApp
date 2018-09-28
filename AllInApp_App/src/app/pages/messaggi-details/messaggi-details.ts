import { MessaggiNuovoPage } from './../messaggi-nuovo/messaggi-nuovo';
import { MessaggiNuovoModule } from './../../modules/messaggi-nuovo/messaggi-nuovo.module';
import { StoreService } from './../../services/store/store.service';
import { HttpService } from './../../services/shared/http.service';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { OnInit, Component } from '@angular/core';
import { News } from '../../models/news/news.namespace';
import { Messaggi } from '../../models/messaggi/messaggi.namespace';
import { Login } from '../../models/login/login.namespace';
import { Module } from '../../models/modules/modules.namespace';



@Component({
  selector: 'messaggi-details',
  templateUrl: 'messaggi-details.html'
})

export class MessaggiDetailsPage implements OnInit {

  public mess : Messaggi.Messaggio;
  color : string;
  icon : string;
Module
  constructor(private navCtrl : NavController, private navParams: NavParams,
     private http: HttpService, private store:  StoreService, private alertCtrl: AlertController,
    ) {
          
  }

  ngOnInit(){
    this.http.getModules().then(
      (modules : Module.ModuleElem[])=>{
        console.log(modules);
        for (let i = 0 ; i < modules.length ; i++){
          if (modules[i].tab_moduli_cod == 7){
            this.color = modules[i].tab_moduli_colore;
            this.icon = modules[i].tab_moduli_icona;
          }
        }
      },
      (error)=>{
        console.log(error);
      }
    )
    this.mess =this.navParams.get('mess');
    /**let s = this.store.userData$.subscribe(
      (val: Login.Token)=>{
        let s1 = this.http.getMessagge(val.token_value, this.mess.messaggi_key).subscribe(
          (val1)=>{
            this.mess = val1.messaggio;
            console.log(this.mess);
            s1.unsubscribe();
          }
        );
        s.unsubscribe();
      }
    );
    this.store.getUserData();*/

    this.http.getMessagge(this.mess.messaggi_key).then ((val1 : Messaggi.BustaMessaggio)=>{
      this.mess = val1.messaggio;
          console.log(this.mess);
    },
      (error)=>{
        console.log(error);
      }
    )
  }

  public back(){
    this.navCtrl.pop();
  }

  setDelete(mess : Messaggi.MessaggiElem){
    /**let s = this.store.userData$.subscribe(
      (val: Login.Token)=>{
        let s1 = this.http.setDeleteMessage(val.token_value, mess.messaggi_key).subscribe(
          (r)=>{
            console.log(r);
            s1.unsubscribe();
          }
        );
        s.unsubscribe();
      }
    );
    this.store.getUserData();*/
    this.http.setDeleteMessage( mess.messaggi_key).then(
      (r)=>{
        console.log(r);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  
    deleteConfirm(mess : Messaggi.MessaggiElem) {
      let alert = this.alertCtrl.create({
        title: 'Conferma',
        message: 'spostare questo messaggio nel cestino?',
        buttons: [
          {
            text: 'indietro',
            role: 'cancel',
            handler: () => {
              
            }
          },
          {
            text: 'ok',
            handler: () => {
              this.setDelete(mess);
            }
          }
        ]
      });
      alert.present();
    }  

setStar (mess : Messaggi.MessaggiElem, stato){
  /**let s = this.store.userData$.subscribe(
    (val: Login.Token)=>{
      let s1 = this.http.setStarMessage(val.token_value,mess.messaggi_key,stato).subscribe(
        (r)=>{
          console.log(r);
          if (r.ErrorMessage.msg_code == 0){
            mess.preferito = stato; 
          }
          s1.unsubscribe();
        }
      );
      s.unsubscribe();
    }
  );
  this.store.getUserData();*/
  this.http.setStarMessage(mess.messaggi_key,stato).then(
    (r)=>{
      mess.preferito = stato; 
    },
    (error)=>{
      console.log(error);
    }
  )
}

reply( mess : Messaggi.MessaggiElem){
  this.navCtrl.push(MessaggiNuovoPage, {reply : mess})
}

inoltro (mess : Messaggi.MessaggiElem){
  this.navCtrl.push(MessaggiNuovoPage, {inoltro : mess})
}

}
  