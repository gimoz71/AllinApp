import { NavController, NavParams } from 'ionic-angular';

import { OnInit, Component, Input } from '@angular/core';
import { HomeElement } from '../../models/home-element/home-element.namespace';



@Component({
  selector: 'priorita-card',
  templateUrl: 'priorita-card.html'
})


export class PrioritaCardPage implements OnInit {

  public prioritaFull  : HomeElement.PrioritaElement[] = [];
  public prioritaMin : HomeElement.PrioritaElement[] = [];
  
  constructor(private navCtrl : NavController, private navParams: NavParams) {
          
  }

  ngOnInit(){
    for (let i =0 ; i<10; i++){

      this.prioritaFull[i]= new HomeElement.PrioritaElement();
      this.prioritaFull[i].titolo = "Lettura news";
      this.prioritaFull[i].testo = "Acquisizione nuovo cliente";
    }
    for (let i = 0; i < 4 ; i++){
      this.prioritaMin[i] = this.prioritaFull[i];
      
    }
    console.log(this.prioritaMin);
  }


}
  