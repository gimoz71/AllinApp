import { OnInit, Component, Input } from '@angular/core';
import { HomeElement } from '../../models/home-element/home-element.namespace';
import { Comunicazione } from '../../models/comunicazione/comunicazione.namespace';


@Component({
  selector: 'home-com',
  templateUrl: 'home-com.html'
})
export class HomeComPage implements OnInit{
 
  @Input('data') data : Comunicazione.ComunicazioneElencoElem;
  @Input('color') color : string;

  giorno;
  mese;

  constructor() {
    
  }

  public ngOnInit() : void {
    this.giorno = " ";
    this.mese = " ";
    if (this.data.cm_data != null) this.mese = this.data.cm_data.charAt(5) + this.data.cm_data.charAt(6);
    if (this.data.cm_data != null) this.giorno = this.data.cm_data.charAt(8) + this.data.cm_data.charAt(9);
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
