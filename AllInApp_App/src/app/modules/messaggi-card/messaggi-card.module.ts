import { HomeMessModule } from './../home-mess/home-mess.module';
import { MessaggiCardPage } from './../../pages/messaggi-card/messaggi-card';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [MessaggiCardPage],
	imports: [IonicModule, HomeMessModule],
	exports: [MessaggiCardPage]
})
export class MessaggiCardModule {}
