import { NgModule } from '@angular/core';
import { ContactsPage } from '../../pages/contacts/contacts';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [ContactsPage],
	imports: [IonicModule],
	exports: [ContactsPage]
})
export class ContactsModule {}
