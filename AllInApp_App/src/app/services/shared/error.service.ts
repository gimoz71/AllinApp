import { Error} from './../../models/shared/error.namespace';

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { Login } from "../../models/login/login.namespace";

@Injectable()
export class ErrorService{

    constructor(private http: HttpClient){}
    
    /**public sendError(url: string) : Observable<Error.ErrorResponse>{
        return this.http.get<Error.ErrorResponse>(url);
    }*/
    public sendError (data : Error.LogErrore){
        return new Promise((resolve, reject) => {
            let url = "http://server/services/put_error";
            this.http.post(url, data).subscribe((val: Error.Result)=>{
                resolve(val);
            });
        });
        
    }
}