import { Injectable } from "@angular/core";
import { Observable } from "rxjs/observable"
import { Http } from "../models/shared/http.namespace";
import { HttpService } from "../services/shared/http.service";

@Injectable()
export class ComunicazioneService  {

    constructor(private http: HttpService){

    }

    public loadComunicazioniList(profileId: number): Observable<Http.HttpResponse>{
        return this.http.get('');//qui dobbiamo inserire la URL del servizio che si sta invocando per la restituzione dell'elenco delle comunicazioni
    }
}