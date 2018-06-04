import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Http } from "../../models/shared/http.namespace";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';

@Injectable()
export class HttpService{

    private 

    constructor(private http: HttpClient){}

    public get(url: string) : Observable<Http.HttpResponse>{
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        let httpResponse: Http.HttpResponse = new Http.HttpResponse();
        httpResponse.Success = false;
        httpResponse.Message = "ok";
        httpResponse.Data = "";


        return Observable.of(httpResponse);

        //return this.http.get<Http.HttpResponse>(url, { headers: headers });
    }
}