import { MessaggiDetailsPage } from './../messaggi-details/messaggi-details';
import { HttpService } from './../../services/shared/http.service';
import { StoreService } from './../../services/store/store.service';
import { NavController, AlertController } from 'ionic-angular';


import { OnInit, Component } from '@angular/core';
import { Messaggi } from '../../models/messaggi/messaggi.namespace';
import { Login } from '../../models/login/login.namespace';




@Component({
  selector: 'messaggi-importanti',
  templateUrl: 'messaggi-importanti.html'
})

export class MessaggiImportantiPage implements OnInit {

  public messFull : Messaggi.MessaggiElem[];

  constructor(public navCtrl: NavController, private store : StoreService, private http : HttpService,
    private alertCtrl: AlertController) {
          
  }

  ngOnInit(){
    let s= this.store.userData$.subscribe(
      (val)=>{
        let s1 =this.http.getMessaggeList(val.token_value,'0','0','P').subscribe(
          (val1)=>{
            this.messFull = val1.l_lista_messaggi;
          }
        );
        s.unsubscribe();
      }
    )
    this.store.getUserData();
  }

  back(){
    this.navCtrl.pop();
  }
  setStar (mess : Messaggi.MessaggiElem, stato){
    let s = this.store.userData$.subscribe(
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
    this.store.getUserData();
}

setDelete(mess : Messaggi.MessaggiElem){
  let s = this.store.userData$.subscribe(
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
  this.store.getUserData();
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
  