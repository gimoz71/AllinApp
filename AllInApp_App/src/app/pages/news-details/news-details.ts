import { StoreService } from './../../services/store/store.service';
import { HttpService } from './../../services/shared/http.service';
import { NavController, NavParams } from 'ionic-angular';

import { OnInit, Component } from '@angular/core';
import { News } from '../../models/news/news.namespace';



@Component({
  selector: 'news-details',
  templateUrl: 'news-details.html'
})

export class NewsDetailsPage implements OnInit {

  public news : News.NewsElem;
  constructor(private navCtrl : NavController, private navParams: NavParams, private http: HttpService, private store:  StoreService) {
          
  }

  ngOnInit(){
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
  