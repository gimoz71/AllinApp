import { ContactsPage } from './../contacts/contacts';
import { NavController } from 'ionic-angular';

import { OnInit, Component } from '@angular/core';



@Component({
  selector: 'contact-card',
  templateUrl: 'contact-card.html'
})
export class ContactCardPage implements OnInit {

  
  constructor(private navCtrl : NavController) {
          
  }

  ngOnInit(){

  }

  public goToContact(){
    this.navCtrl.push(ContactsPage);
  }

}
  