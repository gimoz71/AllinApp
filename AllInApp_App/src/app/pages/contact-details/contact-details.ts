import { HttpService } from './../../services/shared/http.service';
import { OnInit, OnDestroy } from '@angular/core';
import { ContactService } from './../../services/contact/contact.service';
import { Contact } from './../../models/contact/contact.namespace';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
import { AlertController } from 'ionic-angular';
import { Module } from '../../models/modules/modules.namespace';

@Component({
  selector: 'page-contact-details',
  templateUrl: 'contact-details.html'
})
export class ContactDetailsPage implements OnInit, OnDestroy{

  message : string;
  contactMin : Contact.ContactDataMin;
  contact : Contact.ContactDataFull;
  color : string;
  icon : string;

  constructor(private navCtrl: NavController, private conService: ContactService, 
    private navParams: NavParams, private callNumber: CallNumber,
    private emailComposer: EmailComposer, private alertCtrl: AlertController, platform: Platform,
    private http: HttpService) {
        
  }

  ngOnInit(){
    this.http.getModules().then(
      (modules : Module.ModuleElem[])=>{
        console.log(modules);
        for (let i = 0 ; i < modules.length ; i++){
          if (modules[i].tab_moduli_cod == 7){
            this.color = modules[i].tab_moduli_colore;
            this.icon = modules[i].tab_moduli_icona;
          }
        }
      },
      (error)=>{
        console.log(error);
      }
    )
      this.contact = new Contact.ContactDataFull();
      this.contact.dipendente = new Contact.Dipendente();
      this.contactMin =this.navParams.get('contact');
      if (this.contactMin) {
        this.message = 'utente trovato ' + this.contactMin.nome;

        this.conService.contactsFull$.subscribe((val)=>{
          console.log(val);
            if (val != null){
              this.contact = val;
            }else{
              alert("errore recupero risorsa");
            }
          })
        this.conService.GetContactDetails(this.contactMin.dipendenti_key);
      } else {
        this.message = 'utente non trovato';
      }
  }

  ngOnDestroy(){

  }

  back(){
    this.navCtrl.pop();
  }

  call(){
    this.callNumber.callNumber(this.contact.dipendente.telefono, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  email(){
     let email = {
      to: this.contact.dipendente.email,
    };
    this.emailComposer.open(email);
  }

  presentConfirmEmail() {
    let alert = this.alertCtrl.create({
      title: 'Conferma invio e-mail',
      message: 'Vuoi inviare un\'e-mail a ' + this.contact.dipendente.nome
        + " " + this.contact.dipendente.cognome +'?',
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
      message: 'Vuoi chiamare ' + this.contact.dipendente.nome
      + " " + this.contact.dipendente.cognome +'?',
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
}