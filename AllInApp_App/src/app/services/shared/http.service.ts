import { StoreService } from './../store/store.service';
import { News } from './../../models/news/news.namespace';
import { Http } from './../../models/shared/http.namespace';

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { Login } from "../../models/login/login.namespace";
import { Contact } from "../../models/contact/contact.namespace";
import { Messaggi } from '../../models/messaggi/messaggi.namespace';
import { Comunicazione } from '../../models/comunicazione/comunicazione.namespace';
import { Documentale } from '../../models/documentale/documentale.namespace';
import { Module } from '../../models/modules/modules.namespace';
//SERVICE NON UTILIZZATO
@Injectable()
export class HttpService{

    constructor(private http: HttpClient, private store : StoreService){}

    public getToken(url: string) : Observable<Login.Token>{
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Login.Token>(url, { headers: headers });
    }
    
    public get(url: string) : Observable<Http.HttpResponse>{
        return this.http.get<Http.HttpResponse>(url);
    }

    public getNewsList(from : string, to : string , lette : string) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token :Login.Token)=>{
                    let url = "http://allinappws.mesys.it/services/get_elenco_news/"+ token.token_value +"/"+from+"/"+to +"/"+ lette;
                    console.log(url);
                    let s = this.http.get<News.NewsList>(url).subscribe(
                        (r : News.NewsList)=>{
                            if (r.ErrorMessage.msg_code==0){
                                resolve(r.l_lista_news);
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
    /**public getNewsList(token : string, from : string, to : string , lette : string) : Observable<News.NewsList>{
        let url = "http://allinappws.mesys.it/services/get_elenco_news/"+ token +"/"+from+"/"+to +"/"+ lette;
        console.log(url);
        return this.http.get<News.NewsList>(url);
    }*/

    public getPublicNews(key : string) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token :Login.Token)=>{
                    let url = "http://server/services/get_public_news/{token}/{key}/"+ token.token_value +"/" + key + "/";
                    console.log(url);
                    let s = this.http.get<News.NewsSingleResult>(url).subscribe(
                        (r : News.NewsSingleResult)=>{
                            if (r.ErrorMessage.msg_code==0){
                                resolve(r.news);
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

   /** public setReadNews (token : string , key: number): Observable<News.NewsResult>{
        let url = "http://allinappws.mesys.it/services/set_read_news/"+token +"/"+key+"/";
        console.log(url);
        return this.http.get<News.NewsResult>(url);
    }**/

    public setReadNews (key : number) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token :Login.Token)=>{
                    let url = "http://allinappws.mesys.it/services/set_read_news/"+ token.token_value +"/" + key + "/";
                    console.log(url);
                    let s = this.http.get<News.NewsResult>(url).subscribe(
                        (r : News.NewsResult)=>{
                            if (r.ErrorMessage.msg_code==0){
                                resolve(r.result);
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

   /**public getMessaggeList(token : string, from : string, to : string , tipo : string):Observable<Messaggi.MessaggiList>{
        let url = "http://allinappws.mesys.it/services/get_elenco_messaggi/"+ token +"/"+from+"/"+to +"/"+ tipo;
        console.log(url);
        return this.http.get<Messaggi.MessaggiList>(url);
    }**/

    public getMessaggeList( from : string, to : string , tipo : string) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token :Login.Token)=>{
                    let url = "http://allinappws.mesys.it/services/get_elenco_messaggi/"+ token.token_value +"/"+from+"/"+to +"/"+ tipo;
                    console.log(url);
                    let s = this.http.get<Messaggi.MessaggiList>(url).subscribe(
                        (r : Messaggi.MessaggiList)=>{
                            if (r.ErrorMessage.msg_code==0){
                                resolve(r.l_lista_messaggi);
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

    /**public getMessagge(token : string, key : number):Observable<Messaggi.BustaMessaggio>{
        let url = "http://allinappws.mesys.it/services/get_messaggio/"+ token +"/"+key;
        console.log(url);
        return this.http.get<Messaggi.BustaMessaggio>(url);
    }*/

    public getMessagge(key : number) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token :Login.Token)=>{
                    let url = "http://allinappws.mesys.it/services/get_messaggio/"+ token.token_value +"/"+key;
                    console.log(url);
                    let s = this.http.get<Messaggi.BustaMessaggio>(url).subscribe(
                        (r : Messaggi.BustaMessaggio)=>{
                            if (r.ErrorMessage.msg_code==0){
                                resolve(r);
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

    /**public setStarMessage (token : string , key: number, stato: string): Observable<Messaggi.MessaggioResult>{
        let url = "http://allinappws.mesys.it/services/set_star_message/"+ token +"/"+key +"/"+stato;
        console.log(url);
        return this.http.get<Messaggi.MessaggioResult>(url);
    }*/

    public setStarMessage ( key: number, stato: string) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token :Login.Token)=>{
                    let url = "http://allinappws.mesys.it/services/set_star_message/"+ token.token_value +"/"+key +"/"+stato;
                    console.log(url);
                    let s = this.http.get<Messaggi.MessaggioResult>(url).subscribe(
                        (r : Messaggi.MessaggioResult)=>{
                            if (r.ErrorMessage.msg_code==0){
                                resolve(r);
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

    /**public setDeleteMessage (token : string , key: number): Observable<Messaggi.MessaggioResult>{
        let url = "http://allinappws.mesys.it/services/set_deleted_message/"+ token +"/"+key;
        console.log(url);
        return this.http.get<Messaggi.MessaggioResult>(url);
    }*/

    public setDeleteMessage (key: number) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token :Login.Token)=>{
                    let url = "http://allinappws.mesys.it/services/set_deleted_message/"+ token.token_value +"/"+key;
                    console.log(url);
                    let s = this.http.get<Messaggi.MessaggioResult>(url).subscribe(
                        (r : Messaggi.MessaggioResult)=>{
                            if (r.ErrorMessage.msg_code==0){
                                resolve(r);
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

    /**public deleteMessage (mess): Observable<Messaggi.MessaggioResult>{
        let url = "http://allinappws.mesys.it/services/del_message/";
        console.log(url);
        return this.http.post<Messaggi.MessaggioResult>(url, mess);
    }*/

    public deleteMessage (mess){
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token :Login.Token)=>{
                    let url = "http://allinappws.mesys.it/services/del_message/";
                    console.log(url);
                    let s = this.http.post<Messaggi.MessaggioResult>(url, mess).subscribe(
                        (r : Messaggi.MessaggioResult)=>{
                            if (r.ErrorMessage.msg_code==0){
                                resolve(r);
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


    /**public sendMessage(token : string, mess: Messaggi.BustaMessaggio){
        let url = "http://allinappws.mesys.it/services/put_message";
        console.log(url);
        console.log (mess);
        return this.http.post<Messaggi.MessaggioResult>(url, mess);
    }*/

    public sendMessage( mess: Messaggi.BustaMessaggio){
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token :Login.Token)=>{
                    let url = "http://allinappws.mesys.it/services/put_message";
                    console.log(url);
                    let s = this.http.post<Messaggi.MessaggioResult>(url, mess).subscribe(
                        (r : Messaggi.MessaggioResult)=>{
                            if (r.ErrorMessage.msg_code==0){
                                resolve(r);
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

    /**public getComunicazioniElenco (token : string , from : number, to: number, lette : string, tipo : string){
        let url = "http://allinappws.mesys.it/services/get_elenco_comunicazioni/"+ token +"/" + from +
            "/" + to +"/" + lette + "/"+ tipo + "/";
        console.log(url);
        return this.http.get<Comunicazione.ComunicazioniElenco>(url);
    }*/

    public getComunicazioniElenco (from : number, to: number, lette : string, tipo : string){
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token :Login.Token)=>{
                    let url = "http://allinappws.mesys.it/services/get_elenco_comunicazioni/"+ token.token_value +"/" + from +
                        "/" + to +"/" + lette + "/"+ tipo + "/";
                    console.log(url);
                    let s = this.http.get<Comunicazione.ComunicazioniElenco>(url).subscribe(
                        (r : Comunicazione.ComunicazioniElenco)=>{
                            if (r.ErrorMessage.msg_code==0){
                                resolve(r.l_lista_comunicazione);
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

    /**public getComunicazione (token : string , key: number ){
        let url = "http://allinappws.mesys.it/services/get_public_comunicazione/"
        + token + "/" + key + "/";
        console.log(url);
        return this.http.get<Comunicazione.ComunicazioneResult>(url);
    }*/
    public getComunicazione (key: number ){
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token :Login.Token)=>{
                    let url = "http://allinappws.mesys.it/services/get_public_comunicazione/"
                        + token.token_value + "/" + key + "/";
                    console.log(url);
                    let s = this.http.get<Comunicazione.ComunicazioneResult>(url).subscribe(
                        (r : Comunicazione.ComunicazioneResult)=>{
                            if (r.ErrorMessage.msg_code==0){
                                resolve(r.comunicazione);
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

    /**public setReadComunicazione (token : string , key : number){
        let url = "http://allinappws.mesys.it/services/set_read_comunicazione/"
            + token + "/" +  key + "/";
        console.log(url);
        return this.http.get<Comunicazione.Result>(url);
    }*/

    public setReadComunicazione (key : number){
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token :Login.Token)=>{
                    let url = "http://allinappws.mesys.it/services/set_read_comunicazione/"
                        + token.token_value + "/" +  key + "/";
                    console.log(url);
                    let s = this.http.get<Comunicazione.Result>(url).subscribe(
                        (r : Comunicazione.Result)=>{
                            if (r.ErrorMessage.msg_code==0){
                                resolve(r.result);
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

    /**public setDeletedComunicazione (token: string , key: number){
        let url = "http://allinappws.mesys.it/services/set_deleted_comunicazione/" + token + "/" + key +"/";
        console.log(url);
        return this.http.get<Comunicazione.Result>(url);
    }*/
    
    public setDeletedComunicazione (key: number){
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token :Login.Token)=>{
                    let url = "http://allinappws.mesys.it/services/set_deleted_comunicazione/" + token.token_value + "/" + key +"/";
                    console.log(url);
                    let s = this.http.get<Comunicazione.Result>(url).subscribe(
                        (r : Comunicazione.Result)=>{
                            if (r.ErrorMessage.msg_code==0){
                                resolve(r.result);
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

    /**public getElencoTipoDocumenti(token : string){
        let url = "http://allinappws.mesys.it/services/get_elenco_tipo_documenti/" + token;
        console.log(url);
        return this.http.get<Documentale.tipiElenco>(url);
    }*/

    public getElencoTipoDocumenti(){
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token :Login.Token)=>{
                    let url = "http://allinappws.mesys.it/services/get_elenco_tipo_documenti/" + token.token_value;
                    console.log(url);
                    let s = this.http.get<Documentale.tipiElenco>(url).subscribe(
                        (r : Documentale.tipiElenco)=>{
                            if (r.ErrorMessage.msg_code==0){
                                resolve(r.l_lista_tipo_documenti);
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

    /**public getCategorieDocumenti(token: string, categoria : number){
        let url = "http://allinappws.mesys.it/services/get_elenco_categoria_documenti/"+ token+"/"+categoria;
        console.log(url);
        return this.http.get<Documentale.ListaCategorie>(url);
    }*/

    public getCategorieDocumenti(categoria : number){
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token :Login.Token)=>{
                    let url = "http://allinappws.mesys.it/services/get_elenco_categoria_documenti/"+ token.token_value+"/"+categoria;
                    console.log(url);
                    let s = this.http.get<Documentale.ListaCategorie>(url).subscribe(
                        (r : Documentale.ListaCategorie)=>{
                            if (r.ErrorMessage.msg_code==0){
                                resolve(r.l_lista_categoria_documenti);
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

    /**public getElencoDocumenti (token : string, from : number, to : number, tipo : number, categoria : number){
        let url = "http://allinappws.mesys.it/services/get_elenco_documenti/"+token+"/"+from +"/"+ to+"/"+
         tipo+ "/"+ categoria;
         console.log(url);
         return this.http.get<Documentale.ListaDocumenti>(url);
    }*/

    public getElencoDocumenti (from : number, to : number, tipo : number, categoria : number){
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token :Login.Token)=>{
                    let url = "http://allinappws.mesys.it/services/get_elenco_documenti/"+token.token_value+"/"+from +"/"+ to+"/"+
                    tipo+ "/"+ categoria;
                    console.log(url);
                    let s = this.http.get<Documentale.ListaDocumenti>(url).subscribe(
                        (r : Documentale.ListaDocumenti)=>{
                            if (r.ErrorMessage.msg_code==0){
                                resolve(r.l_lista_documenti);
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

    /**public getDocumento (token : string , key : number){
        let url = "http://allinappws.mesys.it/services/get_public_documento/" + token + "/"+ key + "/";
        console.log (url);
        return this.http.get<Documentale.DocumentoResult>(url);
    }*/

    public getDocumento (key : number){
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token :Login.Token)=>{
                    let url = "http://allinappws.mesys.it/services/get_public_documento/" + token.token_value + "/"+ key + "/";
                    console.log(url);
                    let s = this.http.get<Documentale.DocumentoResult>(url).subscribe(
                        (r : Documentale.DocumentoResult)=>{
                            if (r.ErrorMessage.msg_code==0){
                                resolve(r.documento);
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

    public getModules(){
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token :Login.Token)=>{
                    let url = "http://allinappws.mesys.it/services/get_modules/" + token.token_value;
                    console.log(url);
                    let s = this.http.get<Module.ModuleResult>(url).subscribe(
                        (r : Module.ModuleResult)=>{
                            if (r.ErrorMessage.msg_code==0){
                                resolve(r.l_moduli);
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