import { NgModule } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [HomePage],
	imports: [IonicModule],
	exports: [HomePage]
})
export class HomeModule {}
