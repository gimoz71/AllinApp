import { Base64 } from '@ionic-native/base64';
import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';

import { ErrorService } from './services/shared/error.service';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

// #REGION - Modules
import {LoginModule} from './modules/login/login.module';
import {HomeModule} from './modules/home/home.module';
import { LoadingModule } from './modules/loading/loading.module';
import { ChatModule } from './modules/chat/chat.module';
import { MyChatModule } from './modules/mychat/mychat.module';
import { ProfiloModule } from './modules/profilo/profilo.module';
// #REGION - Components/pages
import { HomePage } from './pages/home/home';
// import { TabsPage } from './pages/tabs/tabs';
// import { ComunicazioniPage } from './pages/comunicazioni/comunicazioni';
import { LoginPage } from './pages/login/login';
import { LoadingPage } from './pages/loading/loading';
import { ChatPage } from './pages/chat/chat';
import { MyChatPage } from './pages/mychat/mychat';
import { ContactsPage } from './pages/contacts/contacts';
import { ContactDetailsPage } from './pages/contact-details/contact-details';
import { ProfiloPage } from './pages/profilo/profilo';
// #REGION - Services
import { ComunicazioneService } from './services/comunicazione.service';
import { HttpService } from './services/shared/http.service';
import { LoginService} from './services/login/login.service';
import { IonicStorageModule } from '@ionic/storage';
import { StoreService } from './services/store/store.service';
import { ContactService } from './services/contact/contact.service';
import { ContactsModule } from './modules/contacts/contacts.module';
import { ContactDetailsModule } from './modules/contact-details/contact-details.module';
import { CheckService } from './services/shared/check.service';

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
    MyChatModule,
    ContactsModule,
    ContactDetailsModule,
    ProfiloModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ContactsPage,
    // TabsPage,
    // ComunicazioniPage,
    LoginPage,
    LoadingPage,
    ChatPage,
    MyChatPage,
    ProfiloPage,
    ContactDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StoreService,
    ComunicazioneService,
    HttpService,
    LoginService,
    ErrorService,
    ContactService,
    CheckService,
    CallNumber,
    EmailComposer,
    FileTransfer,
    File,
    Camera,
    Base64,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
