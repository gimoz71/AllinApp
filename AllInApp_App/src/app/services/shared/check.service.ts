import { Observable } from 'rxjs/Observable';
import { Login} from './../../models/login/login.namespace';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable()
export class CheckService{

    constructor(private http: HttpClient){}
    
    /**public sendError(url: string) : Observable<Error.ErrorResponse>{
        return this.http.get<Error.ErrorResponse>(url);
    }*/
    public checkToken (token : string): Observable<Login.Token>{
       return this.http.get<Login.Token>("http://allinappws.mesys.it/services/checktoken/"+token);
    }
}