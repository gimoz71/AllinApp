import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';

import {ComponentsModule} from '../components/components.module';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ComunicazioniPage } from '../pages/comunicazioni/comunicazioni';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ComunicazioneService } from '../services/comunicazione.service';
import { HttpService } from '../services/http.service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage, 
    HomePage,
    TabsPage,
    ComunicazioniPage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ComunicazioniPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ComunicazioneService,
    HttpService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
