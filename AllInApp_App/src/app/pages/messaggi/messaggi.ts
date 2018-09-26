import { MessaggiUscitaPage } from './../messaggi-uscita/messaggi-uscita';
import { MessaggiCestinoPage } from './../messaggi-cestino/messaggi-cestino';

import { StoreService } from './../../services/store/store.service';
import { HttpService } from './../../services/shared/http.service';
import { MessaggiNuovoPage } from './../messaggi-nuovo/messaggi-nuovo';
import { MessaggiDetailsPage } from './../messaggi-details/messaggi-details';
import { NavParams, NavController, MenuController, AlertController } from 'ionic-angular';
import { OnInit, Component, Input } from '@angular/core';
import { HomeElement } from '../../models/home-element/home-element.namespace';
import { News } from '../../models/news/news.namespace';
import { NewsDetailsPage } from '../news-details/news-details';
import { Messaggi } from '../../models/messaggi/messaggi.namespace';
import { Login } from '../../models/login/login.namespace';
import { MessaggiImportantiPage } from '../messaggi-importanti/messaggi-importanti';


@Component({
  selector: 'messaggi',
  templateUrl: 'messaggi.html'
})
export class MessaggiPage implements OnInit{

  public messFull : Messaggi.MessaggiElem[];
  
  constructor(private navCtrl : NavController,private navParams: NavParams, public menuCtrl: MenuController,
    private store: StoreService, private http : HttpService, private alertCtrl: AlertController) {
    
  }

  public ngOnInit() : void {
    this.messFull =this.navParams.get('messFull');
    console.log(this.messFull);
    this.menuCtrl.enable(true, 'messaggi');
    let s = this.store.userData$.subscribe((val)=>{
      let s1 = this.http.getMessaggeList(val.token_value,"0","0","I").subscribe(
          (res)=>{
            console.log(res);
            if (res.ErrorMessage.msg_code == 0){
              this.messFull = res.l_lista_messaggi;
            }else{
              console.log("errore ricezione News");
            }
            s1.unsubscribe();
          }
        );
        s.unsubscribe();
       }
    );
    this.store.getUserData();
  }

  back(){
    this.menuCtrl.enable(false, 'messaggi');
    this.menuCtrl.enable(true, 'home');
    this.navCtrl.pop();
  }
  
  public goToDetails(mess){
    this.navCtrl.push(MessaggiDetailsPage, {mess : mess});
  }

  goTonuovoMessaggio(){
    this.navCtrl.push(MessaggiNuovoPage);
  }
  goToUscitaMessaggi(){
    this.navCtrl.push(MessaggiUscitaPage)
  }
  goToImportantiMessaggi(){
    this.navCtrl.push(MessaggiImportantiPage)
  }
  goToCestinoMessaggio(){
    this.navCtrl.push(MessaggiCestinoPage)
  }

  setStar (mess : Messaggi.MessaggiElem, stato){
      let s = this.store.userData$.subscribe(
        (val: Login.Token)=>{
          let s1 = this.http.setStarMessage(val.token_value,mess.messaggi_key,stato).subscribe(
            (r)=>{
              console.log(r);
              if (r.ErrorMessage.msg_code == 0){
                mess.preferito = stato; 
              }
              s1.unsubscribe();
            }
          );
          s.unsubscribe();
        }
      );
      this.store.getUserData();
  }

  setDelete(mess : Messaggi.MessaggiElem){
    let s = this.store.userData$.subscribe(
      (val: Login.Token)=>{
        let s1 = this.http.setDeleteMessage(val.token_value, mess.messaggi_key).subscribe(
          (r)=>{
            console.log(r);
            s1.unsubscribe();
          }
        );
        s.unsubscribe();
      }
    );
    this.store.getUserData();
  }

  deleteConfirm(mess : Messaggi.MessaggiElem) {
    let alert = this.alertCtrl.create({
      title: 'Conferma',
      message: 'spostare questo messaggio nel cestino?',
      buttons: [
        {
          text: 'indietro',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'ok',
          handler: () => {
            this.setDelete(mess);
          }
        }
      ]
    });
    alert.present();
  }

}
