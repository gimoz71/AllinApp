import { MessaggiDetailsPage } from './../messaggi-details/messaggi-details';
import { HttpService } from './../../services/shared/http.service';
import { NavController, AlertController } from 'ionic-angular';


import { OnInit, Component } from '@angular/core';
import { Messaggi } from '../../models/messaggi/messaggi.namespace';
import { StoreService } from '../../services/store/store.service';
import { Login } from '../../models/login/login.namespace';
import { Module } from '../../models/modules/modules.namespace';




@Component({
  selector: 'messaggi-uscita',
  templateUrl: 'messaggi-uscita.html'
})

export class MessaggiUscitaPage implements OnInit {

  public messFull : Messaggi.MessaggiElem[];
  color : string;
  icon : string;
  constructor(public navCtrl: NavController, private store : StoreService, private http : HttpService,
     private alertCtrl: AlertController) {
          
  }

  ngOnInit(){
    this.http.getModules().then(
      (modules : Module.ModuleElem[])=>{
        console.log(modules);
        for (let i = 0 ; i < modules.length ; i++){
          if (modules[i].tab_moduli_cod == 5){
            this.color = modules[i].tab_moduli_colore;
            this.icon = modules[i].tab_moduli_icona;
          }
        }
      },
      (error)=>{
        console.log(error);
      }
    )
    /**let s= this.store.userData$.subscribe(
      (val)=>{
        let s1= this.http.getMessaggeList(val.token_value,'0','0','O').subscribe(
          (val1)=>{
            this.messFull = val1.l_lista_messaggi;
            s1.unsubscribe();
          }
        );
        s.unsubscribe();
      }
    )
    this.store.getUserData();*/
    this.http.getMessaggeList("0","0","O").then(
      (res : Messaggi.MessaggiElem[])=>{
        this.messFull = res;      
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  back(){
    this.navCtrl.pop();
  }

  public goToDetails(mess){
    this.navCtrl.push(MessaggiDetailsPage, {mess : mess});
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

}
  