import { Bacheca} from './../../models/bacheca/bacheca.namespace';
import { HttpService } from './../../services/shared/http.service';
import { HttpClient } from '@angular/common/http';
import { ContactService } from './../../services/contact/contact.service';

import { StoreService } from './../../services/store/store.service';
import { MessaggiDetailsPage } from './../messaggi-details/messaggi-details';
import { NavController, NavParams } from 'ionic-angular';
import { OnInit, Component } from '@angular/core';
import { Messaggi } from '../../models/messaggi/messaggi.namespace';
import { Contact } from '../../models/contact/contact.namespace';
import { Module } from '../../models/modules/modules.namespace';
import { Login } from '../../models/login/login.namespace';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { IonicSelectableComponent } from 'ionic-selectable';


@Component({
  selector: 'bacheca-nuovo',
  templateUrl: 'bacheca-nuovo.html'
})

export class BachecaNuovoPage implements OnInit {

  titolo : string;
  descrizione : string;
  data : string;
  localita : string;
  importo : number;
  email : string;
  telefono : string;
  categorie : Bacheca.BachecaCategoriaElem[];
  categoria :  Bacheca.BachecaCategoriaElem;
  color : string;
  icon : string;
  immagine : string;
  key : number;
  annuncio : Bacheca.BachecaRichiestaPut;
  bachecaElem : Bacheca.BachecaElem;

  constructor(public navCtrl: NavController, private store : StoreService, 
    private http: HttpService,  private navParams: NavParams, private conService : ContactService) {
          
  }

  ngOnInit(){
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
    this.http.getListaCategorieAnnuncio().then((val : Bacheca.BachecaCategoriaElem[])=>{
      this.categorie = val;
      },
      (error)=>{
        alert("errore recupero della risorsa");
      })
      this.annuncio = new Bacheca.BachecaRichiestaPut();
      this.annuncio.annunci = new Bacheca.BachecaPutElem();
      this.categoria = new Bacheca.BachecaCategoriaElem();
      this.bachecaElem  = this.navParams.get('val');
      if (this.bachecaElem != null && this.bachecaElem != undefined){
        console.log(this.annuncio);
        this.data = this.bachecaElem.an_data;
        this.descrizione =  this.bachecaElem.an_descrizione;
        this.email  = this.bachecaElem.an_email;
        this.localita = this.bachecaElem.an_localita;
        this.categoria.tab_categoria_annuncio_cod = this. bachecaElem.tab_categoria_annuncio_cod;
        this.categoria.tab_categoria_annuncio_desc = this.bachecaElem.tab_categoria_annuncio_desc;
        this.importo = this.bachecaElem.an_richiesta;
        this.telefono = this.bachecaElem.an_telefono;
        this.titolo = this.bachecaElem.an_titolo;
        this.immagine = this.bachecaElem.an_immagine;
        this.key = this.bachecaElem.annuncio_key;
      }else{
        this.conService.GetContactDetails(-1).then((val : Contact.Dipendente)=>{
          if (val != null){
            this.email = val.email;
            this.telefono = val.telefono;
          }else{
            alert("errore recupero risorsa");
          }
        })
      }
  }



  filterPorts(ports: Bacheca.BachecaCategoriaElem[], text: string) {
    return ports.filter(port => {
      return port.tab_categoria_annuncio_desc.toLowerCase().indexOf(text) !== -1
    });
  }

  desChange(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let text = event.text.trim().toLowerCase();
    event.component.startSearch();
    console.log(text);
    if (!text || text == "") {
      event.component.items = this.categorie;
      event.component.endSearch();
      return;
    }
      event.component.items = this.filterPorts(this.categorie, text);
      event.component.endSearch();
   }

  public goToDetails(mess){
    this.navCtrl.push(MessaggiDetailsPage, {mess : mess});
  }

  back(){
    this.navCtrl.pop();
  }

  public inviaAnnuncio(){
    this.store.getUserDataPromise().then((val : Login.Token)=>{     
        //annuncio.mittente_key = val.token_dipendente_key;
      
        this.annuncio.annunci.an_data = this.data;
        this.annuncio.annunci.an_descrizione = this.descrizione;
        this.annuncio.annunci.an_email = this.email;
        this.annuncio.annunci.an_localita = this.localita;
        this.annuncio.annunci.an_attiva = "N";
        this.annuncio.annunci.an_categoria_annuncio_cod = this.categoria.tab_categoria_annuncio_cod;
        this.annuncio.annunci.an_dipendenti_key = val.token_dipendente_key;
        this.annuncio.annunci.an_richiesta = this.importo;
        this.annuncio.annunci.an_telefono = this.telefono;
        this.annuncio.annunci.an_titolo = this.titolo;
        this.annuncio.annunci.inserito_da = val.token_user;
        this.annuncio.annunci.inserito_il = new Date().getTime().toString();
        this.annuncio.token = val.token_value;
        this.annuncio.annunci.an_immagine = this.immagine;
        this.annuncio.annunci.annuncio_key = this.key;
        console.log(this.annuncio);
        this.http.putAnnuncio (this.annuncio).then((r :Bacheca.BachecaResult )=>{
          console.log (r);
            if (r.ErrorMessage.msg_code == 0){
              alert ("Annuncio inserito correttamente");
            }else{
              console.log(r);
              alert("errore nell'invio del messaggio");
            }
          });
    });
    this.back();
  }

}
  