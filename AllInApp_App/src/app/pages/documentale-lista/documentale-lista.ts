import { DocumentaleDetailsPage } from './../documentale-details/documentale-details';
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
  selector: 'documentale-lista',
  templateUrl: 'documentale-lista.html'
})
export class DocumentaleListaPage implements OnInit{

  lista : Documentale.Documento[];
  clonedLista : Documentale.Documento[];
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
    
    let cat : Documentale.Categoria = this.para.get("cat");
    let tipo = this.para.get("tipo");
    if  ( cat != null){
      this.http.getElencoDocumenti( 0,0,cat.tab_tipo_documento_cod,cat.tab_categoria_documento_cod).then(
        (val1 : Documentale.Documento[])=>{
            this.lista = val1;
            this.clonedLista  = Object.assign([], this.lista);

        },
        (error)=>{
          console.log(error);
        }
      )
    }else{
      this.http.getElencoDocumenti( 0,0,tipo,0).then(
        (val1 : Documentale.Documento[])=>{
            this.lista = val1;
            this.clonedLista  = Object.assign([], this.lista);
        },
        (error)=>{
          console.log(error);
        }
      )
    }
    
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.lista = [];
    this.lista  = Object.assign([], this.clonedLista );
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.lista = this.lista.filter((item) => {
        return (item.doc_titolo.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  back(){
    this.navCtrl.pop();
  }

  goToDetails(doc){
    this.navCtrl.push(DocumentaleDetailsPage, {doc : doc});
  }
  
}
