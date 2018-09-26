import { HttpService } from './../../services/shared/http.service';
import { ContactService } from './../../services/contact/contact.service';
import { Contact } from './../../models/contact/contact.namespace';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { ContactDetailsPage } from '../contact-details/contact-details';
import { ErrorService } from '../../services/shared/error.service';
import { Documentale } from '../../models/documentale/documentale.namespace';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'documentale-details',
  templateUrl: 'documentale-details.html'
})
export class DocumentaleDetailsPage implements OnInit{

  doc : Documentale.Documento;

  constructor(public navCtrl: NavController, public http : HttpService, public store : StoreService,
    private err : ErrorService, private para : NavParams) {
    
  }

  ngOnInit(){
  this.doc  = this.para.get("doc");
  let s = this.store.userData$.subscribe(
     (val)=>{
       let s1 = this.http.getDocumento(val.token_value, this.doc.documenti_key).subscribe(
         (val1)=>{
            this.doc = val1.documento;
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

  
}
