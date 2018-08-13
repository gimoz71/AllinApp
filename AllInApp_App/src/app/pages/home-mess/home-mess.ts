import { Messaggi } from './../../models/messaggi/messaggi.namespace';
import { OnInit, Component, Input } from '@angular/core';
import { HomeElement } from '../../models/home-element/home-element.namespace';
import { News } from '../../models/news/news.namespace';


@Component({
  selector: 'home-mess',
  templateUrl: 'home-mess.html'
})
export class HomeMessPage implements OnInit{
 
  @Input('data') data : Messaggi.MessaggiElem;
  constructor() {
    
  }

  public ngOnInit() : void {
    
  }


  
}
