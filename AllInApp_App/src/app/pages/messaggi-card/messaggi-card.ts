import { MessaggiDetailsPage } from './../messaggi-details/messaggi-details';

import { MessaggiPage } from './../messaggi/messaggi';
import { NewsDetailsPage } from './../news-details/news-details';
import { NewsPage } from './../news/news';
import { HttpService } from './../../services/shared/http.service';
import { NavController, MenuController } from 'ionic-angular';

import { OnInit, Component, Input } from '@angular/core';
import { HomeElement } from '../../models/home-element/home-element.namespace';
import { StoreService } from '../../services/store/store.service';
import { News } from '../../models/news/news.namespace';
import { Messaggi } from '../../models/messaggi/messaggi.namespace';
import { Module } from '../../models/modules/modules.namespace';


@Component({
  selector: 'messaggi-card',
  templateUrl: 'messaggi-card.html'
})


export class MessaggiCardPage implements OnInit {

  public messFull : Messaggi.MessaggiElem[] = [];

  public messMin : Messaggi.MessaggiElem[] = [];

  public color : string;
  public icon : string;
  public colonne : number;
  
  @Input() modules: Module.ModuleElem[];
  
  constructor(private navCtrl : NavController, private http : HttpService, private store : StoreService,
    public menuCtrl: MenuController) {
          
  }

  ngOnInit(){

    if (this.modules != undefined){
      for (let i = 0 ; i < this.modules.length; i++){
        if (this.modules[i].tab_moduli_cod==5){
          this.color = this.modules[i].tab_moduli_colore;
          this.icon = this.modules[i].tab_moduli_icona;
          this.colonne = this.modules[i].tab_moduli_colonne;
        }
      }
    }

    let s = this.store.userData$.subscribe((val)=>{
        let s1 = this.http.getMessaggeList(val.token_value,"0","0","I").subscribe(
            (res)=>{
              console.log(res);
              if (res.ErrorMessage.msg_code == 0){
                this.messFull = res.l_lista_messaggi;
                if (this.colonne==1){
                  for (let i = 0 ; i < 4 ; i++){
                    if (this.messFull[i] != null){
                      this.messMin[i]=  this.messFull[i];
                    }
                  }
                }else{
                  for (let i = 0 ; i < 3 ; i++){
                    if (this.messFull[i] != null){
                      this.messMin[i]=  this.messFull[i];
                    }
                  }
                }
                
              }else{
                console.log("errore ricezione News");
              }
              s1.unsubscribe();
            }
          );
          s.unsubscribe();
         }
      );
      this.store.getUserData();
    }

    public goToMessaggi(){
      this.navCtrl.push(MessaggiPage, {messFull : this.messFull});
      //this.navCtrl.setRoot(MessaggiPage);
      this.menuCtrl.enable(false, 'home');
    }

    public goToDetails(mess){
      this.navCtrl.push(MessaggiDetailsPage,{mess: mess});
    }
}
  