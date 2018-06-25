
import { Error } from './../../models/shared/error.namespace';
import { StoreService } from './../../services/store/store.service';
import { Storage } from '@ionic/storage';

import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { LoginService } from '../../services/login/login.service';
import { ErrorService } from './../../services/shared/error.service';
import { Login } from '../../models/login/login.namespace';

import { HomePage} from '../../pages/home/home';
import { User } from '../../models/user/user.namespace';

/**
 * Generated class for the ComunicazioneComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private userData: User.UserData;

  private username: string = "";
  private password: string = ""; 
  
  constructor(private loginService: LoginService,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private store: StoreService,
    private error: ErrorService){
    this.userData = new User.UserData();
  }

  public login(): void {
    this.loginService.login(this.username, this.password).subscribe(r => {
      if(r.ws_result != "E"){
        this.userData.username = this.username;
        this.userData.password = this.password;
        this.userData.token = r.m_token_value;
        this.store.setUserData(this.userData);
        
        this.navCtrl.setRoot(HomePage, {val: 'pippo'});
      } else {
        //throw new Error("test Error");
        let ed = new Error.ErrorData();
        ed.message = "errore nel login" ; 
        this.error.sendError(ed);
        //this.presentAlert();
      }
    });
  }

  presentAlert() {
    // se serve, qui si puo' mettere una chiamata per tenere traccia di chi ha tentato e fallito il login

    let alert = this.alertCtrl.create({
      title: 'Login Failed',
      subTitle: 'Retry',
      buttons: ['Again']
    });
    alert.present();
  }
}
