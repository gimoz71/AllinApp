import { NgModule } from '@angular/core';
import { ContactDetailsPage } from '../../pages/contact-details/contact-details';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [ContactDetailsPage],
	imports: [IonicModule],
	exports: [ContactDetailsPage]
})
export class ContactDetailsModule {}