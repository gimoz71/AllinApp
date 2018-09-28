import { NewsDetailsPage } from './../news-details/news-details';
import { NewsPage } from './../news/news';
import { HttpService } from './../../services/shared/http.service';
import { NavController } from 'ionic-angular';

import { OnInit, Component, Input } from '@angular/core';
import { HomeElement } from '../../models/home-element/home-element.namespace';
import { StoreService } from '../../services/store/store.service';
import { News } from '../../models/news/news.namespace';
import { Module } from '../../models/modules/modules.namespace';


@Component({
  selector: 'news-card',
  templateUrl: 'news-card.html'
})

export class NewsCardPage implements OnInit {

  public newsFull : News.NewsElem[];

  public newsMin : News.NewsElem[] = [];

  public color : string;
  public icon : string;
  public colonne : number;

  @Input() modules: Module.ModuleElem[];
  
  constructor(private navCtrl : NavController, private http : HttpService, private store : StoreService) {
          
  }

  ngOnInit(){

    if (this.modules != undefined){
      for (let i = 0 ; i < this.modules.length; i++){
        if (this.modules[i].tab_moduli_cod==2){
          this.color = this.modules[i].tab_moduli_colore;
          this.icon = this.modules[i].tab_moduli_icona;
          this.colonne = this.modules[i].tab_moduli_colonne;
        }
      }
    }
    
    /**let s = this.store.userData$.subscribe((val)=>{
        let s1 = this.http.getNewsList(val.token_value,"0","0","X").subscribe(
            (res)=>{
              console.log(res);
              if (res.ErrorMessage.msg_code == 0){
                this.newsFull = res.l_lista_news;
                if (this.colonne == 1){
                  for (let i = 0 ; i < 4 ; i++){
                    if (this.newsFull[i] != null){
                      this.newsMin[i]=  this.newsFull[i];
                    }
                  }
                }else{
                  for (let i = 0 ; i < 3 ; i++){
                    if (this.newsFull[i] != null){
                      this.newsMin[i]=  this.newsFull[i];
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
      this.store.getUserData();**/

      this.http.getNewsList("0","0","X").then(
        (res : News.NewsElem[])=>{
          this.newsFull = res;
          if (this.colonne == 1){
            for (let i = 0 ; i < 4 ; i++){
              if (this.newsFull[i] != null){
                this.newsMin[i]=  this.newsFull[i];
              }
            }
          }else{
            for (let i = 0 ; i < 3 ; i++){
              if (this.newsFull[i] != null){
                this.newsMin[i]=  this.newsFull[i];
              }
            }
          }
        },
        (error)=>{
          console.log("errore ricezione News");
          console.log(error);
        }
      );
    }

    public goToNews(){
      this.navCtrl.push(NewsPage,{news: this.newsFull});
    }

    public goToDetails(news){
      this.navCtrl.push(NewsDetailsPage,{news: news});
    }
}
  