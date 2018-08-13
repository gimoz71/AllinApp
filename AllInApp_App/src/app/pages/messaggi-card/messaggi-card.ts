import { MessaggiDetailsPage } from './../messaggi-details/messaggi-details';

import { MessaggiPage } from './../messaggi/messaggi';
import { NewsDetailsPage } from './../news-details/news-details';
import { NewsPage } from './../news/news';
import { HomeNewsPage } from './../home-news/home-news';
import { HttpService } from './../../services/shared/http.service';
import { NavController } from 'ionic-angular';

import { OnInit, Component, Input } from '@angular/core';
import { HomeElement } from '../../models/home-element/home-element.namespace';
import { StoreService } from '../../services/store/store.service';
import { News } from '../../models/news/news.namespace';
import { Messaggi } from '../../models/messaggi/messaggi.namespace';


@Component({
  selector: 'messaggi-card',
  templateUrl: 'messaggi-card.html'
})

export class MessaggiCardPage implements OnInit {

  public messFull : Messaggi.MessaggiElem[] = [];

  public messMin : Messaggi.MessaggiElem[] = [];
  
  constructor(private navCtrl : NavController, private http : HttpService, private store : StoreService) {
          
  }

  ngOnInit(){
    let s = this.store.userData$.subscribe((val)=>{
        let s1 = this.http.getMessaggeList(val.token_value,"0","0","I").subscribe(
            (res)=>{
              console.log(res);
              if (res.ErrorMessage.msg_code == 0){
                this.messFull = res.l_lista_messaggi;
                for (let i = 0 ; i < 4 ; i++){
                  if (this.messFull[i] != null){
                    this.messMin[i]=  this.messFull[i];
                  }
                }
              }else{
                console.log("errore ricezione News");
              }
              s1.unsubscribe();
            }
          );
          s.unsubscribe();
         }
      );
      this.store.getUserData();
      /**for (let i = 0; i < 10; i++){
        this.messFull[i] = new Messaggi.MessaggiElem();
        this.messFull[i].cognome_des = "Amministratore";
        this.messFull[i].cognome_mit = "Pinoli";
        this.messFull[i].data = "00:00:00:00";
        this.messFull[i].destinatario_key = 1;
        this.messFull[i].messaggio = "ciao come va?";
        this.messFull[i].soggetto = "saluti";
        this.messFull[i].stato_messaggio = "S";
        if (i%2 == 0){
          this.messFull[i].stato_messaggio = "N";
        }
      }
      for (let i = 0 ; i < 4 ; i++){
        this.messMin[i] = this.messFull[i];
      }
      console.log(this.messFull);
      console.log (this.messMin);
      **/
    }

    public goToMessaggi(){
      this.navCtrl.push(MessaggiPage, {messFull : this.messFull});
    }

    public goToDetails(mess){
      this.navCtrl.push(MessaggiDetailsPage,{mess: mess});
    }
}
  