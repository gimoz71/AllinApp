
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

  public comunicazioniFull : HomeElement.ComunicazioniElement[] = [];
  public comunicazioniMin : HomeElement.ComunicazioniElement[] = [];

  constructor(private navCtrl : NavController, private http : HttpService, private store : StoreService) {
          
  }

  ngOnInit(){
    for (let i =0 ; i<10; i++){
      this.comunicazioniFull[i] = new HomeElement.ComunicazioniElement();
      this.comunicazioniFull[i].anno = "2018";
      this.comunicazioniFull[i].mese = "Dicembre";
      this.comunicazioniFull[i].giorno = "21";
      this.comunicazioniFull[i].titolo = "AVVISO SCADENZA";
      this.comunicazioniFull[i].testo = "Amministratote";

    }
    //questo sarà in una subscribe
    for (let i = 0; i < 3 ; i++){
      this.comunicazioniMin[i] = this.comunicazioniFull[i];
    }

  }
}
  