import { LoadingPage } from './pages/loading/loading';
import { User } from './models/user/user.namespace';

import { StoreService } from './services/store/store.service';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';

import { AlertService } from './services/shared/alert.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoadingPage;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private store: StoreService,
    private alertService: AlertService,
    private firebaseNative: FirebaseX) {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      platform.ready().then(() => {
        statusBar.styleDefault();
        this.initializeApp();
        splashScreen.hide();

    });
  }

  private initializeApp(): void {
    this.firebaseNative.onMessageReceived().subscribe(message =>{
      let id = 0;
      console.log("TIPO NOTIFICA: " + message.tipo_notifica);
      this.alertService.presentAlert(message.text);
    });
  }
}
