import { StoreService } from './../../services/store/store.service';
import { HttpService } from './../../services/shared/http.service';
import { NavController, NavParams } from 'ionic-angular';

import { OnInit, Component } from '@angular/core';
import { News } from '../../models/news/news.namespace';
import { Module } from '../../models/modules/modules.namespace';



@Component({
  selector: 'news-details',
  templateUrl: 'news-details.html'
})

export class NewsDetailsPage implements OnInit {

  public news : News.NewsElem;
  color : string;
  icon : string;
  constructor(private navCtrl : NavController, private navParams: NavParams, private http: HttpService, private store:  StoreService) {
          
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

    this.news =this.navParams.get('news');
    let s = this.store.userData$.subscribe((val)=>{
      let s1 = this.http.setReadNews(val.token_value, this.news.news_key).subscribe(
        (r)=>{
          console.log(r);
        }
      );
      s.unsubscribe();
      }
    );
    this.store.getUserData();
  }

  back(){
    this.navCtrl.pop();
  }

}
  