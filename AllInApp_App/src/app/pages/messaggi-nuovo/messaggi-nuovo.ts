
import { HttpService } from './../../services/shared/http.service';
import { HttpClient } from '@angular/common/http';
import { ContactService } from './../../services/contact/contact.service';

import { StoreService } from './../../services/store/store.service';
import { MessaggiDetailsPage } from './../messaggi-details/messaggi-details';
import { NavController } from 'ionic-angular';


import { OnInit, Component } from '@angular/core';
import { Messaggi } from '../../models/messaggi/messaggi.namespace';
import { Contact } from '../../models/contact/contact.namespace';




@Component({
  selector: 'messaggi-nuovo',
  templateUrl: 'messaggi-nuovo.html'
})

export class MessaggiNuovoPage implements OnInit {

  contacts: Contact.ContactDataMin[] = [];
  oggetto ='';
  messaggio = '';
  destinatario : Contact.ContactDataMin;
  nomeDestinatario : string;
  conoscenza : Contact.ContactDataMin;
  nomeConoscenza : string;
  private mess : Messaggi.MessaggiElem;
  constructor(public navCtrl: NavController, private store : StoreService, 
    private conService : ContactService, private http: HttpService) {
          
  }

  ngOnInit(){
    this.mess = new Messaggi.MessaggiElem();
    let s  = this.conService.contactsList$.subscribe((val)=>{
      if (val != null){
        if (val.ErrorMessage.msg_code == 0){
          this.contacts = val.l_dipendenti;
          console.log(this.contacts);
        }else{
          alert("errore recupero della risorsa");
        }
      }else{
        console.log("errore in contacts service");
      }
      s.unsubscribe();
    });
    this.conService.GetContacts("X");
  }

  public goToDetails(mess){
    this.navCtrl.push(MessaggiDetailsPage, {mess : mess});
  }

  back(){
    this.navCtrl.pop();
  }

  public inviaMessaggio(){
    console.log (this.destinatario);
    let s = this.store.userData$.subscribe((val)=>{
      let mit : Contact.ContactDataMin;
      for (let i=0; i< this.contacts.length; i++ ){
        if (this.contacts[i].dipendenti_key == val.token_dipendente_key){
          mit = this.contacts[i]; 
        }
      }
      for (let i=0; i< this.contacts.length; i++ ){
        let s = this.contacts[i].nome + " " + this.contacts[i].cognome;
        if (s  == this.nomeDestinatario){
          this.destinatario = this.contacts[i]; 
        }
      }
      for (let i=0; i< this.contacts.length; i++ ){
        let s = this.contacts[i].nome + " " + this.contacts[i].cognome;
        if (s  == this.nomeConoscenza){
          this.conoscenza = this.contacts[i]; 
        }
      }
      if (mit != null){
        if (this.destinatario != null){
        let busta: Messaggi.BustaMessaggio = new Messaggi.BustaMessaggio();
        let mess : Messaggi.Messaggio = new Messaggi.Messaggio();
        let con : Messaggi.Conoscenza = new Messaggi.Conoscenza();
        
        mess.mittente_key = val.token_dipendente_key;
        mess.destinatario_key = this.destinatario.dipendenti_key;
        mess.data = new Date().getTime().toString();
        mess.soggetto = this.oggetto;
        mess.messaggio = this.messaggio;
        mess.preferito = 'N';
        mess.stato_lettura =  'N';
        //stato_messaggio: string;
        mess.cognome_mit = mit.cognome;
        mess.nome_mit = mit.nome;
        mess.cognome_des = this.destinatario.cognome;
        mess.nome_des = this.destinatario.nome;

        if (this.conoscenza != null){
          con.dipendente_key = this.conoscenza.dipendenti_key;
          con.nominativo = this.conoscenza.nome + " " + this.conoscenza.cognome;
        }

        busta.c_conoscenza = [];
        busta.c_conoscenza.push(con);
        busta.messaggio = mess;
        busta.token = val.token_value;

        let s1 = this.http.sendMessage(val.token_value, busta).subscribe((r)=>{
          console.log (r);
          if (r.ErrorMessage.msg_code == 0){
            alert ("messaggio inviato correttamente");
          }else{
            alert("errore nell'invio del messaggio");
          }
          s1.unsubscribe();
        });
        s.unsubscribe();
      }else{
        alert("errore recupero mittente");
      }
    }else{
      alert("selezionare destinatario");
    }
    });
    this.store.getUserData();
  }

}
  