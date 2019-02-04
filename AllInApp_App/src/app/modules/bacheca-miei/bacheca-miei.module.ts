import { BachecaMieiPage } from './../../pages/bacheca-miei/bacheca-miei';


import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ListObjectModule } from '../list-object/list-object.module';

@NgModule({
	declarations: [BachecaMieiPage],
	imports: [IonicModule, ListObjectModule],
	exports: [BachecaMieiPage]
})
export class BachecaMieiModule {}
