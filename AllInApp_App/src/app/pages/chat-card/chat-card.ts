import { ChatPage } from './../chat/chat';
import { NavController } from 'ionic-angular';

import { OnInit, Component } from '@angular/core';



@Component({
  selector: 'chat-card',
  templateUrl: 'chat-card.html'
})
export class ChatCardPage implements OnInit {

  
  constructor(private navCtrl : NavController) {
          
  }

  ngOnInit(){

  }

  public goToChat(){
    this.navCtrl.push(ChatPage);
  }

}
  