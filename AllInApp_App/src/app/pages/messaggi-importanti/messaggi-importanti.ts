import { MessaggiDetailsPage } from './../messaggi-details/messaggi-details';
import { HttpService } from './../../services/shared/http.service';
import { StoreService } from './../../services/store/store.service';
import { NavController, AlertController } from 'ionic-angular';


import { OnInit, Component } from '@angular/core';
import { Messaggi } from '../../models/messaggi/messaggi.namespace';
import { Login } from '../../models/login/login.namespace';
import { Module } from '../../models/modules/modules.namespace';




@Component({
  selector: 'messaggi-importanti',
  templateUrl: 'messaggi-importanti.html'
})

export class MessaggiImportantiPage implements OnInit {

  public messFull : Messaggi.MessaggiElem[];
  color : string;
  icon : string;
  public clonedMess : Messaggi.MessaggiElem[];
  constructor(public navCtrl: NavController, private store : StoreService, private http : HttpService,
    private alertCtrl: AlertController) {
          
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
    /**let s= this.store.userData$.subscribe(
      (val)=>{
        let s1 =this.http.getMessaggeList(val.token_value,'0','0','P').subscribe(
          (val1)=>{
            this.messFull = val1.l_lista_messaggi;
          }
        );
        s.unsubscribe();
      }
    )
    this.store.getUserData();*/
    this.http.getMessaggeList("0","0","P").then(
      (res : Messaggi.MessaggiElem[])=>{
        this.messFull = res;  
        this.clonedMess  = Object.assign([], this.messFull);       
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  back(){
    this.navCtrl.pop();
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.messFull = [];
    this.messFull  = Object.assign([], this.clonedMess );
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.messFull = this.messFull.filter((item) => {
        return (item.cognome_mit.toLowerCase().indexOf(val.toLowerCase()) > -1
                || item.nome_mit.toLowerCase().indexOf(val.toLowerCase()) > -1
                || item.messaggio.toLowerCase().indexOf(val.toLowerCase()) > -1
                || item.soggetto.toLowerCase().indexOf(val.toLowerCase()) > -1
                );
      })
    }
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
  public goToDetails(mess){
    this.navCtrl.push(MessaggiDetailsPage, {mess : mess});
  }

}
  