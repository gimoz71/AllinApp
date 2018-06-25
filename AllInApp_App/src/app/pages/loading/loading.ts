import { StoreService } from './../../services/store/store.service';
import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from "../login/login";
import { User } from '../../models/user/user.namespace';

/**
 * Generated class for the LoadingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {

  constructor(public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private store: StoreService) {
    this.presentLoadingDefault();
    this.store.userData$.subscribe((val: User.UserData) =>{
      console.log(val);
      if (val != null){
        this.navCtrl.setRoot(HomePage, {val: 'pippo'});
      }else{
        this.navCtrl.setRoot(LoginPage, {val: 'pippo'});
      }
    })
    this.store.getUserData();
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }


}
