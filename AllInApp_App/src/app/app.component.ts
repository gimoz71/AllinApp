import { LoadingPage } from './pages/loading/loading';
import { User } from './models/user/user.namespace';

import { StoreService } from './services/store/store.service';
import { HomePage } from './pages/home/home';
import { LoginPage } from "./pages/login/login";
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoadingPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private store: StoreService) {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      platform.ready().then(() => {
        statusBar.styleDefault();
        splashScreen.hide();
    });
  }
}
