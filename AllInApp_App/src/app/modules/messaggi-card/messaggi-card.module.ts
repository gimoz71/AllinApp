import { HomeComModule } from './../home-com/home-com.module';
import { HomeMessModule } from './../home-mess/home-mess.module';
import { MessaggiCardPage } from './../../pages/messaggi-card/messaggi-card';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [MessaggiCardPage],
	imports: [IonicModule, HomeMessModule, HomeComModule],
	exports: [MessaggiCardPage]
})
export class MessaggiCardModule {}
