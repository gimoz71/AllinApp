import { User } from './../../models/user/user.namespace';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class StoreService{

    private ud : User.UserData;
    
    private userData: Subject<User.UserData> = new Subject<User.UserData>();
    public userData$ = this.userData.asObservable();

    constructor(private storage: Storage){
        this.ud = null;
    }

    public getUserData() : void{
        if (this.ud == null){
            this.storage.get("userData").then((val) => {
                this.ud = val;
                this.userData.next(this.ud);
              })
        } else {
            this.userData.next(this.ud);
        }
        
    }

    public setUserData(udata) : number{
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