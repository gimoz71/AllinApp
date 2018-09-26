import { DocumentaleDetailsPage } from './../../pages/documentale-details/documentale-details';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DocumentaleCategoriePage } from '../../pages/documentale-categorie/documentale-categorie';

@NgModule({
	declarations: [DocumentaleDetailsPage],
	imports: [IonicModule],
	exports: [DocumentaleDetailsPage]
})
export class DocumentaleDetailsModule {}
