import { DocumentaleCategoriePage } from './../documentale-categorie/documentale-categorie';

import { HttpService } from './../../services/shared/http.service';
import { ContactService } from './../../services/contact/contact.service';
import { Contact } from './../../models/contact/contact.namespace';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ContactDetailsPage } from '../contact-details/contact-details';
import { ErrorService } from '../../services/shared/error.service';
import { Documentale } from '../../models/documentale/documentale.namespace';
import { StoreService } from '../../services/store/store.service';
import { Module } from '../../models/modules/modules.namespace';

@Component({
  selector: 'page-documentale',
  templateUrl: 'documentale.html'
})
export class DocumentalePage implements OnInit{

  tipi : Documentale.Tipi[];
  color : string;
  icon : string;
  
  constructor(public navCtrl: NavController, public http : HttpService, public store : StoreService,
    private err : ErrorService) {
    
  }
  ngOnInit(){
    this.http.getModules().then(
      (modules : Module.ModuleElem[])=>{
        console.log(modules);
        for (let i = 0 ; i < modules.length ; i++){
          if (modules[i].tab_moduli_cod == 7){
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
       let s1 = this.http.getElencoTipoDocumenti(val.token_value).subscribe(
         (val1)=>{
            this.tipi = val1.l_lista_tipo_documenti;
            s1.unsubscribe();
         }
       )
       s.unsubscribe();
     }
   )
   this.store.getUserData();*/
      let s1 = this.http.getElencoTipoDocumenti().then(
        (val1 : Documentale.Tipi[])=>{
          console.log(val1 );
           this.tipi = val1;
        },
        (error)=>{
          console.log(error);
        }
      )

  }

  goToCategorie(val){
    this.navCtrl.push(DocumentaleCategoriePage, {"categoria": val.tab_tipo_documento_cod})
  }

  back(){
    this.navCtrl.pop();
  }

  
}
