import { CircolariDetailsPage } from './../circolari-details/circolari-details';
import { HttpService } from './../../services/shared/http.service';
import { StoreService } from './../../services/store/store.service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Comunicazione } from '../../models/comunicazione/comunicazione.namespace';

/**
 * Generated class for the ComunicazioniPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-circolari',
  templateUrl: 'circolari.html',
})
export class CircolariPage implements OnInit{

  public comFull : Comunicazione.ComunicazioneElencoElem[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private store: StoreService, 
    private http : HttpService, private alertCtrl: AlertController) {
      
  }

  ngOnInit(){
    let s = this.store.userData$.subscribe(
      (val)=>{
        let s1 = this.http.getComunicazioniElenco(val.token_value,0,0,'X','R').subscribe(
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
    this.navCtrl.push(CircolariDetailsPage, {com : com})
  }

  back(){
    let s = this.store.userData$.subscribe(
      (val)=>{
        let s1 = this.http.getComunicazioniElenco(val.token_value,0,0,'X','R').subscribe(
          (val1)=>{
            this.comFull = val1.l_lista_comunicazione;
            let lette = true;
            for (let i = 1 ; i < this.comFull.length ; i++){
              if (this.comFull[i].dc_letta == "N") lette = false;
            }
            if (lette == true )this.navCtrl.pop();
            else{
              let alert = this.alertCtrl.create({
                title: 'Aspetta!!',
                subTitle: 'prima leggi tutte le circolari',
                buttons: ['Ok']
              });
              alert.present();
            }
            s1.unsubscribe();
          }
        )
        s.unsubscribe();
      }
    )
    this.store.getUserData();
  }

}
