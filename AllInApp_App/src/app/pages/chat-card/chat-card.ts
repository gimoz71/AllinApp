import { ChatPage } from './../chat/chat';
import { NavController } from 'ionic-angular';

import { OnInit, Component, Input } from '@angular/core';
import { Module } from '../../models/modules/modules.namespace';



@Component({
  selector: 'chat-card',
  templateUrl: 'chat-card.html'
})
export class ChatCardPage implements OnInit {

  public color : string;
  public icon : string;
  public colonne : number;
  @Input() modules: Module.ModuleElem[];

  constructor(private navCtrl : NavController) {
         
  }

  ngOnInit(){
    console.log(this.modules);
    if (this.modules != undefined){
      for (let i = 0 ; i < this.modules.length; i++){
        if (this.modules[i].tab_moduli_cod==4){
          this.color = this.modules[i].tab_moduli_colore;
          console.log("A"+this.color);
          this.icon = this.modules[i].tab_moduli_icona;
          this.colonne = this.modules[i].tab_moduli_colonne;
        }
      }
    } 
  }

  public goToChat(){
    this.navCtrl.push(ChatPage);
  }

}
  