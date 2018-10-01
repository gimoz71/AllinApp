import { ComunicazioniPage } from './../../pages/comunicazioni/comunicazioni';
import { HomeComModule } from './../home-com/home-com.module';


import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [ComunicazioniPage],
	imports: [IonicModule, HomeComModule], 
	exports: [ComunicazioniPage]
})
export class ComunicazioniPageModule {}
