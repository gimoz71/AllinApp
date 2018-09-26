import { HomePrioPage } from './../../pages/home-prio/home-prio';
import { NgModule } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [HomePrioPage],
	imports: [IonicModule],
	exports: [HomePrioPage]
})
export class HomePrioModule {}
