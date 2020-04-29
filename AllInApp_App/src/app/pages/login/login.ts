
import { Error } from './../../models/shared/error.namespace';
import { StoreService } from './../../services/store/store.service';
import { Storage } from '@ionic/storage';
import { AlertService } from '../../services/shared/alert.service';

import { FirebaseX } from '@ionic-native/firebase-x/ngx';

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

  private userData: Login.Token;

  private username: string = "";
  private password: string = "";

  private firebase_token: string = "";

  constructor(private loginService: LoginService,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private store: StoreService,
    private error: ErrorService,
    private alertService: AlertService,
    public firebaseNative: FirebaseX,){
    this.userData = new Login.Token;
  }

  public login(): void {

    var self = this;
    this.firebaseNative.getToken().then(function(fbToken){
      self.firebase_token = fbToken;

      let s = self.loginService.login(self.username, self.password).subscribe(r => {
        console.log(r);
        if(r.ErrorMessage.msg_code == 0){
          self.userData = r;
          self.store.setUserData(self.userData);

          self.navCtrl.setRoot(HomePage, {val: 'pippo'});
        } else {
          //throw new Error("test Error");
          //let ed = new Error.ErrorData();
          //ed.message = "errore nel login" ;
          //this.error.sendError(ed);
          self.alertService.presentAlert(r.ErrorMessage.msg_testo);
        }
        s.unsubscribe();
      });
    }

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
