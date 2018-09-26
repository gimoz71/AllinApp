import { OnInit, Component, Input } from '@angular/core';
import { HomeElement } from '../../models/home-element/home-element.namespace';
import { News } from '../../models/news/news.namespace';


@Component({
  selector: 'home-news',
  templateUrl: 'home-news.html'
})
export class HomeNewsPage implements OnInit{
 
  @Input('data') data : News.NewsElem
  constructor() {
    
  }

  public ngOnInit() : void {
    
  }


  
}
