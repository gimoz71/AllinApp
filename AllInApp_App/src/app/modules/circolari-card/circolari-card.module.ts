import { HomeMessModule } from './../home-mess/home-mess.module';
import { CircolariCardPage } from './../../pages/circolari-card/circolari-card';
import { HomeComModule } from './../home-com/home-com.module';



import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [CircolariCardPage],
	imports: [IonicModule, HomeComModule, HomeMessModule],
	exports: [CircolariCardPage]
})
export class CircolariCardModule {}
