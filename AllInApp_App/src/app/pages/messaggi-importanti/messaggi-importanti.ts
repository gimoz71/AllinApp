import { HttpService } from './../../services/shared/http.service';
import { StoreService } from './../../services/store/store.service';
import { NavController } from 'ionic-angular';


import { OnInit, Component } from '@angular/core';
import { Messaggi } from '../../models/messaggi/messaggi.namespace';
import { Login } from '../../models/login/login.namespace';




@Component({
  selector: 'messaggi-importanti',
  templateUrl: 'messaggi-importanti.html'
})

export class MessaggiImportantiPage implements OnInit {

  public messFull : Messaggi.MessaggiElem[];

  constructor(public navCtrl: NavController, private store : StoreService, private http : HttpService) {
          
  }

  ngOnInit(){
    /**let s= this.store.userData$.subscribe(
      (val)=>{
        this.http.getMessaggeList(val.token_value,'0','0','I');
        s.unsubscribe();
      }
    )**/
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

}
  