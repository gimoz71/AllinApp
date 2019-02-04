import { HomeComModule } from './../home-com/home-com.module';
import { HomeMessModule } from './../home-mess/home-mess.module';
import { BachecaCardPage } from './../../pages/bacheca-card/bacheca-card';

import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [BachecaCardPage],
	imports: [IonicModule, HomeMessModule, HomeComModule],
	exports: [BachecaCardPage]
})
export class BachecaCardModule {}
