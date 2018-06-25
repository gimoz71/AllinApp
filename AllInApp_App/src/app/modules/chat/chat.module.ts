import { NgModule } from '@angular/core';
import { ChatPage } from '../../pages/chat/chat';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [ChatPage],
	imports: [IonicModule],
	exports: [ChatPage]
})
export class ChatModule {}
