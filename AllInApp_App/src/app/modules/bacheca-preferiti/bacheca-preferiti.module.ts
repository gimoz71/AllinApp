import { BachecaPreferitiPage } from './../../pages/bacheca-preferiti/bacheca-preferiti';
import { IonicSelectableModule } from 'ionic-selectable';


import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [BachecaPreferitiPage],
	imports: [IonicModule, IonicSelectableModule ],
	exports: [BachecaPreferitiPage]
})
export class BachecaPreferitiModule {}
