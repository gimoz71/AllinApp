import { MessaggiCardModule } from './../messaggi-card/messaggi-card.module';
import { NewsCardModule } from './../news-card/news-card.module';
import { PrioritaCardModule } from './../priorita-card/priorita.module';
import { ChatCardModule } from './../chat-card/contact-card.module';
import { DocumentaleCardModule } from './../documentale-card/documentale-card.module';
import { ContactCardModule } from './../contact-card/contact-card.module';
import { HomePrioModule } from './../home-prio/home-prio.module';
import { HomeComModule } from './../home-com/home-com.module';
import { NgModule } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { IonicModule } from 'ionic-angular';
import { ComunicazioniCardModule } from '../comunicazioni-card/comunicazioni-card.module';

@NgModule({
	declarations: [HomePage],
	imports: [IonicModule, HomeComModule, HomePrioModule, ContactCardModule, 
		DocumentaleCardModule, ChatCardModule, PrioritaCardModule, MessaggiCardModule,
		NewsCardModule, ComunicazioniCardModule],
	exports: [HomePage]
})
export class HomeModule {}
