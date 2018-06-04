import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { LoginService } from '../../services/login/login.service';
import { Login } from '../../models/login/login.namespace';

import { HomePage} from '../../pages/home/home';

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

  private token: Login.ws_Token;

  private username: string = "";
  private password: string = ""; 
  
  constructor(private loginService: LoginService,
    public navCtrl: NavController,
    private alertCtrl: AlertController){
    this.token = new Login.ws_Token();
  }

  public login(): void {
    this.loginService.login(this.username, this.password).subscribe(r => {
      if(r.Success){
        this.token = r.Data;
        this.navCtrl.push(HomePage, {val: 'pippo'});
      } else {
        //throw new Error("test Error");
        this.presentAlert();
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
