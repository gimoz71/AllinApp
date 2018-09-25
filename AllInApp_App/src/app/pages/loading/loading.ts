import { OnInit, OnDestroy } from '@angular/core';
import { Login } from './../../models/login/login.namespace';
import { StoreService } from './../../services/store/store.service';
import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from "../login/login";

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
export class LoadingPage implements OnInit, OnDestroy {

  private subscrition ;

  constructor(public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private store: StoreService) {
    
  }

  ngOnInit(){
    this.presentLoadingDefault();
    /**this.subscrition = this.store.userData$.subscribe((val: Login.Token) =>{
      if (val != null){
        this.navCtrl.setRoot(HomePage);
      }else{
        this.navCtrl.setRoot(LoginPage);
      }
    })
    this.store.getUserData();**/

    this.store.getUserDataPromise().then(
      (val: Login.Token) =>{
        if (val != null){
          this.navCtrl.setRoot(HomePage);
        }else{
          this.navCtrl.setRoot(LoginPage);
        }
      }
    )
  }

  ngOnDestroy(){
    //this.subscrition.unsubscribe();
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
