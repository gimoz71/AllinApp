import { OnInit, Component, Input } from '@angular/core';
import { HomeElement } from '../../models/home-element/home-element.namespace';


@Component({
  selector: 'home-prio',
  templateUrl: 'home-prio.html'
})
export class HomePrioPage implements OnInit{
 
  @Input('data') data : HomeElement.PrioritaElement
  constructor() {
    
  }

  public ngOnInit() : void {
    console.log(this.data);
  }


  
}
