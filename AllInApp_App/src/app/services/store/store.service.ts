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
                                this.ud = r;
                                this.userData.next(r);
                            }else{
                                //token non corretto faccio il login
                                this.login.login(val.token_user, val.token_password).subscribe(
                                    (rl : Login.Token)=>{
                                            console.log("log userdata 1");
                                            this.setUserData(rl);
                                        if (rl.ErrorMessage.msg_code == 0){
                                                this.ud = rl;
                                                this.userData.next(rl);
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
                        this.userData.next(r);
                    }else{
                        this.login.login(r.token_user, r.token_password).subscribe(
                            //token non valido faccio il login
                           (rl : Login.Token)=>{
                            console.log("log userdata 2");
                               if (rl.ErrorMessage.msg_code == 0){
                                this.setUserData(rl);
                                this.ud = rl;
                                this.userData.next(rl);
                               }else{
                                   alert("login non riuscito");
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

    public getUserDataPromise(){
        return new Promise(resolve=>{
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
                                    this.ud = r;
                                    resolve(r);
                                }else{
                                    //token non corretto faccio il login
                                    this.login.login(val.token_user, val.token_password).subscribe(
                                        (rl : Login.Token)=>{
                                                console.log("log userdata 1");
                                                this.setUserData(rl);
                                            if (rl.ErrorMessage.msg_code == 0){
                                                    this.ud = rl;
                                                    resolve(rl)
                                            }
                                        }
                                    );
                                }
                            }
                        )
                    }else{
                        //devo andare alla pagina del login
                        resolve(null);
                    }
                  })
            } else {
                //store service già inizializzato
                this.check.checkToken(this.ud.token_value).subscribe(
                    //check sul token
                    (r: Login.Token)=>{
                        //token valido lo invio
                        if (r.ErrorMessage.msg_code == 0){
                            resolve(r);
                        }else{
                            this.login.login(r.token_user, r.token_password).subscribe(
                                //token non valido faccio il login
                               (rl : Login.Token)=>{
                                console.log("log userdata 2");
                                   if (rl.ErrorMessage.msg_code == 0){
                                    this.setUserData(rl);
                                    this.ud = rl;
                                    resolve(rl);
                                   }else{
                                       alert("login non riuscito");
                                   }
                               }
                            );
                        }
                    }
                )
            }
        })
    }
}