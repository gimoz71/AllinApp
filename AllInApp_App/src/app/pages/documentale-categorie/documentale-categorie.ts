import { DocumentaleListaPage } from './../documentale-lista/documentale-lista';

import { HttpService } from './../../services/shared/http.service';
import { ContactService } from './../../services/contact/contact.service';
import { Contact } from './../../models/contact/contact.namespace';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { ContactDetailsPage } from '../contact-details/contact-details';
import { ErrorService } from '../../services/shared/error.service';
import { Documentale } from '../../models/documentale/documentale.namespace';
import { StoreService } from '../../services/store/store.service';
import { Module } from '../../models/modules/modules.namespace';

@Component({
  selector: 'documentale-categorie',
  templateUrl: 'documentale-categorie.html'
})
export class DocumentaleCategoriePage implements OnInit{

  categorie : Documentale.Categoria[];
  categoria : number;
  color : string;
  icon : string;

  constructor(public navCtrl: NavController, public http : HttpService, public store : StoreService,
    private err : ErrorService, private para : NavParams) {
    
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

  this.categoria = this.para.get("categoria");
  this.http.getCategorieDocumenti(this.categoria).then(
    (val1 : Documentale.Categoria[])=>{
      this.categorie = val1;
    },
    (error)=>{
      console.log(error);
    })
  }

  goToLista(cat){
    this.navCtrl.push(DocumentaleListaPage, {cat : cat});
  }

  back(){
    this.navCtrl.pop();
  }

  
}
