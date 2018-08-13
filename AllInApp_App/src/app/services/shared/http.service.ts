import { News } from './../../models/news/news.namespace';
import { Http } from './../../models/shared/http.namespace';

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { Login } from "../../models/login/login.namespace";
import { Contact } from "../../models/contact/contact.namespace";
import { Messaggi } from '../../models/messaggi/messaggi.namespace';
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

    public getContactList(token: string, attivo: string ) : Observable<Contact.ContactList>{
        let url = "http://allinappws.mesys.it/services/get_elenco_dipendenti/"+token +"/"+attivo
        return this.http.get<Contact.ContactList>(url);     
    }

    public getNewsList(token : string, from : string, to : string , lette : string) : Observable<News.NewsList>{
        let url = "http://allinappws.mesys.it/services/get_elenco_news/"+ token +"/"+from+"/"+to +"/"+ lette;
        console.log(url);
        return this.http.get<News.NewsList>(url);
    }

    public setReadNews (token : string , key: number): Observable<News.NewsResult>{
        let url = "http://allinappws.mesys.it/services/set_read_news/"+token +"/"+key+"/";
        console.log(url);
        return this.http.get<News.NewsResult>(url);
    }

    public getMessaggeList(token : string, from : string, to : string , tipo : string):Observable<Messaggi.MessaggiList>{
        let url = "http://allinappws.mesys.it/services/get_elenco_messaggi/"+ token +"/"+from+"/"+to +"/"+ tipo;
        console.log(url);
        return this.http.get<Messaggi.MessaggiList>(url);
    }

    public setStarMessage (token : string , key: number, stato: string): Observable<Messaggi.MessaggioResult>{
        let url = "http://allinappws.mesys.it/services/set_star_message/"+ token +"/"+key +"/"+stato;
        console.log(url);
        return this.http.get<Messaggi.MessaggioResult>(url);
    }

    public setDeleteMessage (token : string , key: number): Observable<Messaggi.MessaggioResult>{
        let url = "http://allinappws.mesys.it/services/set_delete_message/"+ token +"/"+key;
        console.log(url);
        return this.http.get<Messaggi.MessaggioResult>(url);
    }

    public deleteMessage (mess): Observable<Messaggi.MessaggioResult>{
        let url = "http://allinappws.mesys.it/services/del_message/";
        console.log(url);
        return this.http.post<Messaggi.MessaggioResult>(url, mess);
    }

    public sendMessage(token : string, mess: Messaggi.BustaMessaggio){
        let url = "http://allinappws.mesys.it/services/put_message";
        console.log(url);
        console.log (mess);
        return this.http.post<Messaggi.MessaggioResult>(url, mess);
    }
}