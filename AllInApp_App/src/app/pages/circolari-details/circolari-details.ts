import { ComunicazioniDetailsModule } from './../../modules/comunicazioni-details/comunicazioni-details.module';
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
  selector: 'circolari-details',
  templateUrl: 'circolari-details.html',
})
export class CircolariDetailsPage implements OnInit{

  public com : Comunicazione.Comunicazione;

  constructor(public navCtrl: NavController, public navParams: NavParams, private store: StoreService, 
    private http : HttpService, private alertCtrl: AlertController) {
      
  }

  ngOnInit(){
    let c = this.navParams.get('com');
    this.com = new Comunicazione.Comunicazione;
    let s = this.store.userData$.subscribe(
      (val)=>{
        let s1 = this.http.getComunicazione(val.token_value,c.comunicazione_key).subscribe(
          (val1)=>{
            this.com = val1.comunicazione;
            s1.unsubscribe();
          }
        )
        s.unsubscribe();
      }
    )
    this.store.getUserData();
  }

  back(){
    this.navCtrl.pop();
  }

  delete(){
    console.log("ciao");
    let s = this.store.userData$.subscribe(
      (val)=>{
        let s1 = this.http.setDeletedComunicazione(val.token_value, this.com.comunicazione_key).subscribe(
          (val1)=>{
            s1.unsubscribe();
          }
        )
        s.unsubscribe();
      }
    )
    this.store.getUserData();
  }

  read (){
    let s = this.store.userData$.subscribe(
      (val)=>{
        let s2 = this.http.setReadComunicazione(val.token_value, this.com.comunicazione_key).subscribe(
          (val2)=>{
            console.log (val2);
            if (val2.ErrorMessage.msg_code == 0){
                let alert = this.alertCtrl.create({
                  title: 'Lettura confermata',
                  subTitle: '',
                  buttons: ['Ok']
                });
                alert.present();
            }
            s2.unsubscribe();
          }
        );
        s.unsubscribe();
      }
    )
    this.store.getUserData();
  }

}
