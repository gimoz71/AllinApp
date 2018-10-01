

import { Login } from './../../models/login/login.namespace';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { StoreService } from '../store/store.service';
import { Subject } from 'rxjs/Subject';
import { Injectable, OnInit } from "@angular/core";
import { Contact } from "../../models/contact/contact.namespace";
import { User } from "../../models/user/user.namespace";
import * as Rx from "rxjs/Rx";

@Injectable()
export class ContactService implements OnInit{

    private token : string; 
    private lc : Contact.ContactList;
    private contactsList : Subject<Contact.ContactList> = new Subject<Contact.ContactList>();
    public contactsList$ = this.contactsList.asObservable();

    private cd : Contact.ContactDataFull;
    private contactFull : Subject<Contact.ContactDataFull> = new Subject<Contact.ContactDataFull>();
    public contactsFull$ = this.contactFull.asObservable();

    private attivo = "X";
    private subscription ;
    private subscriptionFull;

    constructor(private http: HttpClient,private store: StoreService ) {
        this.lc = null;
    }
    
    ngOnInit(){
        
    }
    
    public GetContacts(attivo) {
       /** let list: Contact.ContactDataMin[] = [
           {username: "Ugo Capeto", ruoloAziendale: "Re dei Franchi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/King_Hugh_Capet.jpg/120px-King_Hugh_Capet.jpg"},
          {username: "Pipino il breve", ruoloAziendale: "Re dei Franchi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Amiel_-_Pepin_the_Short.jpg/120px-Amiel_-_Pepin_the_Short.jpg"},
         {username: "Carlo Magno", ruoloAziendale: "Re dei Franchi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Charlemagne-by-Durer.jpg/120px-Charlemagne-by-Durer.jpg"}, 
           {username: "Carlo Martello", ruoloAziendale: "Re dei Franchi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Charles_Martel_01.jpg/120px-Charles_Martel_01.jpg"}, 
           {username: "Ludovico il Pio", ruoloAziendale: "Re dei Franchi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Louis_le_Pieux.png/120px-Louis_le_Pieux.png"}, 
           {username: "Oddone", ruoloAziendale: "conte di Parigi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/5/58/Eudes_Ier_de_France.jpg"}, 
           {username: "Rodolfo", ruoloAziendale: "duca di Borgogna", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Rudolph_of_France.jpg/110px-Rudolph_of_France.jpg"}, 
          {username: "Filippo I il giusto", ruoloAziendale: "Re dei Franchi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Filip_i.jpg/120px-Filip_i.jpg"},             
      ];**/
       /** this.attivo = attivo;
        this.subscription = this.store.userData$.subscribe((val : Login.Token) =>{
            this.token = val.token_value;
            let url = "http://allinappws.mesys.it/services/get_elenco_dipendenti/"+ this.token +"/"+this.attivo;
            this.http.get<Contact.ContactList>(url).subscribe((val)=>{
                    this.lc = val;
                    this.contactsList.next(this.lc);    
                }
                );
            this.subscription.unsubscribe();
            }
        );
        this.store.getUserData();**/

        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token :Login.Token)=>{
                    let url = "http://allinappws.mesys.it/services/get_elenco_dipendenti/"+ token.token_value +"/"+ attivo;
                    console.log(url);
                    let s = this.http.get<Contact.ContactList>(url).subscribe(
                        (r : Contact.ContactList)=>{
                            if (r.ErrorMessage.msg_code==0){
                                resolve(r.l_dipendenti);
                            }else{
                                reject(r.ErrorMessage);
                            }
                            
                            s.unsubscribe();
                        }  
                    )
                }
            )
            
        });
    }

    public GetContactDetails(key : number){
/**        let list: Contact.ContactDataFull[] = [
            {username : "Ugo Capeto", ruoloAziendale : "Re dei Franchi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/King_Hugh_Capet.jpg/120px-King_Hugh_Capet.jpg", mansione : "re", 
            telefono:"8909844773", email: "ugo@capeto.it", nInterno: 1},
            {username : "Pipino il breve", ruoloAziendale : "Re dei Franchi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Amiel_-_Pepin_the_Short.jpg/120px-Amiel_-_Pepin_the_Short.jpg", mansione : "re", 
            telefono:"890938773", email: "pipino@capeto.it", nInterno: 2},
            {username : "Carlo Magno", ruoloAziendale : "Re dei Franchi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Charlemagne-by-Durer.jpg/120px-Charlemagne-by-Durer.jpg", mansione : "re", 
            telefono:"8911098773", email: "carlo@capeto.it", nInterno: 3},
            {username : "Carlo Martello", ruoloAziendale : "Re dei Franchi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Charles_Martel_01.jpg/120px-Charles_Martel_01.jpg", mansione : "re", 
            telefono:"8339098773", email: "carlo@capeto.it", nInterno: 4},
            {username : "Ludovico il Pio", ruoloAziendale : "Re dei Franchi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Louis_le_Pieux.png/120px-Louis_le_Pieux.png", mansione : "re", 
            telefono:"8909128773", email: "ludo@capeto.it", nInterno: 5},
            {username : "Oddone", ruoloAziendale : "conte di Parigi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/5/58/Eudes_Ier_de_France.jpg", mansione : "conte", 
            telefono:"89096128773", email: "oddone@capeto.it", nInterno: 6},
            {username : "Rodolfo", ruoloAziendale : "duca di Borgogna", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Rudolph_of_France.jpg/110px-Rudolph_of_France.jpg", mansione : "duca", 
            telefono:"8909128773", email: "ludo@capeto.it", nInterno: 7},
            {username : "Filippo I il giusto", ruoloAziendale : "Re dei Franchi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Filip_i.jpg/120px-Filip_i.jpg", mansione : "re", 
            telefono:"89096128773", email: "oddone@capeto.it", nInterno: 8}
        ]**/
        /**let find : Contact.ContactDataFull ={
            username : "", ruoloAziendale : "", avatarUrl: "", mansione : "", 
            telefono:"", email: "", nInterno: 0
        };
        list.forEach( (c)=>{
            if (c.username  == con.username){
                find = c;
            }
        })
        return find;**/
        /**console.log("sono in get contacts details");
        this.subscriptionFull = this.store.userData$.subscribe((val : Login.Token) =>{
            if (key == -1) key = val.token_dipendente_key ;
            this.token = val.token_value;
            let url = "http://allinappws.mesys.it/services/get_scheda_dipendente/"+ this.token +"/"+ key;
            console.log(url);
            console.log (val);
            this.http.get<Contact.ContactDataFull>(url).subscribe((val)=>{
                    this.cd = val;
                    this.contactFull.next(this.cd);    
                }
                );
            this.subscriptionFull.unsubscribe();
            }
        );
        this.store.getUserData();**/

        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token :Login.Token)=>{
                    if (key == -1) key = token.token_dipendente_key ;
                    let url = "http://allinappws.mesys.it/services/get_scheda_dipendente/"+ token.token_value+"/"+ key;
                    console.log(url);
                    let s = this.http.get<Contact.ContactDataFull>(url).subscribe(
                        (r : Contact.ContactDataFull)=>{
                            if (r.ErrorMessage.msg_code==0){
                                resolve(r.dipendente);
                            }else{
                                reject(r.ErrorMessage);
                            }
                            
                            s.unsubscribe();
                        }  
                    )
                }
            )
            
        });
    }

}