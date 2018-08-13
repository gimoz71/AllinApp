import { HomeMessPage } from './../../pages/home-mess/home-mess';
import { HomeComPage } from './../../pages/home-com/home-com';
import { NgModule } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [HomeMessPage],
	imports: [IonicModule],
	exports: [HomeMessPage]
})
export class HomeMessModule {}
