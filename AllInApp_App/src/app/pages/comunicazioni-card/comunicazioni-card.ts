import { ComunicazioniDetailsPage } from './../comunicazioni-details/comunicazioni-details';
import { ComunicazioniPage } from './../comunicazioni/comunicazioni';
import { Comunicazione } from './../../models/comunicazione/comunicazione.namespace';

import { HttpService } from './../../services/shared/http.service';
import { NavController } from 'ionic-angular';
import { OnInit, Component, Input } from '@angular/core';
import { HomeElement } from '../../models/home-element/home-element.namespace';
import { StoreService } from '../../services/store/store.service';
import { News } from '../../models/news/news.namespace';
import { HomeComPage } from './../home-com/home-com';


@Component({
  selector: 'comunicazioni-card',
  templateUrl: 'comunicazioni-card.html'
})

export class ComunicazioniCardPage implements OnInit {

  public comunicazioniFull : Comunicazione.ComunicazioneElencoElem[] = [];
  public comunicazioniMin : Comunicazione.ComunicazioneElencoElem[] = [];

  constructor(private navCtrl : NavController, private http : HttpService, private store : StoreService) {
          
  }

  ngOnInit(){
    let s = this.store.userData$.subscribe(
      (val)=>{
        let s1 = this.http.getComunicazioniElenco(val.token_value,0,0,'X','C').subscribe(
          (val1)=>{
            this.comunicazioniFull = val1.l_lista_comunicazione;
            s1.unsubscribe();
            for (let i = 0; i < 3 ; i++){
              this.comunicazioniMin[i]= new Comunicazione.ComunicazioneElencoElem();
              if (this.comunicazioniFull[i] != null)this.comunicazioniMin[i] = this.comunicazioniFull[i];
            }
          }
        )
        s.unsubscribe();
      }
    )
    this.store.getUserData();
    //questo sarà in una subscribe

  }

  goToComunicazioni(){
    this.navCtrl.push(ComunicazioniPage);
  }

  goToDetails(com){
    this.navCtrl.push(ComunicazioniDetailsPage, {com: com});
  }
  
}
  