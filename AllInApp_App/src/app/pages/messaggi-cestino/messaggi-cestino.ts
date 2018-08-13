import { StoreService } from './../../services/store/store.service';
import { HttpService } from './../../services/shared/http.service';
import { NavController, NavParams } from 'ionic-angular';

import { OnInit, Component } from '@angular/core';
import { News } from '../../models/news/news.namespace';
import { Messaggi } from '../../models/messaggi/messaggi.namespace';



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
        this.http.getMessaggeList(val.token_value,'0','0','C');
        s.unsubscribe();
      }
    )
  }

  back(){
    this.navCtrl.pop();
  }

}
  