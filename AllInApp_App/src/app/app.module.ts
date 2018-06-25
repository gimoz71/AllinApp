import { AboutPage } from './pages/about/about';
import { ErrorService } from './services/shared/error.service';
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
import { LoadingModule } from './modules/loading/loading.module';
import { ChatModule } from './modules/chat/chat.module';
// #REGION - Components/pages
import { HomePage } from './pages/home/home';
// import { TabsPage } from './pages/tabs/tabs';
// import { ComunicazioniPage } from './pages/comunicazioni/comunicazioni';
import { LoginPage } from './pages/login/login';
import { LoadingPage } from './pages/loading/loading';
import { ChatPage } from './pages/chat/chat';
// #REGION - Services
import { ComunicazioneService } from './services/comunicazione.service';
import { HttpService } from './services/shared/http.service';
import { LoginService} from './services/login/login.service';
import { IonicStorageModule } from '@ionic/storage';
import { StoreService } from './services/store/store.service';

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
    LoadingModule,
    ChatModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    // TabsPage,
    // ComunicazioniPage,
    LoginPage,
    LoadingPage,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ComunicazioneService,
    HttpService,
    LoginService,
    StoreService,
    ErrorService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
