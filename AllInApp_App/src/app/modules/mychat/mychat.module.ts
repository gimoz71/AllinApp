import { NgModule } from '@angular/core';
import { MyChatPage } from '../../pages/mychat/mychat';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [MyChatPage],
	imports: [IonicModule],
	exports: [MyChatPage]
})
export class MyChatModule {}
