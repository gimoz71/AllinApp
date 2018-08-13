import { NavParams, NavController } from 'ionic-angular';
import { OnInit, Component, Input } from '@angular/core';
import { HomeElement } from '../../models/home-element/home-element.namespace';
import { News } from '../../models/news/news.namespace';
import { NewsDetailsPage } from '../news-details/news-details';


@Component({
  selector: 'news',
  templateUrl: 'news.html'
})
export class NewsPage implements OnInit{

  public newsFull : News.NewsElem[];
  public borderColor = "border-blue";
  
  constructor(private navCtrl : NavController,private navParams: NavParams) {
    
  }

  public ngOnInit() : void {
    this.newsFull =this.navParams.get('news');
  }

  back(){
    this.navCtrl.pop();
  }
  
  public goToDetails(news){
    this.navCtrl.push(NewsDetailsPage, {news : news});
  }
}
