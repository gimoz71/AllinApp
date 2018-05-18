import { Component } from '@angular/core';

/**
 * Generated class for the ComunicazioneComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'comunicazione',
  templateUrl: 'comunicazione.html'
})
export class ComunicazioneComponent {

  text: string;

  constructor() {
    console.log('Hello ComunicazioneComponent Component');
    this.text = 'Hello World';
  }

}
