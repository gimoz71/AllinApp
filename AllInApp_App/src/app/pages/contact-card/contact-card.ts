import { ContactsPage } from './../contacts/contacts';
import { NavController } from 'ionic-angular';

import { OnInit, Component, Input } from '@angular/core';
import { Module } from '../../models/modules/modules.namespace';



@Component({
  selector: 'contact-card',
  templateUrl: 'contact-card.html'
})
export class ContactCardPage implements OnInit {

  public color : string;
  public icon : string;
  public colonne : number;
  @Input() modules: Module.ModuleElem[];

  constructor(private navCtrl : NavController) {
          
  }

  ngOnInit(){
    if (this.modules != undefined){
      for (let i = 0 ; i < this.modules.length; i++){
        if (this.modules[i].tab_moduli_cod==6){
          this.color = this.modules[i].tab_moduli_colore;
          this.icon = this.modules[i].tab_moduli_icona;
          this.colonne = this.modules[i].tab_moduli_colonne;
        }
      }
    }
  }

  public goToContact(){
    this.navCtrl.push(ContactsPage);
  }

}
  