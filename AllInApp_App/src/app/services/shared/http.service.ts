import { Http } from './../../models/shared/http.namespace';

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { Login } from "../../models/login/login.namespace";

@Injectable()
export class HttpService{

    constructor(private http: HttpClient){}

    public getToken(url: string) : Observable<Login.ws_Token>{
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Login.ws_Token>(url, { headers: headers });
    }
    
    public get(url: string) : Observable<Http.HttpResponse>{
        return this.http.get<Http.HttpResponse>(url);
    }
}