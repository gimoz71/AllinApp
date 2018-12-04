import { OnInit, Component, Input } from '@angular/core';
import { HomeElement } from '../../models/home-element/home-element.namespace';
import { Comunicazione } from '../../models/comunicazione/comunicazione.namespace';


@Component({
  selector: 'home-com',
  templateUrl: 'home-com.html'
})
export class HomeComPage implements OnInit{
 
  @Input('color') color : string;
  @Input('date') date : string;
  @Input('titolo') titolo : string;
  @Input('descrizione') descrizione : string;

  giorno;
  mese;

  constructor() {
    
  }

  public ngOnInit() : void {
    this.giorno = " ";
    this.mese = " ";
    if (this.date != null) this.mese = this.date.charAt(5) + this.date.charAt(6);
    if (this.date != null) this.giorno = this.date.charAt(8) + this.date.charAt(9);
    if (this.mese == "01") this.mese = "Gennaio";
    else if (this.mese == "02") this.mese = "Febbraio";
    else if (this.mese == "03") this.mese = "Marzo";
    else if (this.mese == "04") this.mese = "Aprile";
    else if (this.mese == "05") this.mese = "Maggio";
    else if (this.mese == "06") this.mese = "Giugno";
    else if (this.mese == "07") this.mese = "Luglio";
    else if (this.mese == "08") this.mese = "Agosto";
    else if (this.mese == "09") this.mese = "Settembre";
    else if (this.mese == "10") this.mese = "Ottobre";
    else if (this.mese == "11") this.mese = "Novembre";
    else if (this.mese == "12") this.mese = "Diciembre";        
  }


  
}
