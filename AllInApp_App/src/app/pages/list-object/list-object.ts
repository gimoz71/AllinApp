import { Messaggi } from './../../models/messaggi/messaggi.namespace';
import { OnInit, Component, Input } from '@angular/core';
import { HomeElement } from '../../models/home-element/home-element.namespace';
import { News } from '../../models/news/news.namespace';


@Component({
  selector: 'list-object',
  templateUrl: 'list-object.html'
})
export class ListObjectPage implements OnInit{
 
  @Input('color') color : string;
  @Input('icon') icon : string;
  @Input('titolo') titolo : string;
  @Input('descrizione') descrizione : string;
  @Input('date') date : string;
  @Input('letta') letta : string;

  giorno;
  ora;

  constructor() {
    
  }

  public ngOnInit() : void {
    this.giorno = " ";
    this.ora = " ";
    if (this.date != null) this.ora = this.date.charAt(11) + this.date.charAt(12) + ":" + this.date.charAt(13) + this.date.charAt(14);
    if (this.date != null) this.giorno = this.date.charAt(8) + this.date.charAt(9);
  }


  
}
