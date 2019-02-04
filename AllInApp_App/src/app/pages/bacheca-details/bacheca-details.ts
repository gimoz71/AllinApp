import { BachecaNuovoPage } from './../bacheca-nuovo/bacheca-nuovo';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';
import { Bacheca } from './../../models/bacheca/bacheca.namespace';
import { StoreService } from './../../services/store/store.service';
import { HttpService } from './../../services/shared/http.service';
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';

import { OnInit, Component } from '@angular/core';

import { Module } from '../../models/modules/modules.namespace';
import { Login } from '../../models/login/login.namespace';




@Component({
  selector: 'bacheca-details',
  templateUrl: 'bacheca-details.html'
})

export class BachecaDetailsPage implements OnInit {

  public bacheca : Bacheca.BachecaElem;
  color : string;
  icon : string;
  mio : boolean;
  stato : string;

  imageURI:any;
  imageURL : any;

  constructor(private navCtrl : NavController, private navParams: NavParams, private http: HttpService,
    private alertCtrl: AlertController, private store:  StoreService, private callNumber: CallNumber,
    private emailComposer: EmailComposer , private camera: Camera, public actionSheetCtrl: ActionSheetController,
      ) {
          
  }

  ngOnInit(){
    this.mio = false;
    this.stato = "N";
      this.http.getModules().then(
        (modules : Module.ModuleElem[])=>{
          console.log(modules);
          for (let i = 0 ; i < modules.length ; i++){
            if (modules[i].tab_moduli_cod == 2){
              this.color = modules[i].tab_moduli_colore;
              this.icon = modules[i].tab_moduli_icona;
            }
          }
        },
        (error)=>{
          console.log(error);
        }
      )

    this.bacheca =this.navParams.get('bacheca');

    this.store.getUserDataPromise().then((val : Login.Token)=>{
      if (this.bacheca.dipendenti_key == val.token_dipendente_key){
        this.mio = true;
      }
    });
  }

  back(){
    this.navCtrl.pop();
  }

  presentConfirmEmail() {
    let alert = this.alertCtrl.create({
      title: 'Conferma invio e-mail',
      message: 'Vuoi inviare un\'e-mail a ' + this.bacheca.dp_nome
        + " " + this.bacheca.dp_cognome +'?',
      buttons: [
        {
          text: 'Indietro',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Conferma',
          handler: () => {
            this.email();
          }
        }
      ]
    });
    alert.present();
  }

  presentConfirmCall() {
    let alert = this.alertCtrl.create({
      title: 'Conferma chiamata',
      message: 'Vuoi chiamare ' + this.bacheca.dp_nome
      + " " + this.bacheca.dp_cognome +'?',
      buttons: [
        {
          text: 'Indietro',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Conferma',
          handler: () => {
            this.call();
          }
        }
      ]
    });
    alert.present();
  }

  call(){
    this.callNumber.callNumber(this.bacheca.an_telefono, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  email(){
     let email = {
      to: this.bacheca.an_email,
    };
    this.emailComposer.open(email);
  }

  public setStato (s){
    this.http.setStatoAnnuncio(this.bacheca.da_dipendenti_key,s).then(
      (r)=>{
        this.stato = s; 
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modifica immagine',
      buttons: [
        {
          text: 'galleria',
          handler: () => {
            this.getPicture("gallery");
          }
        },
        {
          text: 'fotocamera',
          handler: () => {
            this.getPicture("camera");
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  getPicture(mode){
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    if (mode == "camera"){
      options= {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        sourceType: this.camera.PictureSourceType.CAMERA
      }
    }
  
    this.camera.getPicture(options).then((imageData) => {

        this.imageURI = imageData;
        this.http.imgAnnuncio(this.bacheca.annuncio_key, "JPEG",this.imageURI ).then(
          (val)=>{
            console.log(val);
            this.load(this.bacheca.annuncio_key);
            alert ("immagine inserita correttamente");
          },
          (err)=>{
            alert("errore inserimento immagine")
            console.log(err)
          }
        )
      }, (err) => {
        console.log(err);
      }); 
  }

  public goToNuovoAnnuncio(){
    this.navCtrl.push(BachecaNuovoPage, {val: this.bacheca});
  }

  public load (key){
    this.http.getSchedaAnnuncio(key).then(
      (val : Bacheca.BachecaElem)=>{
        this.bacheca = val;
      }
    )
  }
}
  