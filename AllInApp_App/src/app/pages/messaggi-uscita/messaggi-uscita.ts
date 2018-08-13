import { HttpService } from './../../services/shared/http.service';
import { NavController } from 'ionic-angular';


import { OnInit, Component } from '@angular/core';
import { Messaggi } from '../../models/messaggi/messaggi.namespace';
import { StoreService } from '../../services/store/store.service';




@Component({
  selector: 'messaggi-uscita',
  templateUrl: 'messaggi-uscita.html'
})

export class MessaggiUscitaPage implements OnInit {

  public messFull : Messaggi.MessaggiElem[];

  constructor(public navCtrl: NavController, private store : StoreService, private http : HttpService) {
          
  }

  ngOnInit(){
    let s= this.store.userData$.subscribe(
      (val)=>{
        this.http.getMessaggeList(val.token_value,'0','0','O');
        s.unsubscribe();
      }
    )
  }

  back(){
    this.navCtrl.pop();
  }

  

}
  