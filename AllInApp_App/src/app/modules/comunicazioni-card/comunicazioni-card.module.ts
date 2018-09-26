import { HomeComModule } from './../home-com/home-com.module';
import { ComunicazioniCardPage } from './../../pages/comunicazioni-card/comunicazioni-card';


import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [ComunicazioniCardPage],
	imports: [IonicModule, HomeComModule],
	exports: [ComunicazioniCardPage]
})
export class ComunicazioniCardModule {}
