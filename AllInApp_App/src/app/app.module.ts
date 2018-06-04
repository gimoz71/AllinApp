import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';

// #REGION - Modules
import {LoginModule} from './modules/login/login.module';
import {HomeModule} from './modules/home/home.module';

// #REGION - Components/pages
import { HomePage } from './pages/home/home';
// import { TabsPage } from './pages/tabs/tabs';
// import { ComunicazioniPage } from './pages/comunicazioni/comunicazioni';
import { LoginPage } from './pages/login/login';

// #REGION - Services
import { ComunicazioneService } from './services/comunicazione.service';
import { HttpService } from './services/shared/http.service';
import { LoginService} from './services/login/login.service';

@NgModule({
  declarations: [
    MyApp,
    //HomePage,
    // TabsPage,
    // ComunicazioniPage,
    //LoginPage
  ],
  imports: [
    IonicModule,
    BrowserModule,
    LoginModule,
    HttpClientModule,
    HomeModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    // TabsPage,
    // ComunicazioniPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ComunicazioneService,
    HttpService,
    LoginService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
