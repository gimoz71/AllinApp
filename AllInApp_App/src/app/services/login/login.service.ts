import { Injectable } from "@angular/core";
import { HttpService } from "../shared/http.service";
import { Observable } from "rxjs/Observable";
import { Http } from "../../models/shared/http.namespace"
import { Login } from "../../models/login/login.namespace";

@Injectable()
export class LoginService {

    constructor(private httpService: HttpService) {
    }
  
    public login(username: string, password: string): Observable<Login.ws_Token> {
      return this.httpService.get("http://allinappws.mesys.it/services/token/"+ username+ "/"+ 
            password);
    }
}