import { BachecaPage } from './../../pages/bacheca/bacheca';

import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ListObjectModule } from '../list-object/list-object.module';

@NgModule({
	declarations: [BachecaPage],
	imports: [IonicModule, ListObjectModule],
	exports: [BachecaPage]
})
export class BachecaModule {}
