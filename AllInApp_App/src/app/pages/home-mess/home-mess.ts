import { Messaggi } from './../../models/messaggi/messaggi.namespace';
import { OnInit, Component, Input } from '@angular/core';
import { HomeElement } from '../../models/home-element/home-element.namespace';
import { News } from '../../models/news/news.namespace';


@Component({
  selector: 'home-mess',
  templateUrl: 'home-mess.html'
})
export class HomeMessPage implements OnInit{
 
  @Input('color') color : string;
  @Input('icon') icon : string;
  @Input('titolo') titolo : string;
  @Input('descrizione') descrizione : string;
  constructor() {
    
  }

  public ngOnInit() : void {
    
  }


  
}
