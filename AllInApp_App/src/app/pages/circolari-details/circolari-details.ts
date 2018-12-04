import { ComunicazioniDetailsModule } from './../../modules/comunicazioni-details/comunicazioni-details.module';
import { HttpService } from './../../services/shared/http.service';
import { StoreService } from './../../services/store/store.service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Comunicazione } from '../../models/comunicazione/comunicazione.namespace';
import { Module } from '../../models/modules/modules.namespace';

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
  color : string;
  icon : string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private store: StoreService, 
    private http : HttpService, private alertCtrl: AlertController) {
      
  }

  ngOnInit(){
    this.http.getModules().then(
      (modules : Module.ModuleElem[])=>{
        console.log(modules);
        for (let i = 0 ; i < modules.length ; i++){
          if (modules[i].tab_moduli_cod == 3){
            this.color = modules[i].tab_moduli_colore;
            this.icon = modules[i].tab_moduli_icona;
          }
        }
      },
      (error)=>{
        console.log(error);
      }
    )
    let c = this.navParams.get('com');
    this.com = new Comunicazione.Comunicazione;
    /**let s = this.store.userData$.subscribe(
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
    this.store.getUserData();*/
      this.http.getComunicazione(c.comunicazione_key).then(
          (val1 : Comunicazione.Comunicazione)=>{
            this.com = val1;
          },
          (error)=>{
            console.log(error);
          }
        )
  }

  back(){
    this.navCtrl.pop();
  }

  delete(){
    console.log("ciao");
    /**let s = this.store.userData$.subscribe(
      (val)=>{
        let s1 = this.http.setDeletedComunicazione(val.token_value, this.com.comunicazione_key).subscribe(
          (val1)=>{
            s1.unsubscribe();
          }
        )
        s.unsubscribe();
      }
    )
    this.store.getUserData();*/

    this.http.setDeletedComunicazione( this.com.comunicazione_key).then(
      (val1)=>{
        console.log(val1);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  read (){
    /**let s = this.store.userData$.subscribe(
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
    this.store.getUserData();*/

    let s = this.store.userData$.subscribe(
      (val)=>{
        let s2 = this.http.setReadComunicazione(this.com.comunicazione_key).then(
          (val2 : Comunicazione.Result)=>{
            console.log (val2);
            if (val2.ErrorMessage.msg_code == 0){
                let alert = this.alertCtrl.create({
                  title: 'Lettura confermata',
                  subTitle: '',
                  buttons: ['Ok']
                });
                alert.present();
            }
          })
        },
        (error)=>{
          console.log(error);
        })
  }

}
