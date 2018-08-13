import { ContactService } from './../../services/contact/contact.service';
import { Contact } from './../../models/contact/contact.namespace';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ContactDetailsPage } from '../contact-details/contact-details';
import { ErrorService } from '../../services/shared/error.service';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage implements OnInit, OnDestroy{

  contacts: Contact.ContactDataMin[] = [];
  groupedContacts = [];
  clonedContacts = [];
  private subscrition;

  constructor(public navCtrl: NavController, private conService: ContactService, private platform: Platform,
    private err : ErrorService) {
    
  }

  ngOnInit(){
    this.contacts = [];  
    this.subscrition = this.conService.contactsList$.subscribe((val)=>{
      console.log(val);
      console.log("sono nel costruttore di contact page");
      if (val != null){
        if (val.ErrorMessage.msg_code == 0){
          this.contacts = val.l_dipendenti;
          this.clonedContacts  = Object.assign([], this.contacts);
          this.groupContacts(this.contacts);
          console.log(this.contacts);
        }else{
          alert("errore recupero della risorsa");
          this.err.sendError(val.ErrorMessage);
        }
      }else{
        console.log("errore in contacts service");
      }
    })
    this.conService.GetContacts("X");
  }

  ngOnDestroy(){
    this.subscrition.unsubscribe();
  }

  back(){
    this.navCtrl.pop();
  }

  goToDetails(contact){
    this.navCtrl.push(ContactDetailsPage , {contact : contact});
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.contacts = [];
    this.contacts  = Object.assign([], this.clonedContacts );
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.contacts = this.contacts.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1
                || item.cognome.toLowerCase().indexOf(val.toLowerCase()) > -1
                );
      })
    }
    this.groupedContacts = [];
    this.groupContacts(this.contacts);
  }

  groupContacts(contacts){
    let sortedContacts = contacts.sort((n1,n2) =>{
      if (n1.cognome > n2.cognome) return 1;
      if (n1.cognome < n2.cognome) return -1;
      return 0;
    });
    let currentLetter = false;
    let currentContacts = [];

    sortedContacts.forEach((val, index) => {
        let value = val.cognome;
        if(value.charAt(0) != currentLetter){

            currentLetter = value.charAt(0);

            let newGroup = {
                letter: currentLetter,
                contacts: []
            };

            currentContacts = newGroup.contacts;
            this.groupedContacts.push(newGroup);

        }

        currentContacts.push(val);

    });

}
}
