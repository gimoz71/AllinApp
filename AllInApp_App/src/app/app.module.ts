import { BachecaDetailsModule } from './modules/bacheca-details/bacheca-details.module';
import { BachecaDetailsPage } from './pages/bacheca-details/bacheca-details';
import { BachecaMieiPage } from './pages/bacheca-miei/bacheca-miei';
import { BachecaPreferitiModule } from './modules/bacheca-preferiti/bacheca-preferiti.module';
import { BachecaPreferitiPage } from './pages/bacheca-preferiti/bacheca-preferiti';
import { BachecaNuovoModule } from './modules/bacheca-nuovo/bacheca-nuovo.module';
import { BachecaNuovoPage } from './pages/bacheca-nuovo/bacheca-nuovo';
import { BachecaPage } from './pages/bacheca/bacheca';
import { BachecaCardPage } from './pages/bacheca-card/bacheca-card';
import { BachecaModule } from './modules/bacheca/bacheca.module';
import { BachecaCardModule } from './modules/bacheca-card/bacheca-card.module';
import { ListObjectModule } from './modules/list-object/list-object.module';
import { ListObjectPage } from './pages/list-object/list-object';
import { DocumentaleListaPage } from './pages/documentale-lista/documentale-lista';
import { DocumentaleListaModule } from './modules/documentale-lista/documentale-lista.module';
import { DocumentaleDetailsPage } from './pages/documentale-details/documentale-details';
import { DocumentaleDetailsModule } from './modules/documentale-details/documentale-details.module';
import { DocumentaleCategoriePage } from './pages/documentale-categorie/documentale-categorie';
import { DocumentalePage } from './pages/documentale/documentale';
import { DocumentaleModule } from './modules/documentale/documentale.module';
import { ComunicazioniDetailsPage } from './pages/comunicazioni-details/comunicazioni-details';
import { CircolariDetailsModule } from './modules/circolari-details/circolari-details.module';
import { CircolariDetailsPage } from './pages/circolari-details/circolari-details';
import { CircolariCardPage } from './pages/circolari-card/circolari-card';
import { CircolariPage } from './pages/circolari/circolari';
import { CircolariCardModule } from './modules/circolari-card/circolari-card.module';
import { CircolariPageModule } from './modules/circolari/circolari.module';
import { ComunicazioniDetailsModule } from './modules/comunicazioni-details/comunicazioni-details.module';
import { ComunicazioniPageModule } from './modules/comunicazioni/comunicazioni.module';
import { MessaggiUscitaPage } from './pages/messaggi-uscita/messaggi-uscita';
import { MessaggiCestinoPage } from './pages/messaggi-cestino/messaggi-cestino';
import { MessaggiImportantiPage } from './pages/messaggi-importanti/messaggi-importanti';
import { MessaggiUscitaModule } from './modules/messaggi-uscita/messaggi-uscita.module';
import { MessaggiCestinoModule } from './modules/messaggi-cestino/messaggi-cestino.module';
import { MessaggiImportantiModule } from './modules/messaggi-importanti/messaggi-importanti.module';
import { MessaggiNuovoPage } from './pages/messaggi-nuovo/messaggi-nuovo';
import { MessaggiNuovoModule } from './modules/messaggi-nuovo/messaggi-nuovo.module';
import { HomeMessPage } from './pages/home-mess/home-mess';

import { MessaggiCardPage } from './pages/messaggi-card/messaggi-card';
import { MessaggiDetailsPage } from './pages/messaggi-details/messaggi-details';
import { MessaggiPage } from './pages/messaggi/messaggi';
import { HomeMessModule } from './modules/home-mess/home-mess.module';
import { MessaggiCardModule } from './modules/messaggi-card/messaggi-card.module';

import { ComunicazioniCardPage } from './pages/comunicazioni-card/comunicazioni-card';
import { NewsDetailsPage } from './pages/news-details/news-details';
import { NewsDetailsModule } from './modules/news-details/news-details.module';
import { NewsCardPage } from './pages/news-card/news-card';
import { NewsModule } from './modules/news/news.module';
import { NewsCardModule } from './modules/news-card/news-card.module';
import { ContactCardModule } from './modules/contact-card/contact-card.module';
import { ContactCardPage } from './pages/contact-card/contact-card';
import { HomeComPage } from './pages/home-com/home-com';
import { HomeComModule } from './modules/home-com/home-com.module';
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
import { NewsPage } from './pages/news/news';
import { ComunicazioniCardModule } from './modules/comunicazioni-card/comunicazioni-card.module';
import { MessaggiModule } from './modules/messaggi/messaggi.module';
import { MessaggiDetailsModule } from './modules/messaggi-details/messaggi-details.module';
import { ComunicazioniPage } from './pages/comunicazioni/comunicazioni';
import { DocumentaleCategorieModule } from './modules/documentale-categorie/documentale-categorie.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { BachecaMieiModule } from './modules/bacheca-miei/bacheca-miei.module';

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
    ComunicazioniCardModule,
    ComunicazioniPageModule,
    ComunicazioniDetailsModule,
    HomeComModule,
    LoadingModule,
    ChatModule,
    MyChatModule,
    ContactsModule,
    ContactDetailsModule,
    ProfiloModule,
    ContactCardModule,
    NewsCardModule,
    NewsModule,
    NewsDetailsModule,
    MessaggiModule,
    MessaggiDetailsModule,
    MessaggiCardModule,
    HomeMessModule,
    MessaggiNuovoModule,
    MessaggiImportantiModule,
    MessaggiUscitaModule,
    MessaggiCestinoModule,
    CircolariPageModule,
    CircolariCardModule,
    CircolariDetailsModule,
    DocumentaleModule,
    DocumentaleCategorieModule,
    DocumentaleDetailsModule,
    DocumentaleListaModule,
    ListObjectModule,
    IonicSelectableModule,
    BachecaCardModule,
    BachecaModule,
    BachecaNuovoModule,
    BachecaPreferitiModule,
    BachecaMieiModule,
    BachecaCardModule,
    BachecaDetailsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ComunicazioniCardPage,
    HomeComPage,
    ContactsPage,
    // TabsPage,
    ComunicazioniPage,
    ComunicazioniDetailsPage,
    LoginPage,
    LoadingPage,
    ChatPage,
    MyChatPage,
    ProfiloPage,
    ContactDetailsPage,
    ContactCardPage,
    NewsCardPage,
    NewsPage,
    NewsDetailsPage,
    MessaggiPage,
    MessaggiDetailsPage,
    MessaggiCardPage,
    HomeMessPage,
    MessaggiNuovoPage,
    MessaggiImportantiPage,
    MessaggiUscitaPage,
    MessaggiCestinoPage,
    CircolariPage,
    CircolariCardPage,
    CircolariDetailsPage,
    DocumentalePage,
    DocumentaleCategoriePage,
    DocumentaleDetailsPage,
    DocumentaleListaPage,
    ListObjectPage,
    BachecaCardPage,
    BachecaPage,
    BachecaNuovoPage,
    BachecaPreferitiPage,
    BachecaMieiPage,
    BachecaDetailsPage
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
