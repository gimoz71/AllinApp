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
    let s = this.store.userData$.subscribe(
      (val)=>{
        /**this.http.getElencoDocumenti(val.token_value, 0,0,cat.tab_tipo_documento_cod,cat.tab_categoria_documento_cod).subscribe(
          (val1)=>{
            if (val1.ErrorMessage.msg_code == 0){
              this.lista = val1.l_lista_documenti;
            }else{
              alert("errore ricezione lista");
            }
              
          }
        )**/
        let s1 = this.http.getElencoDocumenti(val.token_value, 0,0,cat.tab_tipo_documento_cod,cat.tab_categoria_documento_cod).subscribe(
          (val1)=>{
            if (val1.ErrorMessage.msg_code == 0){
              this.lista = val1.l_lista_documenti;
            }else{
              alert("errore ricezione lista");
            }
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

  goToDetails(doc){
    this.navCtrl.push(DocumentaleDetailsPage, {doc : doc});
  }
  
}
