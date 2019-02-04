import { BachecaDetailsPage } from './../bacheca-details/bacheca-details';

import { HttpService } from './../../services/shared/http.service';
import { BachecaPage } from './../bacheca/bacheca';
import { NavController } from 'ionic-angular';

import { OnInit, Component, Input } from '@angular/core';
import { Module } from '../../models/modules/modules.namespace';
import { Bacheca } from '../../models/bacheca/bacheca.namespace';



@Component({
  selector: 'bacheca-card',
  templateUrl: 'bacheca-card.html'
})
export class BachecaCardPage implements OnInit {

  public color : string;
  public icon : string;
  public colonne : number;
  @Input() modules: Module.ModuleElem[];
  public letta : string;
  public  bachecaFull : Bacheca.BachecaElem[];
  public  bachecaMin : Bacheca.BachecaElem[] = [];

  constructor(private navCtrl : NavController, private http : HttpService) {
          
  }

  ngOnInit(){
    this.letta = "S";
    console.log(this.modules);
    if (this.modules != undefined){
      for (let i = 0 ; i < this.modules.length; i++){
        if (this.modules[i].tab_moduli_cod==2){
          this.color = this.modules[i].tab_moduli_colore;
          this.icon = this.modules[i].tab_moduli_icona;
          this.colonne = this.modules[i].tab_moduli_colonne;
        }
      }
    } 

    this.http.getElencoAnnunci("0","0","X").then(
      (res : Bacheca.BachecaElem[])=>{
        this.bachecaFull = res;
        if (this.colonne == 1){
          for (let i = 0 ; i < 4 ; i++){
            if (this.bachecaFull[i] != null){
              this.bachecaMin[i]=  this.bachecaFull[i];
            }
          }
        }else{
          for (let i = 0 ; i < 3 ; i++){
            if (this.bachecaFull[i] != null){
              this.bachecaMin[i]=  this.bachecaFull[i];
            }
          }
        }
        console.log(this.bachecaMin);
      },
      (error)=>{
        console.log("errore ricezione Annunci");
        console.log(error);
      }
    );
  }

  public goToBacheca(){
    this.navCtrl.push(BachecaPage);
  }

  public goToDetails(bacheca){
    this.navCtrl.push(BachecaDetailsPage, {bacheca : bacheca});
  }

}
  