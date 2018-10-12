import { IonicSelectableModule } from 'ionic-selectable';
import { MessaggiNuovoPage } from './../../pages/messaggi-nuovo/messaggi-nuovo';


import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [MessaggiNuovoPage],
	imports: [IonicModule, IonicSelectableModule ],
	exports: [MessaggiNuovoPage]
})
export class MessaggiNuovoModule {}
