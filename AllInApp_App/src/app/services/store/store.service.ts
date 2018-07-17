import { Contact } from './../../models/contact/contact.namespace';
import { Login} from './../../models/login/login.namespace';
import { LoginService } from './../login/login.service';
import { CheckService } from './../shared/check.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class StoreService{

    private ud : Login.Token;  
    private userData: Subject<Login.Token> = new Subject<Login.Token>();
    public userData$ = this.userData.asObservable();

    constructor(private storage: Storage, private check : CheckService, private login : LoginService){
        this.ud = null;
    }

    public getUserData() : void{
        if (this.ud == null ){
            //store service prima inizializzaione
            this.storage.get("userData").then((val : Login.Token ) => {
                //recuperato token dal database
                if (val != null && val.ErrorMessage.msg_code == 0){
                    //controllo la validità del token
                    this.check.checkToken(val.token_value).subscribe(
                        (r)=>{
                            //token corretto lo invio
                            if (r.ErrorMessage.msg_code == 0){
                                this.ud = val;
                                this.userData.next(this.ud);
                            }else{
                                //token non corretto faccio il login
                                this.login.login(val.token_user, val.token_password).subscribe(
                                    (rl : Login.Token)=>{
                                            this.setUserData(rl);
                                        if (rl.ErrorMessage.msg_code == 0){
                                                this.ud = val;
                                                this.userData.next(this.ud);
                                        }
                                    }
                                );
                            }
                        }
                    )
                }else{
                    //devo andare alla pagina del login
                    this.userData.next(null);
                }
              })
        } else {
            //store service già inizializzato
            this.check.checkToken(this.ud.token_value).subscribe(
                //check sul token
                (r: Login.Token)=>{
                    //token valido lo invio
                    if (r.ErrorMessage.msg_code == 0){
                        this.userData.next(this.ud);
                    }else{
                        this.login.login(r.token_user, r.token_password).subscribe(
                            //token non valido faccio il login
                           (rl : Login.Token)=>{
                               if (rl.ErrorMessage.msg_code == 0){
                                this.setUserData(rl);
                                this.ud = rl;
                                this.setUserData(this.ud);
                                this.userData.next(this.ud);
                               }
                           }
                        );
                    }
                }
            )
        }
        
    }

    public setUserData(udata) : number{
        console.log(udata);
        if (udata != null){
            this.storage.set("userData" , udata).then((val) =>{
                console.log(val);
            });
            this.ud = udata;
        }else{
            return -1
        }
        return 1;
    }

}