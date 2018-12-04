import { HomeMessModule } from './../home-mess/home-mess.module';
import { HomeComModule } from './../home-com/home-com.module';
import { ComunicazioniCardPage } from './../../pages/comunicazioni-card/comunicazioni-card';


import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [ComunicazioniCardPage],
	imports: [IonicModule, HomeComModule, HomeMessModule],
	exports: [ComunicazioniCardPage]
})
export class ComunicazioniCardModule {}
