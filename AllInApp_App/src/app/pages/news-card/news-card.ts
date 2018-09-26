import { NewsDetailsPage } from './../news-details/news-details';
import { NewsPage } from './../news/news';
import { HomeNewsPage } from './../home-news/home-news';
import { HttpService } from './../../services/shared/http.service';
import { NavController } from 'ionic-angular';

import { OnInit, Component, Input } from '@angular/core';
import { HomeElement } from '../../models/home-element/home-element.namespace';
import { StoreService } from '../../services/store/store.service';
import { News } from '../../models/news/news.namespace';


@Component({
  selector: 'news-card',
  templateUrl: 'news-card.html'
})

export class NewsCardPage implements OnInit {

  public newsFull : News.NewsElem[];

  public newsMin : News.NewsElem[] = [];
  
  constructor(private navCtrl : NavController, private http : HttpService, private store : StoreService) {
          
  }

  ngOnInit(){
    let s = this.store.userData$.subscribe((val)=>{
        let s1 = this.http.getNewsList(val.token_value,"0","0","X").subscribe(
            (res)=>{
              console.log(res);
              if (res.ErrorMessage.msg_code == 0){
                this.newsFull = res.l_lista_news;
                for (let i = 0 ; i < 4 ; i++){
                  if (this.newsFull[i] != null){
                    this.newsMin[i]=  this.newsFull[i];
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

    public goToNews(){
      this.navCtrl.push(NewsPage,{news: this.newsFull});
    }

    public goToDetails(news){
      this.navCtrl.push(NewsDetailsPage,{news: news});
    }
}
  