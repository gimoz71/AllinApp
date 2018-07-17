import { Http } from './../../models/shared/http.namespace';

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { Login } from "../../models/login/login.namespace";
import { Contact } from "../../models/contact/contact.namespace";
//SERVICE NON UTILIZZATO
@Injectable()
export class HttpService{

    constructor(private http: HttpClient){}

    public getToken(url: string) : Observable<Login.Token>{
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Login.Token>(url, { headers: headers });
    }
    
    public get(url: string) : Observable<Http.HttpResponse>{
        return this.http.get<Http.HttpResponse>(url);
    }

    public passwordChange(user : string ,old : string, newp : string ){
        return
    }

    public getContactList(token: string, attivo: string ) : Observable<Contact.ContactList>{
        let url = "http://allinappws.mesys.it/services/get_elenco_dipendenti/"+token +"/"+attivo
        return this.http.get<Contact.ContactList>(url);     
    }
}