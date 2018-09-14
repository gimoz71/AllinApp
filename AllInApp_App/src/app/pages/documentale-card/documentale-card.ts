import { DocumentalePage } from './../documentale/documentale';
import { NavController } from 'ionic-angular';

import { OnInit, Component } from '@angular/core';



@Component({
  selector: 'documentale-card',
  templateUrl: 'documentale-card.html'
})

export class DocumentaleCardPage implements OnInit {

  
  constructor(private navCtrl : NavController) {
          
  }

  ngOnInit(){

  }

  goToDocumentale(){
   this.navCtrl.push(DocumentalePage);
  }

}
  