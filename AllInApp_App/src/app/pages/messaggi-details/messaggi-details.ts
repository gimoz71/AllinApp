import { StoreService } from './../../services/store/store.service';
import { HttpService } from './../../services/shared/http.service';
import { NavController, NavParams } from 'ionic-angular';

import { OnInit, Component } from '@angular/core';
import { News } from '../../models/news/news.namespace';
import { Messaggi } from '../../models/messaggi/messaggi.namespace';
import { Login } from '../../models/login/login.namespace';



@Component({
  selector: 'messaggi-details',
  templateUrl: 'messaggi-details.html'
})

export class MessaggiDetailsPage implements OnInit {

  public mess : Messaggi.MessaggiElem;
  constructor(private navCtrl : NavController, private navParams: NavParams, private http: HttpService, private store:  StoreService) {
          
  }

  ngOnInit(){
    this.mess =this.navParams.get('mess');
    
  }

  public back(){
    this.navCtrl.pop();
  }

SetDeleteMessage(mess : Messaggi.MessaggiElem){
  console.log("ciao");
  let s = this.store.userData$.subscribe((val)=>{
    this.http.setDeleteMessage(val.token_value,mess.messaggi_key).subscribe(
      (r)=>{
        if (r.ErrorMessage.msg_code == 0){
          alert("Cancellazione Messaggio effetuata");
        }else{
          alert("errore cancellazione messaggio");
        }
      }
    );
    s.unsubscribe();
    this.back();
  })
  this.store.getUserData();
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

}
  