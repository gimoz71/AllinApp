import { Module } from './../../models/modules/modules.namespace';
import { DocumentalePage } from './../documentale/documentale';
import { NavController } from 'ionic-angular';

import { OnInit, Component, Input } from '@angular/core';



@Component({
  selector: 'documentale-card',
  templateUrl: 'documentale-card.html'
})

export class DocumentaleCardPage implements OnInit {

  public color : string;
  public icon : string;
  public colonne : number;
  @Input() modules: Module.ModuleElem[];

  constructor(private navCtrl : NavController) {
  }

  ngOnInit(){
    if (this.modules != undefined){
      for (let i = 0 ; i < this.modules.length; i++){
        if (this.modules[i].tab_moduli_cod==7){
          this.color = this.modules[i].tab_moduli_colore;
          this.icon = this.modules[i].tab_moduli_icona;
          this.colonne = this.modules[i].tab_moduli_colonne;
        }
      }
    }
  }

  goToDocumentale(){
   this.navCtrl.push(DocumentalePage);
  }

}
  