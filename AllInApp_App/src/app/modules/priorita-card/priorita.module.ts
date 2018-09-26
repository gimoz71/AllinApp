import { PrioritaCardPage } from './../../pages/priorita-card/priorita-card';
import { HomePrioModule } from './../home-prio/home-prio.module';

import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [PrioritaCardPage],
	imports: [IonicModule, HomePrioModule],
	exports: [PrioritaCardPage]
})
export class PrioritaCardModule {}
