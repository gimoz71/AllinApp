import { HomeComPage } from './../../pages/home-com/home-com';
import { NgModule } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [HomeComPage],
	imports: [IonicModule],
	exports: [HomeComPage]
})
export class HomeComModule {}
