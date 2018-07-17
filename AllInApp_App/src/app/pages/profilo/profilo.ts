import { FileTransfer } from '@ionic-native/file-transfer';
import { LoginService } from './../../services/login/login.service';
import { CheckService } from './../../services/shared/check.service';
import { StoreService } from './../../services/store/store.service';
import { OnInit } from '@angular/core';
import { ContactService } from './../../services/contact/contact.service';
import { Contact } from './../../models/contact/contact.namespace';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController, ToastController, ActionSheetController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';


@Component({
  selector: 'page-profilo',
  templateUrl: 'profilo.html'
})
export class ProfiloPage implements OnInit {

  user : Contact.ContactDataFull;
  /**user = {
    nome: "Ugo",
    cognome: "Capeto",
    ruolo : "Re",
    ufficio : "Sala del trono",
    responsabile: "popolo francese",
    sedeAssunzione: "Francia",
    sedeOperativa: "Parigi",
    urlAvatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/King_Hugh_Capet.jpg/120px-King_Hugh_Capet.jpg"
  }**/

  imageURI:any;
  imageFileName:any;
  
  constructor(private navCtrl: NavController, private alertCtrl: AlertController,
    private login : LoginService, private conService : ContactService,  private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    private  store : StoreService, public actionSheetCtrl: ActionSheetController,
    private navController : NavController) {
          
  }

  ngOnInit(){
    this.user = new Contact.ContactDataFull();
    this.user.dipendente = new Contact.Dipendente();
    this.conService.contactsFull$.subscribe((val)=>{
        if (val != null){
          this.user = val;
        }else{
          alert("errore recupero risorsa");
        }
      })
    this.conService.GetContactDetails(-1);
    }

  back(){
    this.navCtrl.pop();
  }
  
  
 presentActionSheet() {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'Modifica avatar',
    buttons: [
      {
        text: 'galleria',
        handler: () => {
          this.changeAvatar("gallery");
        }
      },
      {
        text: 'fotocamera',
        handler: () => {
          this.changeAvatar("camera");
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

  changeAvatar(mode){
    console.log("sono in change avatar 1");
    
      console.log("sono in change avatar 2");
      let options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }

      if (mode == "camera"){
        options= {
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          sourceType: this.camera.PictureSourceType.CAMERA
        }
      }
    
    this.camera.getPicture(options).then((imageData) => {

        this.imageURI = imageData;

          let s = this.store.userData$.subscribe((val)=>{
            s.unsubscribe();
            let s1 = this.login.changeAvatar(this.imageURI, val).subscribe((r)=>{
              s1.unsubscribe();
              console.log(r);
              if (r.ErrorMessage.msg_code==0){
                alert("avatar modificato correttamente");
                this.navController.pop();
                this.navController.push(ProfiloPage);
              }else{
                alert ("errore modifica avatar")
              }
            });
          })
          this.store.getUserData();
      }, (err) => {
        console.log(err);
      });
    
  }  

  changePassword() {
    const prompt = this.alertCtrl.create({
      title: 'Cambio Password',
      message: "inserisci i dati",
      inputs: [
        {
          name: 'old',
          placeholder: 'password corrente'
        },
        {
          name: 'new',
          placeholder: 'Nuova password'
        },
        {
          name: 'repeat',
          placeholder: 'reinserisci nuova passoword'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: 'Send',
          handler: data => {
            if (this.checkPassword(data.old) == true){
              if (data.new.length > 5){
                if (data.new == data.repeat ){
                  let s = this.store.userData$.subscribe((val)=>{
                    s.unsubscribe();
                    let s1 =this.login.changePassword(val, data.old, data.new , data.repeat).subscribe((r)=>{
                      s1.unsubscribe();
                      if (r.ErrorMessage.msg_code == 0){
                        alert("password cambiata correttamente");
                      }else{
                        alert("errore modifica password");
                      }
                    });
                  })
                  this.store.getUserData();
                }else{
                  alert("le password non corrispondono");
                }
              }else{
                alert("la password deve essere più lunga di 5 caratteri");
              }
            }else{
              alert("password corrente non corretta");
            }
          }
        }
      ],
      enableBackdropDismiss: false
    });
    prompt.present();
  }

  checkPassword(old): boolean{
    return true;
  }
}