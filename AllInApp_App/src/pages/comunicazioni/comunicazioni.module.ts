import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComunicazioniPage } from './comunicazioni';

@NgModule({
  declarations: [
    ComunicazioniPage,
  ],
  imports: [
    IonicPageModule.forChild(ComunicazioniPage),
  ],
})
export class ComunicazioniPageModule {}
