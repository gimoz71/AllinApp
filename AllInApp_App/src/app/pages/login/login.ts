import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
    public navCtrl: NavController){
    this.token = new Login.ws_Token();
  }

  public login(): void {
    this.loginService.login(this.username, this.password).subscribe(r => {
      if(r.Success){
        this.token = r.Data;
        this.navCtrl.push(HomePage, {val: 'pippo'});
      } else {
        
      }
    });
  }

  public createAccount(): void {

  }
}
