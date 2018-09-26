import { HttpService } from './../../services/shared/http.service';
import { NavParams, NavController } from 'ionic-angular';
import { OnInit, Component, Input } from '@angular/core';
import { HomeElement } from '../../models/home-element/home-element.namespace';
import { News } from '../../models/news/news.namespace';
import { NewsDetailsPage } from '../news-details/news-details';
import { Module } from '../../models/modules/modules.namespace';


@Component({
  selector: 'news',
  templateUrl: 'news.html'
})
export class NewsPage implements OnInit{

  public newsFull : News.NewsElem[];
  public borderColor = "border-blue";
  color : string;
  icon : string;
  
  constructor(private navCtrl : NavController,private navParams: NavParams, private http: HttpService) {
    
  }

  public ngOnInit() : void {
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
    this.newsFull =this.navParams.get('news');
  }

  back(){
    this.navCtrl.pop();
  }
  
  public goToDetails(news){
    this.navCtrl.push(NewsDetailsPage, {news : news});
  }
}
