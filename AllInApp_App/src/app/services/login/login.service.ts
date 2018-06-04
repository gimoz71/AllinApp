import { Injectable } from "@angular/core";
import { HttpService } from "../shared/http.service";
import { Observable } from "rxjs/Observable";
import { Http } from "../../models/shared/http.namespace"

@Injectable()
export class LoginService {

    constructor(private httpService: HttpService) {
    }
  
    public login(username: string, password: string): Observable<Http.HttpResponse> {
      return this.httpService.get("");
    }
}