import { BachecaDetailsPage } from './../bacheca-details/bacheca-details';
import { StoreService } from './../../services/store/store.service';
import { Login } from './../../models/login/login.namespace';
import { BachecaNuovoPage } from './../bacheca-nuovo/bacheca-nuovo';
import { HttpService } from './../../services/shared/http.service';
import { NavParams, NavController, AlertController } from 'ionic-angular';
import { OnInit, Component, Input } from '@angular/core';
import { HomeElement } from '../../models/home-element/home-element.namespace';
import { Bacheca } from '../../models/bacheca/bacheca.namespace';
import { Module } from '../../models/modules/modules.namespace';


@Component({
  selector: 'bacheca-miei',
  templateUrl: 'bacheca-miei.html'
})
export class BachecaMieiPage implements OnInit{

  public bachecaFull : Bacheca.BachecaElem[];
  public clonedBacheca : Bacheca.BachecaElem[];
  public borderColor = "border-blue";
  color : string;
  icon : string;
  
  constructor(private navCtrl : NavController,private navParams: NavParams, private http: HttpService, 
    private store : StoreService, private alertCtrl: AlertController) {
    
  }

  public ngOnInit() : void {
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
    this.http.getMieiAnnunci("0","0").then(
      (val1 : Bacheca.BachecaElem[])=>{
        console.log(val1 );
        this.bachecaFull = val1;
         this.clonedBacheca  = Object.assign([], this.bachecaFull);
      },
      (error)=>{
        console.log(error);
      }
    )
    
  }
  
  getItems(ev) {
    // Reset items back to all of the items
    this.bachecaFull = [];
    this.bachecaFull  = Object.assign([], this.clonedBacheca );
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.bachecaFull = this.bachecaFull.filter((item) => {
        return (item.an_titolo.toLowerCase().indexOf(val.toLowerCase()) > -1
                || item.an_data.toLowerCase().indexOf(val.toLowerCase()) > -1
                );
      })
    }
  }

  back(){
    this.navCtrl.pop();
  }
  
  public goToDetails(bacheca){
    this.navCtrl.push(BachecaDetailsPage, {bacheca : bacheca});
  }

  public goToNuovoAnnuncio(){
      this.navCtrl.push(BachecaNuovoPage);
    }

    public setStar (mess, stato){
      this.http.setPreferitoAnnuncio(mess.annuncio_key,stato).then(
        (r)=>{
          mess.da_preferito = stato; 
        },
        (error)=>{
          console.log(error);
        }
      )
    }

    setDelete(mess : Bacheca.BachecaElem){
      this.store.getUserDataPromise().then((val : Login.Token)=>{
        let annuncio : Bacheca.BachecaRichiestaPut = new Bacheca.BachecaRichiestaPut();
       
        //annuncio.mittente_key = val.token_dipendente_key;
        annuncio.annunci = new Bacheca.BachecaPutElem();
        annuncio.annunci.an_data = mess.an_data;
        annuncio.annunci.an_descrizione = mess.an_descrizione;
        annuncio.annunci.an_email = mess.an_email;
        annuncio.annunci.an_localita = mess.an_localita;
        annuncio.annunci.an_attiva = "";
        annuncio.annunci.an_categoria_annuncio_cod = mess.tab_categoria_annuncio_cod
        annuncio.annunci.an_dipendenti_key = val.token_dipendente_key;
        annuncio.annunci.an_localita = mess.an_localita;
        annuncio.annunci.an_richiesta = mess.an_richiesta;
        annuncio.annunci.an_telefono = mess.an_telefono;
        annuncio.annunci.an_titolo = mess.an_titolo;
        annuncio.annunci.inserito_da = val.token_user;
        annuncio.annunci.inserito_il = mess.an_data;
        annuncio.token = val.token_value;
        this.http.delAnnuncio( annuncio).then(
          (r)=>{
            this.load();
            console.log(r);
            alert("messaggio eliminato correttamente");
          },
          (error)=>{
            ("errore nell'eliminazione")
            console.log(error);
          }
        )
    });
  
      
    }
  
    deleteConfirm(mess : Bacheca.BachecaElem) {
      let alert = this.alertCtrl.create({
        title: 'Conferma',
        message: "eliminare il tuo Annuncio?",
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

    load (){
      this.http.getMieiAnnunci("0","0").then(
        (val1 : Bacheca.BachecaElem[])=>{
          console.log(val1 );
          this.bachecaFull = val1;
           this.clonedBacheca  = Object.assign([], this.bachecaFull);
        },
        (error)=>{
          console.log(error);
        }
      )
    }
}
