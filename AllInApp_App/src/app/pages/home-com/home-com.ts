import { OnInit, Component, Input } from '@angular/core';
import { HomeElement } from '../../models/home-element/home-element.namespace';


@Component({
  selector: 'home-com',
  templateUrl: 'home-com.html'
})
export class HomeComPage implements OnInit{
 
  @Input('data') data : HomeElement.ComunicazioniElement
  constructor() {
    
  }

  public ngOnInit() : void {
    
  }


  
}
