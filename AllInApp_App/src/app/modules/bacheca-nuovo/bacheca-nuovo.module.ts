import { BachecaNuovoPage } from './../../pages/bacheca-nuovo/bacheca-nuovo';
import { IonicSelectableModule } from 'ionic-selectable';


import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [BachecaNuovoPage],
	imports: [IonicModule, IonicSelectableModule ],
	exports: [BachecaNuovoPage]
})
export class BachecaNuovoModule {}
