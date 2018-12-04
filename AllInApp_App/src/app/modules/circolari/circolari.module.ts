import { ListObjectModule } from './../list-object/list-object.module';
import { CircolariPage } from './../../pages/circolari/circolari';
import { HomeComModule } from './../home-com/home-com.module';


import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [CircolariPage],
	imports: [IonicModule, ListObjectModule],
	exports: [CircolariPage]
})
export class CircolariPageModule {}
