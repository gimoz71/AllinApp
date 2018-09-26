import { MessaggiDetailsPage } from './../messaggi-details/messaggi-details';
import { StoreService } from './../../services/store/store.service';
import { HttpService } from './../../services/shared/http.service';
import { NavController, NavParams } from 'ionic-angular';

import { OnInit, Component } from '@angular/core';
import { News } from '../../models/news/news.namespace';
import { Messaggi } from '../../models/messaggi/messaggi.namespace';
import { Login } from '../../models/login/login.namespace';



@Component({
  selector: 'messaggi-cestino',
  templateUrl: 'messaggi-cestino.html'
})

export class MessaggiCestinoPage implements OnInit {

  public messFull : Messaggi.MessaggiElem[];

  constructor(public navCtrl: NavController, private store : StoreService, private http : HttpService) {
          
  }

  ngOnInit(){
    let s= this.store.userData$.subscribe(
      (val)=>{
        let s1 = this.http.getMessaggeList(val.token_value,'0','0','D').subscribe(
          (val1)=>{
            this.messFull = val1.l_lista_messaggi;
            s1.unsubscribe();
          }
        );
        s.unsubscribe();
      }
    )
    this.store.getUserData();
  }

  public goToDetails(mess){
    this.navCtrl.push(MessaggiDetailsPage, {mess : mess});
  }

  back(){
    this.navCtrl.pop();
  }
  
  delete(mess){
    let s = this.store.userData$.subscribe(
      (val)=>{
        let busta = new Messaggi.BustaMessaggio();
        busta.messaggio = mess;
        busta.token = val.token_value;
      let s1 = this.http.deleteMessage(busta).subscribe(
        (val1)=>{
          console.log (busta);
          console.log(val1);
          let canc = null;
          if (val.ErrorMessage.msg_code == 0){
            for (let i ; i < this.messFull.length ; i++){
              if (this.messFull[i].messaggi_key == mess.messaggi_key){
                canc = i;
              }
            };
            if (canc != null)this.messFull.slice(canc,1);
            alert ("messaggio eliminato");
          }else{
            alert ("errore cancellazione");
          }
          s1.unsubscribe();
        })
        s.unsubscribe();
      }
    )
    this.store.getUserData();
  }

  ripristina (mess){
    
  }
}
  