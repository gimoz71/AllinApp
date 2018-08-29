import { ComunicazioniDetailsPage } from './../comunicazioni-details/comunicazioni-details';
import { HttpService } from './../../services/shared/http.service';
import { StoreService } from './../../services/store/store.service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Comunicazione } from '../../models/comunicazione/comunicazione.namespace';

/**
 * Generated class for the ComunicazioniPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-comunicazioni',
  templateUrl: 'comunicazioni.html',
})
export class ComunicazioniPage implements OnInit{

  public comFull : Comunicazione.ComunicazioneElencoElem[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private store: StoreService, 
    private http : HttpService) {
      
  }

  ngOnInit(){
    let s = this.store.userData$.subscribe(
      (val)=>{
        let s1 = this.http.getComunicazioniElenco(val.token_value,0,0,'X','C').subscribe(
          (val1)=>{
            this.comFull = val1.l_lista_comunicazione;
            s1.unsubscribe();
          }
        )
        s.unsubscribe();
      }
    )
    this.store.getUserData();
  }

  goToDetails(com){
    this.navCtrl.push(ComunicazioniDetailsPage, {com : com})
  }

  back(){
    this.navCtrl.pop();
  }

}
