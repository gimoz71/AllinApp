import { CircolariDetailsPage } from './../circolari-details/circolari-details';
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
  selector: 'page-circolari',
  templateUrl: 'circolari.html',
})
export class CircolariPage implements OnInit{

  public comFull : Comunicazione.ComunicazioneElencoElem[];
  public groupedCom = [] ;
  public clonedCom = [];
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
    /**let s = this.store.userData$.subscribe(
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
    this.store.getUserData();*/
    let s1 = this.http.getComunicazioniElenco(0,0,'X','R').then(
      (val1 : Comunicazione.ComunicazioneElencoElem[] )=>{
        this.comFull = val1;
        this.clonedCom  = Object.assign([], this.comFull);
        this.groupCom(this.comFull);
        console.log(this.groupedCom);
        },
        (error)=>{
          console.log(error);
        }
      )
    
  }

  goToDetails(com){
    this.navCtrl.push(CircolariDetailsPage, {com : com})
  }

  groupCom(com : Comunicazione.ComunicazioneElencoElem[]){
    let sortedCom = com.sort((n1,n2) =>{
      if (new Date (n1.cm_data).getTime > new Date (n2.cm_data).getTime) return 1;
      if (new Date (n1.cm_data).getTime < new Date (n2.cm_data).getTime) return -1;
      return 0;
    });
    let currentLetter = "00";
    let currentCom = [];

    sortedCom.forEach((val, index) => {
        let value = val.cm_data;
        let temp =value.charAt(5) + value.charAt(6);
        if(temp  != currentLetter){

            currentLetter = value.charAt(5) + value.charAt(6);

            let newGroup = {
                letter: currentLetter,
                mese: this.getMese(currentLetter),
                anno: value.charAt(0) + value.charAt(1) +value.charAt(2) + value.charAt(3),
                com: []
            };

            currentCom = newGroup.com;
            this.groupedCom.push(newGroup);

        }
        currentCom.push(val);
    });
  };

  getMese (date){
    let mese;
    if (date != null) mese = date;
    if (mese == "01") mese = "Gennaio";
    else if (mese == "02") mese = "Febbraio";
    else if (mese == "03") mese = "Marzo";
    else if (mese == "04") mese = "Aprile";
    else if (mese == "05") mese = "Maggio";
    else if (mese == "06") mese = "Giugno";
    else if (mese == "07") mese = "Luglio";
    else if (mese == "08") mese = "Agosto";
    else if (mese == "09") mese = "Settembre";
    else if (mese == "10") mese = "Ottobre";
    else if (mese == "11") mese = "Novembre";
    else if (mese == "12") mese = "Diciembre";
    return mese;   
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.comFull = [];
    this.comFull  = Object.assign([], this.clonedCom );
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.comFull = this.comFull.filter((item) => {
        return (item.cm_titolo.toLowerCase().indexOf(val.toLowerCase()) > -1
                || item.cm_data.toLowerCase().indexOf(val.toLowerCase()) > -1
                );
      })
    }
    this.groupedCom = [];
    this.groupCom(this.comFull);
  }

  back(){
    /**let s = this.store.userData$.subscribe(
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
    this.store.getUserData();*/

  this.http.getComunicazioniElenco(0,0,'X','R').then(
        (val1 : Comunicazione.ComunicazioneElencoElem[])=>{
          this.comFull = val1;
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
        },
        (error)=>{
          console.log(error);
        }
      );
        
  }
}
