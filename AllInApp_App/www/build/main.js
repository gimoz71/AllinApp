webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoreService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_login_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_check_service__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StoreService = /** @class */ (function () {
    function StoreService(storage, check, login) {
        this.storage = storage;
        this.check = check;
        this.login = login;
        this.userData = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
        this.userData$ = this.userData.asObservable();
        this.ud = null;
    }
    StoreService.prototype.getUserData = function () {
        var _this = this;
        if (this.ud == null) {
            //store service prima inizializzaione
            this.storage.get("userData").then(function (val) {
                //recuperato token dal database
                if (val != null && val.ErrorMessage.msg_code == 0) {
                    //controllo la validità del token
                    _this.check.checkToken(val.token_value).subscribe(function (r) {
                        //token corretto lo invio
                        if (r.ErrorMessage.msg_code == 0) {
                            _this.ud = r;
                            _this.userData.next(r);
                        }
                        else {
                            //token non corretto faccio il login
                            _this.login.login(val.token_user, val.token_password).subscribe(function (rl) {
                                console.log("log userdata 1");
                                _this.setUserData(rl);
                                if (rl.ErrorMessage.msg_code == 0) {
                                    _this.ud = val;
                                    _this.userData.next(rl);
                                }
                            });
                        }
                    });
                }
                else {
                    //devo andare alla pagina del login
                    _this.userData.next(null);
                }
            });
        }
        else {
            //store service già inizializzato
            this.check.checkToken(this.ud.token_value).subscribe(
            //check sul token
            function (r) {
                //token valido lo invio
                if (r.ErrorMessage.msg_code == 0) {
                    _this.userData.next(r);
                }
                else {
                    _this.login.login(r.token_user, r.token_password).subscribe(
                    //token non valido faccio il login
                    function (rl) {
                        console.log("log userdata 2");
                        if (rl.ErrorMessage.msg_code == 0) {
                            _this.setUserData(rl);
                            _this.ud = rl;
                            _this.userData.next(rl);
                        }
                        else {
                            alert("login non riuscito");
                        }
                    });
                }
            });
        }
    };
    StoreService.prototype.setUserData = function (udata) {
        console.log(udata);
        if (udata != null) {
            this.storage.set("userData", udata).then(function (val) {
                console.log(val);
            });
            this.ud = udata;
        }
        else {
            return -1;
        }
        return 1;
    };
    StoreService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__shared_check_service__["a" /* CheckService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_check_service__["a" /* CheckService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__login_login_service__["a" /* LoginService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__login_login_service__["a" /* LoginService */]) === "function" && _c || Object])
    ], StoreService);
    return StoreService;
    var _a, _b, _c;
}());

//# sourceMappingURL=store.service.js.map

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//SERVICE NON UTILIZZATO
var HttpService = /** @class */ (function () {
    function HttpService(http) {
        this.http = http;
    }
    HttpService.prototype.getToken = function (url) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' });
        return this.http.get(url, { headers: headers });
    };
    HttpService.prototype.get = function (url) {
        return this.http.get(url);
    };
    HttpService.prototype.getContactList = function (token, attivo) {
        var url = "http://allinappws.mesys.it/services/get_elenco_dipendenti/" + token + "/" + attivo;
        return this.http.get(url);
    };
    HttpService.prototype.getNewsList = function (token, from, to, lette) {
        var url = "http://allinappws.mesys.it/services/get_elenco_news/" + token + "/" + from + "/" + to + "/" + lette;
        console.log(url);
        return this.http.get(url);
    };
    HttpService.prototype.setReadNews = function (token, key) {
        var url = "http://allinappws.mesys.it/services/set_read_news/" + token + "/" + key + "/";
        console.log(url);
        return this.http.get(url);
    };
    HttpService.prototype.getMessaggeList = function (token, from, to, tipo) {
        var url = "http://allinappws.mesys.it/services/get_elenco_messaggi/" + token + "/" + from + "/" + to + "/" + tipo;
        console.log(url);
        return this.http.get(url);
    };
    HttpService.prototype.getMessagge = function (token, key) {
        var url = "http://allinappws.mesys.it/services/get_messaggio/" + token + "/" + key;
        console.log(url);
        return this.http.get(url);
    };
    HttpService.prototype.setStarMessage = function (token, key, stato) {
        var url = "http://allinappws.mesys.it/services/set_star_message/" + token + "/" + key + "/" + stato;
        console.log(url);
        return this.http.get(url);
    };
    HttpService.prototype.setDeleteMessage = function (token, key) {
        var url = "http://allinappws.mesys.it/services/set_deleted_message/" + token + "/" + key;
        console.log(url);
        return this.http.get(url);
    };
    HttpService.prototype.deleteMessage = function (mess) {
        var url = "http://allinappws.mesys.it/services/del_message/";
        console.log(url);
        return this.http.post(url, mess);
    };
    HttpService.prototype.sendMessage = function (token, mess) {
        var url = "http://allinappws.mesys.it/services/put_message";
        console.log(url);
        console.log(mess);
        return this.http.post(url, mess);
    };
    HttpService.prototype.getComunicazioniElenco = function (token, from, to, lette, tipo) {
        var url = "http://allinappws.mesys.it/services/get_elenco_comunicazioni/" + token + "/" + from +
            "/" + to + "/" + lette + "/" + tipo + "/";
        console.log(url);
        return this.http.get(url);
    };
    HttpService.prototype.getComunicazione = function (token, key) {
        var url = "http://allinappws.mesys.it/services/get_public_comunicazione/"
            + token + "/" + key + "/";
        console.log(url);
        return this.http.get(url);
    };
    HttpService.prototype.setReadComunicazione = function (token, key) {
        var url = "http://allinappws.mesys.it/services/set_read_comunicazione/"
            + token + "/" + key + "/";
        console.log(url);
        return this.http.get(url);
    };
    HttpService.prototype.setDeletedComunicazione = function (token, key) {
        var url = "http://allinappws.mesys.it/services/set_deleted_comunicazione/" + token + "/" + key + "/";
        console.log(url);
        return this.http.get(url);
    };
    HttpService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
    ], HttpService);
    return HttpService;
    var _a;
}());

//# sourceMappingURL=http.service.js.map

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__messaggi_nuovo_messaggi_nuovo__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_shared_http_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MessaggiDetailsPage = /** @class */ (function () {
    function MessaggiDetailsPage(navCtrl, navParams, http, store, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.store = store;
        this.alertCtrl = alertCtrl;
    }
    MessaggiDetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.mess = this.navParams.get('mess');
        var s = this.store.userData$.subscribe(function (val) {
            var s1 = _this.http.getMessagge(val.token_value, _this.mess.messaggi_key).subscribe(function (val1) {
                _this.mess = val1.messaggio;
                console.log(_this.mess);
                s1.unsubscribe();
            });
            s.unsubscribe();
        });
        this.store.getUserData();
    };
    MessaggiDetailsPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    MessaggiDetailsPage.prototype.setDelete = function (mess) {
        var _this = this;
        var s = this.store.userData$.subscribe(function (val) {
            var s1 = _this.http.setDeleteMessage(val.token_value, mess.messaggi_key).subscribe(function (r) {
                console.log(r);
                s1.unsubscribe();
            });
            s.unsubscribe();
        });
        this.store.getUserData();
    };
    MessaggiDetailsPage.prototype.deleteConfirm = function (mess) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Conferma',
            message: 'spostare questo messaggio nel cestino?',
            buttons: [
                {
                    text: 'indietro',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'ok',
                    handler: function () {
                        _this.setDelete(mess);
                    }
                }
            ]
        });
        alert.present();
    };
    MessaggiDetailsPage.prototype.setStar = function (mess, stato) {
        var _this = this;
        var s = this.store.userData$.subscribe(function (val) {
            var s1 = _this.http.setStarMessage(val.token_value, mess.messaggi_key, stato).subscribe(function (r) {
                console.log(r);
                if (r.ErrorMessage.msg_code == 0) {
                    mess.preferito = stato;
                }
                s1.unsubscribe();
            });
            s.unsubscribe();
        });
        this.store.getUserData();
    };
    MessaggiDetailsPage.prototype.reply = function (mess) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__messaggi_nuovo_messaggi_nuovo__["a" /* MessaggiNuovoPage */], { reply: mess });
    };
    MessaggiDetailsPage.prototype.inoltro = function (mess) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__messaggi_nuovo_messaggi_nuovo__["a" /* MessaggiNuovoPage */], { inoltro: mess });
    };
    MessaggiDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'messaggi-details',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\messaggi-details\messaggi-details.html"*/'<ion-header>\n\n    <ion-navbar hideBackButton>\n\n      <ion-buttons left>\n\n        <button (click)="back()" ion-button icon-left clear small>\n\n          <ion-icon name="arrow-back"></ion-icon>\n\n        </button>\n\n        </ion-buttons>\n\n        <ion-title>\n\n          <div class="text-default" >MESSAGGIO</div>\n\n        </ion-title>\n\n        <ion-buttons end>\n\n            <button><ion-icon class="icon-button" name="contact" class="nav-icon text-default"></ion-icon></button>\n\n          </ion-buttons>\n\n      </ion-navbar>\n\n    </ion-header>\n\n    <ion-content>\n\n      <div style="float:right;font-size:2em">\n\n          <ion-icon name="undo" (click)="reply(mess)"></ion-icon>\n\n          <ion-icon name="redo" (click)="inoltro(mess)"></ion-icon>\n\n        <ion-icon name="trash" (click)="deleteConfirm(mess)"></ion-icon>\n\n        <ion-icon name="star-outline" *ngIf="mess.preferito==\'\'" (click)="setStar(mess,\'S\')"></ion-icon>\n\n        <ion-icon name="star-outline" *ngIf="mess.preferito==\'N\'" (click)="setStar(mess,\'S\')"></ion-icon>\n\n        <ion-icon name="star" *ngIf="mess.preferito==\'S\'" (click)="setStar(mess,\'N\')"></ion-icon>\n\n      </div>\n\n    <img src={{mess.nw_immagine}}>\n\n     <h1>{{mess.soggetto}}</h1>\n\n      <p>{{mess.descrizione}}</p>\n\n      <p>{{mess.messaggio}}</p>\n\n      <p>{{mess.cognome_mit}}</p>\n\n    </ion-content>\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\messaggi-details\messaggi-details.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_shared_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_1__services_store_store_service__["a" /* StoreService */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */]])
    ], MessaggiDetailsPage);
    return MessaggiDetailsPage;
}());

//# sourceMappingURL=messaggi-details.js.map

/***/ }),
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoginService = /** @class */ (function () {
    function LoginService(http) {
        this.http = http;
    }
    LoginService.prototype.login = function (username, password) {
        var url = "http://allinappws.mesys.it/services/token/" + username + "/" + password;
        console.log(url);
        return this.http.get(url);
    };
    LoginService.prototype.changePassword = function (token, pass, newp, rep) {
        var op = {
            dipendenti_key: token.token_dipendente_key,
            password: pass,
            password_new: newp,
            password_rep: rep,
            token: token.token_value
        };
        var url = "http://allinappws.mesys.it/services/change_password";
        return this.http.post(url, op);
    };
    LoginService.prototype.changeAvatar = function (imm, token) {
        var op = {
            token: token.token_value,
            dipendenti_key: token.token_dipendente_key,
            immagine: imm
        };
        console.log(op);
        var url = "http://allinappws.mesys.it/services/change_avatar";
        return this.http.post(url, op);
    };
    LoginService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], LoginService);
    return LoginService;
}());

//# sourceMappingURL=login.service.js.map

/***/ }),
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Comunicazione; });
var Comunicazione;
(function (Comunicazione_1) {
    var ComunicazioneElencoElem = /** @class */ (function () {
        function ComunicazioneElencoElem() {
        }
        return ComunicazioneElencoElem;
    }());
    Comunicazione_1.ComunicazioneElencoElem = ComunicazioneElencoElem;
    var ComunicazioniElenco = /** @class */ (function () {
        function ComunicazioniElenco() {
        }
        return ComunicazioniElenco;
    }());
    Comunicazione_1.ComunicazioniElenco = ComunicazioniElenco;
    var ComunicazioneResult = /** @class */ (function () {
        function ComunicazioneResult() {
        }
        return ComunicazioneResult;
    }());
    Comunicazione_1.ComunicazioneResult = ComunicazioneResult;
    var Comunicazione = /** @class */ (function () {
        function Comunicazione() {
        }
        return Comunicazione;
    }());
    Comunicazione_1.Comunicazione = Comunicazione;
    var Result = /** @class */ (function () {
        function Result() {
        }
        return Result;
    }());
    Comunicazione_1.Result = Result;
})(Comunicazione || (Comunicazione = {}));
//# sourceMappingURL=comunicazione.namespace.js.map

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ContactService = /** @class */ (function () {
    function ContactService(http, store) {
        this.http = http;
        this.store = store;
        this.contactsList = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.contactsList$ = this.contactsList.asObservable();
        this.contactFull = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.contactsFull$ = this.contactFull.asObservable();
        this.attivo = "X";
        this.lc = null;
    }
    ContactService.prototype.ngOnInit = function () {
    };
    ContactService.prototype.GetContacts = function (attivo) {
        var _this = this;
        /** let list: Contact.ContactDataMin[] = [
            {username: "Ugo Capeto", ruoloAziendale: "Re dei Franchi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/King_Hugh_Capet.jpg/120px-King_Hugh_Capet.jpg"},
           {username: "Pipino il breve", ruoloAziendale: "Re dei Franchi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Amiel_-_Pepin_the_Short.jpg/120px-Amiel_-_Pepin_the_Short.jpg"},
          {username: "Carlo Magno", ruoloAziendale: "Re dei Franchi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Charlemagne-by-Durer.jpg/120px-Charlemagne-by-Durer.jpg"},
            {username: "Carlo Martello", ruoloAziendale: "Re dei Franchi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Charles_Martel_01.jpg/120px-Charles_Martel_01.jpg"},
            {username: "Ludovico il Pio", ruoloAziendale: "Re dei Franchi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Louis_le_Pieux.png/120px-Louis_le_Pieux.png"},
            {username: "Oddone", ruoloAziendale: "conte di Parigi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/5/58/Eudes_Ier_de_France.jpg"},
            {username: "Rodolfo", ruoloAziendale: "duca di Borgogna", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Rudolph_of_France.jpg/110px-Rudolph_of_France.jpg"},
           {username: "Filippo I il giusto", ruoloAziendale: "Re dei Franchi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Filip_i.jpg/120px-Filip_i.jpg"},
       ];**/
        this.attivo = attivo;
        this.subscription = this.store.userData$.subscribe(function (val) {
            _this.token = val.token_value;
            var url = "http://allinappws.mesys.it/services/get_elenco_dipendenti/" + _this.token + "/" + _this.attivo;
            _this.http.get(url).subscribe(function (val) {
                _this.lc = val;
                _this.contactsList.next(_this.lc);
            });
            _this.subscription.unsubscribe();
        });
        this.store.getUserData();
    };
    ContactService.prototype.GetContactDetails = function (key) {
        var _this = this;
        /**        let list: Contact.ContactDataFull[] = [
                    {username : "Ugo Capeto", ruoloAziendale : "Re dei Franchi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/King_Hugh_Capet.jpg/120px-King_Hugh_Capet.jpg", mansione : "re",
                    telefono:"8909844773", email: "ugo@capeto.it", nInterno: 1},
                    {username : "Pipino il breve", ruoloAziendale : "Re dei Franchi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Amiel_-_Pepin_the_Short.jpg/120px-Amiel_-_Pepin_the_Short.jpg", mansione : "re",
                    telefono:"890938773", email: "pipino@capeto.it", nInterno: 2},
                    {username : "Carlo Magno", ruoloAziendale : "Re dei Franchi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Charlemagne-by-Durer.jpg/120px-Charlemagne-by-Durer.jpg", mansione : "re",
                    telefono:"8911098773", email: "carlo@capeto.it", nInterno: 3},
                    {username : "Carlo Martello", ruoloAziendale : "Re dei Franchi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Charles_Martel_01.jpg/120px-Charles_Martel_01.jpg", mansione : "re",
                    telefono:"8339098773", email: "carlo@capeto.it", nInterno: 4},
                    {username : "Ludovico il Pio", ruoloAziendale : "Re dei Franchi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Louis_le_Pieux.png/120px-Louis_le_Pieux.png", mansione : "re",
                    telefono:"8909128773", email: "ludo@capeto.it", nInterno: 5},
                    {username : "Oddone", ruoloAziendale : "conte di Parigi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/5/58/Eudes_Ier_de_France.jpg", mansione : "conte",
                    telefono:"89096128773", email: "oddone@capeto.it", nInterno: 6},
                    {username : "Rodolfo", ruoloAziendale : "duca di Borgogna", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Rudolph_of_France.jpg/110px-Rudolph_of_France.jpg", mansione : "duca",
                    telefono:"8909128773", email: "ludo@capeto.it", nInterno: 7},
                    {username : "Filippo I il giusto", ruoloAziendale : "Re dei Franchi", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Filip_i.jpg/120px-Filip_i.jpg", mansione : "re",
                    telefono:"89096128773", email: "oddone@capeto.it", nInterno: 8}
                ]**/
        /**let find : Contact.ContactDataFull ={
            username : "", ruoloAziendale : "", avatarUrl: "", mansione : "",
            telefono:"", email: "", nInterno: 0
        };
        list.forEach( (c)=>{
            if (c.username  == con.username){
                find = c;
            }
        })
        return find;**/
        console.log("sono in get contacts details");
        this.subscriptionFull = this.store.userData$.subscribe(function (val) {
            if (key == -1)
                key = val.token_dipendente_key;
            _this.token = val.token_value;
            var url = "http://allinappws.mesys.it/services/get_scheda_dipendente/" + _this.token + "/" + key;
            _this.http.get(url).subscribe(function (val) {
                _this.cd = val;
                _this.contactFull.next(_this.cd);
            });
            _this.subscriptionFull.unsubscribe();
        });
        this.store.getUserData();
    };
    ContactService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1__store_store_service__["a" /* StoreService */]])
    ], ContactService);
    return ContactService;
}());

//# sourceMappingURL=contact.service.js.map

/***/ }),
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CircolariDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_shared_http_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_comunicazione_comunicazione_namespace__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ComunicazioniPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CircolariDetailsPage = /** @class */ (function () {
    function CircolariDetailsPage(navCtrl, navParams, store, http, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.store = store;
        this.http = http;
        this.alertCtrl = alertCtrl;
    }
    CircolariDetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        var c = this.navParams.get('com');
        this.com = new __WEBPACK_IMPORTED_MODULE_4__models_comunicazione_comunicazione_namespace__["a" /* Comunicazione */].Comunicazione;
        var s = this.store.userData$.subscribe(function (val) {
            var s1 = _this.http.getComunicazione(val.token_value, c.comunicazione_key).subscribe(function (val1) {
                _this.com = val1.comunicazione;
                s1.unsubscribe();
            });
            s.unsubscribe();
        });
        this.store.getUserData();
    };
    CircolariDetailsPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    CircolariDetailsPage.prototype.delete = function () {
        var _this = this;
        console.log("ciao");
        var s = this.store.userData$.subscribe(function (val) {
            var s1 = _this.http.setDeletedComunicazione(val.token_value, _this.com.comunicazione_key).subscribe(function (val1) {
                s1.unsubscribe();
            });
            s.unsubscribe();
        });
        this.store.getUserData();
    };
    CircolariDetailsPage.prototype.read = function () {
        var _this = this;
        var s = this.store.userData$.subscribe(function (val) {
            var s2 = _this.http.setReadComunicazione(val.token_value, _this.com.comunicazione_key).subscribe(function (val2) {
                console.log(val2);
                if (val2.ErrorMessage.msg_code == 0) {
                    var alert = _this.alertCtrl.create({
                        title: 'Lettura confermata',
                        subTitle: '',
                        buttons: ['Ok']
                    });
                    alert.present();
                }
                s2.unsubscribe();
            });
            s.unsubscribe();
        });
        this.store.getUserData();
    };
    CircolariDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'circolari-details',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\circolari-details\circolari-details.html"*/'<ion-header>\n\n  <ion-navbar hideBackButton>\n\n    <ion-buttons left>\n\n      <button (click)="back()" ion-button icon-left clear small>\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n      </button>\n\n      </ion-buttons>\n\n      <ion-title>\n\n        <div class="text-default" >Circolari</div>\n\n      </ion-title>\n\n      <ion-buttons end>\n\n          <button><ion-icon class="icon-button" name="contact" class="nav-icon text-default"></ion-icon></button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  <ion-content>\n\n    <div style="float:right;font-size: 2em;">\n\n      <ion-icon (click)="delete()"  name="trash"></ion-icon>\n\n    </div>\n\n  <img src={{com.cm_immagine}}>\n\n   <h1>{{com.cm_titolo}}</h1>\n\n    <p>{{com.cm_descrizione}}</p>\n\n    <p>{{com.cm_allegato}}</p>\n\n    <p>{{com.cm_data}}</p>\n\n\n\n\n\n  <ion-item>\n\n    <ion-label>Conferma lettura</ion-label>\n\n    <ion-checkbox [(ngModel)]="conferma"></ion-checkbox>\n\n  </ion-item>\n\n  <button *ngIf="conferma==true" ion-button (click)="read()">OK</button>\n\n  </ion-content>'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\circolari-details\circolari-details.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_store_store_service__["a" /* StoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_store_store_service__["a" /* StoreService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__services_shared_http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__services_shared_http_service__["a" /* HttpService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */]) === "function" && _e || Object])
    ], CircolariDetailsPage);
    return CircolariDetailsPage;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=circolari-details.js.map

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_home_com_home_com__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HomeComModule = /** @class */ (function () {
    function HomeComModule() {
    }
    HomeComModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_0__pages_home_com_home_com__["a" /* HomeComPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_0__pages_home_com_home_com__["a" /* HomeComPage */]]
        })
    ], HomeComModule);
    return HomeComModule;
}());

//# sourceMappingURL=home-com.module.js.map

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComunicazioniPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__comunicazioni_details_comunicazioni_details__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ComunicazioniPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ComunicazioniPage = /** @class */ (function () {
    function ComunicazioniPage(navCtrl, navParams, store, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.store = store;
        this.http = http;
    }
    ComunicazioniPage.prototype.ngOnInit = function () {
        var _this = this;
        var s = this.store.userData$.subscribe(function (val) {
            var s1 = _this.http.getComunicazioniElenco(val.token_value, 0, 0, 'X', 'C').subscribe(function (val1) {
                _this.comFull = val1.l_lista_comunicazione;
                s1.unsubscribe();
            });
            s.unsubscribe();
        });
        this.store.getUserData();
    };
    ComunicazioniPage.prototype.goToDetails = function (com) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__comunicazioni_details_comunicazioni_details__["a" /* ComunicazioniDetailsPage */], { com: com });
    };
    ComunicazioniPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    ComunicazioniPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-comunicazioni',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\comunicazioni\comunicazioni.html"*/'<ion-header>\n\n  <ion-navbar hideBackButton>\n\n    <ion-buttons left>\n\n      <button (click)="back()" ion-button icon-left clear small>\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-buttons end>\n\n      <button><ion-icon class="icon-button" name="news" class="nav-icon text-default"></ion-icon></button>\n\n    </ion-buttons>\n\n    <ion-title >\n\n      <div class="text-default">Comunicazioni</div>\n\n    </ion-title>\n\n    \n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div *ngFor="let com of comFull">\n\n    <ion-card class="border-blue" *ngIf="com.dc_letta==\'N\'" (click)="goToDetails(com)"  >\n\n      <ion-card-content >\n\n        <h1 >\n\n          {{com.cm_titolo}}\n\n        </h1>\n\n        <p>\n\n        {{com.cm_descrizione}}\n\n        </p>\n\n      </ion-card-content>\n\n    </ion-card>\n\n    <ion-card class="border-green" *ngIf="com.dc_letta==\'S\'" (click)="goToDetails(com)"  >\n\n      <ion-card-content >\n\n        <h1 >\n\n          {{com.cm_titolo}}\n\n        </h1>\n\n        <p>\n\n        {{com.cm_descrizione}}\n\n        </p>\n\n      </ion-card-content>\n\n    </ion-card>\n\n</div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\comunicazioni\comunicazioni.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__services_store_store_service__["a" /* StoreService */],
            __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__["a" /* HttpService */]])
    ], ComunicazioniPage);
    return ComunicazioniPage;
}());

//# sourceMappingURL=comunicazioni.js.map

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiNuovoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_shared_http_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_contact_contact_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__messaggi_details_messaggi_details__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_messaggi_messaggi_namespace__ = __webpack_require__(120);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MessaggiNuovoPage = /** @class */ (function () {
    function MessaggiNuovoPage(navCtrl, store, conService, http, navParams) {
        this.navCtrl = navCtrl;
        this.store = store;
        this.conService = conService;
        this.http = http;
        this.navParams = navParams;
        this.contacts = [];
        this.oggetto = '';
        this.messaggio = '';
    }
    MessaggiNuovoPage.prototype.ngOnInit = function () {
        var _this = this;
        var mess1 = this.navParams.get('reply');
        var mess2 = this.navParams.get('inoltro');
        if (mess1 != null) {
            this.mess = mess1;
            this.oggetto = "risposta : " + this.mess.soggetto;
            this.messaggio = "-----------------\n" + this.mess.messaggio + "\n-------------------\n";
            this.nomeDestinatario = this.mess.nome_des + " " + this.mess.cognome_des;
        }
        else if (mess2 != null) {
            this.mess = mess2;
            this.oggetto = this.mess.soggetto;
            this.messaggio = this.mess.messaggio;
        }
        else
            this.mess = new __WEBPACK_IMPORTED_MODULE_6__models_messaggi_messaggi_namespace__["a" /* Messaggi */].MessaggiElem();
        console.log(this.mess);
        var s = this.conService.contactsList$.subscribe(function (val) {
            if (val != null) {
                if (val.ErrorMessage.msg_code == 0) {
                    _this.contacts = val.l_dipendenti;
                    console.log(_this.contacts);
                }
                else {
                    alert("errore recupero della risorsa");
                }
            }
            else {
                console.log("errore in contacts service");
            }
            s.unsubscribe();
        });
        this.conService.GetContacts("X");
    };
    MessaggiNuovoPage.prototype.goToDetails = function (mess) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__messaggi_details_messaggi_details__["a" /* MessaggiDetailsPage */], { mess: mess });
    };
    MessaggiNuovoPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    MessaggiNuovoPage.prototype.inviaMessaggio = function () {
        var _this = this;
        console.log(this.destinatario);
        var s = this.store.userData$.subscribe(function (val) {
            var mit;
            for (var i = 0; i < _this.contacts.length; i++) {
                if (_this.contacts[i].dipendenti_key == val.token_dipendente_key) {
                    mit = _this.contacts[i];
                }
            }
            for (var i = 0; i < _this.contacts.length; i++) {
                var s_1 = _this.contacts[i].nome + " " + _this.contacts[i].cognome;
                if (s_1 == _this.nomeDestinatario) {
                    _this.destinatario = _this.contacts[i];
                }
            }
            for (var i = 0; i < _this.contacts.length; i++) {
                var s_2 = _this.contacts[i].nome + " " + _this.contacts[i].cognome;
                if (s_2 == _this.nomeConoscenza) {
                    _this.conoscenza = _this.contacts[i];
                }
            }
            if (mit != null) {
                if (_this.destinatario != null) {
                    var busta_1 = new __WEBPACK_IMPORTED_MODULE_6__models_messaggi_messaggi_namespace__["a" /* Messaggi */].BustaMessaggio();
                    var mess = new __WEBPACK_IMPORTED_MODULE_6__models_messaggi_messaggi_namespace__["a" /* Messaggi */].Messaggio();
                    var con = new __WEBPACK_IMPORTED_MODULE_6__models_messaggi_messaggi_namespace__["a" /* Messaggi */].Conoscenza();
                    mess.mittente_key = val.token_dipendente_key;
                    mess.destinatario_key = _this.destinatario.dipendenti_key;
                    mess.data = new Date().getTime().toString();
                    mess.soggetto = _this.oggetto;
                    mess.messaggio = _this.messaggio;
                    mess.preferito = 'N';
                    mess.stato_lettura = 'N';
                    //stato_messaggio: string;
                    mess.cognome_mit = mit.cognome;
                    mess.nome_mit = mit.nome;
                    mess.cognome_des = _this.destinatario.cognome;
                    mess.nome_des = _this.destinatario.nome;
                    if (_this.conoscenza != null) {
                        con.dipendente_key = _this.conoscenza.dipendenti_key;
                        con.nominativo = _this.conoscenza.nome + " " + _this.conoscenza.cognome;
                    }
                    busta_1.c_conoscenza = [];
                    busta_1.c_conoscenza.push(con);
                    busta_1.messaggio = mess;
                    busta_1.token = val.token_value;
                    var s1_1 = _this.http.sendMessage(val.token_value, busta_1).subscribe(function (r) {
                        console.log(r);
                        if (r.ErrorMessage.msg_code == 0) {
                            console.log(busta_1);
                            alert("messaggio inviato correttamente");
                        }
                        else {
                            alert("errore nell'invio del messaggio");
                        }
                        s1_1.unsubscribe();
                    });
                    s.unsubscribe();
                }
                else {
                    alert("errore recupero mittente");
                }
            }
            else {
                alert("selezionare destinatario");
            }
        });
        this.store.getUserData();
    };
    MessaggiNuovoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["m" /* Component */])({
            selector: 'messaggi-nuovo',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\messaggi-nuovo\messaggi-nuovo.html"*/'<ion-header>\n\n<ion-navbar hideBackButton>\n\n  <ion-buttons left>\n\n    <button (click)="back()" ion-button icon-left clear small>\n\n      <ion-icon name="arrow-back"></ion-icon>\n\n    </button>\n\n    </ion-buttons>\n\n    <ion-title>\n\n      <div class="text-default" >NUOVO</div>\n\n    </ion-title>\n\n    <ion-buttons end>\n\n        <button><ion-icon class="icon-button" name="contact" class="nav-icon text-default"></ion-icon></button>\n\n      </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-item>\n\n    <ion-label>Destinatario</ion-label>\n\n    <ion-select [(ngModel)]="nomeDestinatario">\n\n      <ion-option *ngFor="let con of contacts">{{con.nome}} {{con.cognome}}</ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n  <ion-item>\n\n  <ion-label>Per conoscenza</ion-label>\n\n    <ion-select [(ngModel)]="nomeConoscenza">\n\n      <ion-option *ngFor="let con of contacts">{{con.nome}} {{con.cognome}}</ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n  <div>Oggetto</div>\n\n  <ion-input style="background-color: white"[(ngModel)]="oggetto"></ion-input>\n\n  <div>Messaggio</div>\n\n  <ion-textarea style="background-color: white" [(ngModel)]="messaggio"></ion-textarea>\n\n  <button ion-button (click)="inviaMessaggio()">INVIA</button>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\messaggi-nuovo\messaggi-nuovo.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_store_store_service__["a" /* StoreService */],
            __WEBPACK_IMPORTED_MODULE_1__services_contact_contact_service__["a" /* ContactService */], __WEBPACK_IMPORTED_MODULE_0__services_shared_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* NavParams */]])
    ], MessaggiNuovoPage);
    return MessaggiNuovoPage;
}());

//# sourceMappingURL=messaggi-nuovo.js.map

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NewsDetailsPage = /** @class */ (function () {
    function NewsDetailsPage(navCtrl, navParams, http, store) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.store = store;
    }
    NewsDetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.news = this.navParams.get('news');
        var s = this.store.userData$.subscribe(function (val) {
            var s1 = _this.http.setReadNews(val.token_value, _this.news.news_key).subscribe(function (r) {
                console.log(r);
            });
            s.unsubscribe();
        });
        this.store.getUserData();
    };
    NewsDetailsPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    NewsDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'news-details',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\news-details\news-details.html"*/'<ion-header>\n\n    <ion-navbar hideBackButton>\n\n      <ion-buttons left>\n\n        <button (click)="back()" ion-button icon-left clear small>\n\n          <ion-icon name="arrow-back"></ion-icon>\n\n        </button>\n\n        </ion-buttons>\n\n        <ion-title>\n\n          <div class="text-default" >NEWS</div>\n\n        </ion-title>\n\n        <ion-buttons end>\n\n            <button><ion-icon class="icon-button" name="contact" class="nav-icon text-default"></ion-icon></button>\n\n          </ion-buttons>\n\n      </ion-navbar>\n\n    </ion-header>\n\n    <ion-content>\n\n    <img src={{news.nw_immagine}}>\n\n     <h1>{{news.nw_titolo}}</h1>\n\n      <p>{{news.nw_descrizione}}</p>\n\n      <p>{{news.nw_link}}</p>\n\n      <p>{{news.nw_data}}</p>\n\n    </ion-content>\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\news-details\news-details.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_0__services_store_store_service__["a" /* StoreService */]])
    ], NewsDetailsPage);
    return NewsDetailsPage;
}());

//# sourceMappingURL=news-details.js.map

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_contact_contact_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__contact_details_contact_details__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_shared_error_service__ = __webpack_require__(127);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ContactsPage = /** @class */ (function () {
    function ContactsPage(navCtrl, conService, platform, err) {
        this.navCtrl = navCtrl;
        this.conService = conService;
        this.platform = platform;
        this.err = err;
        this.contacts = [];
        this.groupedContacts = [];
        this.clonedContacts = [];
    }
    ContactsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.contacts = [];
        this.subscrition = this.conService.contactsList$.subscribe(function (val) {
            console.log(val);
            console.log("sono nel costruttore di contact page");
            if (val != null) {
                if (val.ErrorMessage.msg_code == 0) {
                    _this.contacts = val.l_dipendenti;
                    _this.clonedContacts = Object.assign([], _this.contacts);
                    _this.groupContacts(_this.contacts);
                    console.log(_this.contacts);
                }
                else {
                    alert("errore recupero della risorsa");
                    _this.err.sendError(val.ErrorMessage);
                }
            }
            else {
                console.log("errore in contacts service");
            }
        });
        this.conService.GetContacts("X");
    };
    ContactsPage.prototype.ngOnDestroy = function () {
        this.subscrition.unsubscribe();
    };
    ContactsPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    ContactsPage.prototype.goToDetails = function (contact) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__contact_details_contact_details__["a" /* ContactDetailsPage */], { contact: contact });
    };
    ContactsPage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        this.contacts = [];
        this.contacts = Object.assign([], this.clonedContacts);
        // set val to the value of the ev target
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.contacts = this.contacts.filter(function (item) {
                return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1
                    || item.cognome.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        this.groupedContacts = [];
        this.groupContacts(this.contacts);
    };
    ContactsPage.prototype.groupContacts = function (contacts) {
        var _this = this;
        var sortedContacts = contacts.sort(function (n1, n2) {
            if (n1.cognome > n2.cognome)
                return 1;
            if (n1.cognome < n2.cognome)
                return -1;
            return 0;
        });
        var currentLetter = false;
        var currentContacts = [];
        sortedContacts.forEach(function (val, index) {
            var value = val.cognome;
            if (value.charAt(0) != currentLetter) {
                currentLetter = value.charAt(0);
                var newGroup = {
                    letter: currentLetter,
                    contacts: []
                };
                currentContacts = newGroup.contacts;
                _this.groupedContacts.push(newGroup);
            }
            currentContacts.push(val);
        });
    };
    ContactsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-contacts',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\contacts\contacts.html"*/'<ion-header>\n\n  <ion-navbar hideBackButton>\n\n    <ion-buttons left>\n\n      <button (click)="back()" ion-button icon-left clear small>\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-buttons end>\n\n      <button><ion-icon class="icon-button" name="contacts" class="nav-icon text-default"></ion-icon></button>\n\n    </ion-buttons>\n\n    <ion-title >\n\n      <div class="text-default">Rubrica</div>\n\n    </ion-title>\n\n    \n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  \n\n    <ion-searchbar  (ionInput)="getItems($event)"></ion-searchbar>\n\n    <ion-list >\n\n        <ion-item-group class="list-group list-group-flush addressBook addBook" *ngFor="let group of groupedContacts">\n\n          <ion-item-divider class="group-header bg-default small text-white" >{{group.letter}}</ion-item-divider>\n\n          <ion-item class="list-group-item" *ngFor="let contact of group.contacts" (click)="goToDetails(contact)" >\n\n              <div class="item" >\n\n                  <div  class="user-small contact-small">\n\n                    <img  src="{{contact.url_avatar}}">\n\n                  </div>\n\n                </div>\n\n                <div class="brief contact-small ">\n\n                  <h5 class="name ">{{contact.nome}} {{contact.cognome}}</h5>\n\n                  <p class="text ">{{contact.ruolo_aziendale}}</p>\n\n                  <i class="fa fa-mobile device"></i>\n\n                </div>\n\n            </ion-item>\n\n        </ion-item-group>\n\n    </ion-list>\n\n    \n\n\n\n\n\n\n\n    <!--<div class="tab-content mt-3">\n\n        <div class="card no-border mb-3 ">\n\n          <div class="card-header bg-default small text-white">R</div>\n\n          <ul class="list-group list-group-flush addressBook addBook">\n\n            <li class="list-group-item" onclick="location.href = \'chat.html\'">\n\n              <div class="item" start>\n\n                <div class="user-small">\n\n                  <img src="/Assets/images/user-thumb.jpg">\n\n                </div>\n\n              </div>\n\n              <div class="brief">\n\n                <h5 class="name">Paolo Rossi</h5>\n\n                <p class="text">Addetto vendite</p>\n\n                <i class="fa fa-mobile device"></i>\n\n              </div>\n\n            </li>\n\n            \n\n          </ul>\n\n          </div></div>-->\n\n      \n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\contacts\contacts.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_0__services_contact_contact_service__["a" /* ContactService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__services_shared_error_service__["a" /* ErrorService */]])
    ], ContactsPage);
    return ContactsPage;
}());

//# sourceMappingURL=contacts.js.map

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__circolari_circolari__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_login_login_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profilo_profilo__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__contacts_contacts__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__chat_chat__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__comunicazioni_comunicazioni__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, storage, http, alertCtrl, store, login) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.store = store;
        this.login = login;
        this.presenze = [];
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.header1 = "header1_prova";
        this.header2 = "Priorità";
        this.header3 = "Comunicazioni";
        this.headerChat = "Chat";
        this.content1 = "content1_prova";
        this.content2 = "content2_prova";
        this.content3 = "content3_prova";
        this.contentChat = "vai alla chat";
        this.contentCom = '';
        //richiedo quali servizi devono essere visualizzati 
        this.presenze["comunicazioni"] = "true";
        this.presenze["chat"] = "true";
        this.presenze["priorita"] = "true";
        this.presenze["documentale"] = "true";
        this.presenze["contatti"] = "true";
        this.presenze["messaggi"] = "true";
        //ricevo tutti i dati 
        //le prossime verranno eseguite solo se sono presenti nei dati
        var s1 = this.store.userData$.subscribe(function (val) {
            console.log(val);
            if (val.flag_richiesta_lettura == true) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__circolari_circolari__["a" /* CircolariPage */]);
            }
        });
        this.store.getUserData();
    };
    HomePage.prototype.load = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__comunicazioni_comunicazioni__["a" /* ComunicazioniPage */], { val: 'pippo' });
    };
    HomePage.prototype.goToChat = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__chat_chat__["a" /* ChatPage */]);
    };
    HomePage.prototype.goToContact = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__contacts_contacts__["a" /* ContactsPage */]);
    };
    HomePage.prototype.logOut = function () {
        this.storage.clear();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */]);
    };
    HomePage.prototype.GoProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__profilo_profilo__["a" /* ProfiloPage */]);
    };
    HomePage.prototype.changePassword = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Cambio Password',
            message: "inserisci i dati",
            inputs: [
                {
                    name: 'old',
                    placeholder: 'password corrente'
                },
                {
                    name: 'new',
                    placeholder: 'Nuova password'
                },
                {
                    name: 'repeat',
                    placeholder: 'reinserisci nuova passoword'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Send',
                    handler: function (data) {
                        if (_this.checkPassword(data.old) == true) {
                            if (data.new.length > 5) {
                                if (data.new == data.repeat) {
                                    var s_1 = _this.store.userData$.subscribe(function (val) {
                                        s_1.unsubscribe();
                                        var s1 = _this.login.changePassword(val, data.old, data.new, data.repeat).subscribe(function (r) {
                                            s1.unsubscribe();
                                            if (r.ErrorMessage.msg_code == 0) {
                                                alert("password cambiata correttamente");
                                            }
                                            else {
                                                alert("errore modifica password");
                                            }
                                        });
                                    });
                                    _this.store.getUserData();
                                }
                                else {
                                    alert("le password non corrispondono");
                                }
                            }
                            else {
                                alert("la password deve essere più lunga di 5 caratteri");
                            }
                        }
                        else {
                            alert("password corrente non corretta");
                        }
                    }
                }
            ],
            enableBackdropDismiss: false
        });
        prompt.present();
    };
    HomePage.prototype.checkPassword = function (old) {
        return true;
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_9__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar >\n\n	<button ion-button menuToggle ><ion-icon name="menu"></ion-icon></button>\n\n	<ion-title >ALL IN APP</ion-title>\n\n	\n\n    <ion-buttons end><img width="30em" src="assets/imgs/logo.png"></ion-buttons>\n\n	\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-menu id="home" type="overlay" persistent="true" [content]="mycontent">\n\n	<ion-content>\n\n	  <ion-list>\n\n		<ion-item (click)="GoProfile()"> Profilo </ion-item>\n\n		<ion-item (click)="logOut()"> LogOut </ion-item>\n\n		<ion-item (click)="changePassword()">Cambia password</ion-item>\n\n		<ion-item menuClose detail-none>Close Menu</ion-item>\n\n	  </ion-list>\n\n	</ion-content>\n\n  </ion-menu>\n\n  \n\n  <ion-nav #mycontent [root]="rootPage"  ></ion-nav>\n\n\n\n  \n\n\n\n<ion-content >\n\n	<ion-grid >\n\n		<ion-row class="cards-container">\n\n			<!--<ion-col>\n\n				<ion-card class="no-border" (click)="load()">\n\n					<ion-card-header class="bg-comm text-white">{{header1}}</ion-card-header>\n\n					<ion-card-content class="list-group list-group-flush comm">{{content1}}</ion-card-content>\n\n						<ion-list>\n\n							<ion-item>\n\n								<comunicazione></comunicazione>\n\n							</ion-item>\n\n							<ion-item>\n\n								<comunicazione></comunicazione>\n\n							</ion-item>\n\n							<ion-item>\n\n								<comunicazione></comunicazione>\n\n							</ion-item>\n\n							<ion-item>\n\n								<comunicazione></comunicazione>\n\n							</ion-item>\n\n						</ion-list>\n\n				</ion-card> \n\n			</ion-col>-->\n\n			<!-- <ion-col  >\n\n					<ion-card color="primary" class="rounded-generic-card generic-card-blue">\n\n						<ion-card-header class="generic-card-header blue-header">{{header3}}</ion-card-header>\n\n						<ion-card-content class="yellow-header">{{content3}}</ion-card-content>\n\n					</ion-card>\n\n			</ion-col> -->\n\n			<ion-col  col-sm col-12>\n\n				<!--<div class="card card-large">\n\n					<div class="card-header bg-comm text-header text-white">{{header3}}</div>\n\n					<div class="card-body">\n\n						\n\n						<ul class="list-group list-group-flush comm" >\n\n							<home-com *ngFor="let data of comunicazioniMin" [data] = "data">\n\n							</home-com>\n\n						</ul>\n\n\n\n					</div>\n\n				</div>-->\n\n				<comunicazioni-card></comunicazioni-card>\n\n			</ion-col>\n\n			<ion-col  col-sm col-12>\n\n				<circolari-card></circolari-card>\n\n			</ion-col>\n\n			<ion-col  col-sm col-6>\n\n				<!--<div class="card" (click)="goToChat()">\n\n					<div class="card-header bg-chat text-header text-white">{{headerChat}}</div>\n\n					<div class="card-body">{{contentChat}}</div>\n\n				</div>-->\n\n				<chat-card *ngIf="this.presenze[\'chat\']=\'true\'"></chat-card>\n\n			</ion-col>\n\n			<ion-col  col-sm col-6>\n\n				<!--<div class="card">\n\n					<div class="card-header bg-priority text-header text-white">{{header2}}</div>\n\n					<div class="card-body">\n\n						<ul class="list-group list-group-flush priority" >\n\n							<home-prio *ngFor="let data of prioritaMin" [data] = "data">\n\n							</home-prio>\n\n						</ul>\n\n					</div>\n\n				</div>-->\n\n				<priorita-card *ngIf="this.presenze[\'priorita\']=\'true\'"  ></priorita-card>\n\n			</ion-col>\n\n		\n\n			<!--<ion-col col-6>\n\n					<button  block outline class="rounded-generic-card button-large button-large-green" ion-button>\n\n						<div>Documentale</div>\n\n						<ion-icon class="icon-button" name="paper">\n\n						</ion-icon>\n\n						\n\n					</button>\n\n			</ion-col>-->\n\n			<ion-col col-6>\n\n				<news-card *ngIf="this.presenze[\'news\']=\'true\'" ></news-card>\n\n			</ion-col>\n\n			<ion-col col-6>\n\n				<messaggi-card *ngIf="this.presenze[\'messaggi\']=\'true\'" ></messaggi-card>\n\n			</ion-col>\n\n			<ion-col col-6>\n\n				<documentale-card *ngIf="this.presenze[\'documentale\']=\'true\'" ></documentale-card>\n\n			</ion-col>\n\n			<!--<ion-col col-6>\n\n				<button (click)="goToContact()"  block outline class="text-default rounded-generic-card button-large button-large-blue" ion-button>\n\n					<div>Rubrica</div>\n\n					<ion-icon class="icon-button" name="contacts">\n\n					</ion-icon>				\n\n				</button>\n\n			</ion-col>-->\n\n			<ion-col col-6>\n\n				<contact-card *ngIf="this.presenze[\'contatti\']=\'true\'" ></contact-card>\n\n			</ion-col>\n\n			\n\n		</ion-row>\n\n		\n\n	</ion-grid>\n\n	\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_10_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_10_ionic_angular__["b" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10_ionic_angular__["b" /* AlertController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__services_store_store_service__["a" /* StoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_store_store_service__["a" /* StoreService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__services_login_login_service__["a" /* LoginService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_login_login_service__["a" /* LoginService */]) === "function" && _f || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=home.js.map

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ChatPage = /** @class */ (function () {
    function ChatPage(ref, http, navCtrl) {
        this.ref = ref;
        this.http = http;
        this.navCtrl = navCtrl;
        this.licenseKey = "Z8AZN-TX6NP-3KETR-LDF4L-SF1LP"; // Replace the value with your CometChat License Key;
        this.apiKey = "16d09e11cf125fa84d7450ed3e114642"; // Replace the value with your CometChat Api Key;
        this.UID1 = "cometchat";
        this.UID2 = "SUPERHERO2";
        this.isLoading = false;
        this.disableInitialize = false;
        this.disableSuperHero1 = true;
        this.disableSuperHero2 = true;
        this.disableLaunch = true;
    }
    ChatPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    ChatPage.prototype.initializeChat = function () {
        var _this = this;
        var __this = this;
        this.showLoader();
        this.disableInitialize = true;
        CCCometChat.getInstance(function (r) { return alert("ok"); }, function (r) { return alert("ko"); });
        CCCometChat.initializeCometChat("http://testchat.mesys.it/cometchat/", this.licenseKey, this.apiKey, true, function (response) {
            alert("Inside Success Callback " + response);
            __this.disableLogins(false);
            __this.showLoader(false);
            __this.ref.detectChanges();
        }, function (error) {
            alert("Fail Callback " + error);
            _this.disableInitialize = false;
            _this.showLoader(false);
        });
    };
    ChatPage.prototype.login = function (UID) {
        var __this = this;
        this.showLoader(false);
        this.disableLogins();
        CCCometChat.login("ugoj", "1234", function success(response) {
            alert("Logged in as : " + UID + " Response : " + response);
            __this.disableLaunch = false;
            __this.showLoader(false);
        }, function failure(error) {
            alert("Login failure Callback " + error);
            __this.disableLogins(false);
            __this.showLoader(false);
        });
        /**CCCometChat.guestLogin(UID, function success(response) {
           alert("Logged in as : " + UID + " Response : " + response);
           __this.disableLaunch = false;
           __this.showLoader(false);
         }, function failure(error) {
           alert("Login failure Callback " + error);
           __this.disableLogins(false);
           __this.showLoader(false);
         });**/
    };
    /**login(UID) {
      var __this = this;
      this.showLoader(false);
      this.disableLogins();
      CCCometChat.loginWithUID(UID, function success(response) {
        alert("Logged in as : " + UID + " Response : " + response);
        __this.disableLaunch = false;
        __this.showLoader(false);
      }, function failure(error) {
        alert("Login failure Callback " + error);
        __this.disableLogins(false);
        __this.showLoader(false);
      });
    }**/
    ChatPage.prototype.launchChat = function () {
        var __this = this;
        var isFullScreen = false;
        this.showLoader(true);
        CCCometChat.launchCometChat(isFullScreen, function success(data) {
            alert(" success " + data);
            __this.showLoader(false);
        }, function error(data) {
            alert(" fail " + data);
            __this.showLoader(false);
        });
    };
    ChatPage.prototype.showLoader = function (show) {
        if (show === void 0) { show = true; }
        this.isLoading = show;
        this.ref.detectChanges();
    };
    ChatPage.prototype.disableLogins = function (disable) {
        if (disable === void 0) { disable = true; }
        this.disableSuperHero1 = disable;
        this.disableSuperHero2 = disable;
        this.ref.detectChanges();
    };
    ChatPage.prototype.createUser = function () {
        this.http.post("http://testchat.mesys.it/cometchat/api/createuser", {
            "api-key": "16d09e11cf125fa84d7450ed3e114642",
            "username": "ugo",
            "password": "1234",
            "displayname": "ugo"
        }).subscribe(function (res) { return alert("success" + res); });
    };
    ChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-chat',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\chat\chat.html"*/'<ion-header>\n\n  <ion-navbar  hideBackButton>\n\n      <ion-buttons left>\n\n          <button (click)="back()" ion-button icon-left clear small>\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n        </button>\n\n        </ion-buttons>\n\n    <ion-title>\n\n      CometChat Ionic Sample App\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div class="cometchat_logodiv">\n\n    <ion-avatar class="cometchat_logo" width="150" height="150">\n\n      <ion-img width="150" height="150" src="assets/imgs/logo.png"></ion-img>\n\n    </ion-avatar>\n\n    <div class="loader" *ngIf="isLoading">\n\n    </div>\n\n  </div>\n\n  <ion-list>\n\n    <ion-row>\n\n      <button ion-button color="primary" block [disabled]="disableInitialize" (click)="initializeChat()">Initialize CometChat</button>\n\n    </ion-row>\n\n\n\n    <ion-row>\n\n      <ion-col>\n\n        <button ion-button color="primary" block [disabled]="disableSuperHero1" (click)="login(UID1)">Login As\n\n          <br/> SuperHero1</button>\n\n      </ion-col>\n\n      <ion-col>\n\n        <button ion-button color="primary" block [disabled]="disableSuperHero2" (click)="login(UID2)">Login As\n\n          <br/>SuperHero2</button>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n    <ion-row>\n\n      <button ion-button color="primary" block  (click)="launchChat()">Launch CometChat</button>\n\n    </ion-row>\n\n    <ion-row>\n\n      <button ion-button color="primary" block  (click)="createUser()">create user</button>\n\n    </ion-row>\n\n\n\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\chat\chat.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_core__["j" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */]])
    ], ChatPage);
    return ChatPage;
}());

//# sourceMappingURL=chat.js.map

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_login_login_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_shared_error_service__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_login_login_namespace__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(64);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the ComunicazioneComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(loginService, navCtrl, alertCtrl, store, error) {
        this.loginService = loginService;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.store = store;
        this.error = error;
        this.username = "";
        this.password = "";
        this.userData = new __WEBPACK_IMPORTED_MODULE_5__models_login_login_namespace__["a" /* Login */].Token;
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        this.loginService.login(this.username, this.password).subscribe(function (r) {
            console.log(r);
            if (r.result != "E") {
                _this.userData = r;
                _this.store.setUserData(_this.userData);
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */], { val: 'pippo' });
            }
            else {
                //throw new Error("test Error");
                //let ed = new Error.ErrorData();
                //ed.message = "errore nel login" ; 
                //this.error.sendError(ed);
                _this.presentAlert();
            }
        });
    };
    LoginPage.prototype.presentAlert = function () {
        // se serve, qui si puo' mettere una chiamata per tenere traccia di chi ha tentato e fallito il login
        var alert = this.alertCtrl.create({
            title: 'Login Failed',
            subTitle: 'Retry',
            buttons: ['Again']
        });
        alert.present();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'login',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\login\login.html"*/'<ion-content class="bg-dark login" padding>\n\n  <form (ngSubmit)="login()" #registerForm="ngForm" class="container">\n\n    <div class="card card-transp card-login mx-auto mt-5">\n\n        <ion-row class="card-header-login">\n\n            <ion-col>\n\n              <div class="logo">AllInApp</div>\n\n            </ion-col>\n\n          </ion-row>\n\n          <ion-row class="card-body">\n\n            <ion-col>\n\n              <ion-list inset>\n\n                <div class="form-group">\n\n                  <input class="form-control" type="text" placeholder="Email" name="email" [(ngModel)]="username" required/>\n\n                </div>\n\n                <div class="form-group">\n\n                  <input class="form-control" type="password" placeholder="Password" name="password" [(ngModel)]="password" required/>  \n\n                </div>\n\n              </ion-list>\n\n            </ion-col>\n\n          </ion-row>\n\n        <ion-row>\n\n          <ion-col>\n\n            <span class="switch switch-sm">\n\n              <input type="checkbox" class="switch" id="switch-id">\n\n              <label for="switch-id">Salva</label>\n\n            </span>\n\n          </ion-col>\n\n          <ion-col>\n\n            <button ion-button class="btn btn-transparent btn-block" full type="submit" [disabled]="!registerForm.form.valid">Entra</button>\n\n          </ion-col>\n\n        </ion-row>\n\n    </div>\n\n  </form>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\login\login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_login_login_service__["a" /* LoginService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_0__services_store_store_service__["a" /* StoreService */],
            __WEBPACK_IMPORTED_MODULE_4__services_shared_error_service__["a" /* ErrorService */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComunicazioniDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_shared_http_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_comunicazione_comunicazione_namespace__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ComunicazioniPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ComunicazioniDetailsPage = /** @class */ (function () {
    function ComunicazioniDetailsPage(navCtrl, navParams, store, http, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.store = store;
        this.http = http;
        this.alertCtrl = alertCtrl;
    }
    ComunicazioniDetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        var c = this.navParams.get('com');
        this.com = new __WEBPACK_IMPORTED_MODULE_4__models_comunicazione_comunicazione_namespace__["a" /* Comunicazione */].Comunicazione;
        var s = this.store.userData$.subscribe(function (val) {
            var s1 = _this.http.getComunicazione(val.token_value, c.comunicazione_key).subscribe(function (val1) {
                _this.com = val1.comunicazione;
                s1.unsubscribe();
            });
            var s2 = _this.http.setReadComunicazione(val.token_value, c.comunicazione_key).subscribe(function (val2) {
                s2.unsubscribe();
            });
            s.unsubscribe();
        });
        this.store.getUserData();
    };
    ComunicazioniDetailsPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    ComunicazioniDetailsPage.prototype.delete = function () {
        var _this = this;
        var s = this.store.userData$.subscribe(function (val) {
            var s1 = _this.http.setDeletedComunicazione(val.token_value, _this.com.comunicazione_key).subscribe(function (val1) {
                if (val1.ErrorMessage.msg_code == 0) {
                    var alert = _this.alertCtrl.create({
                        title: 'Cancellazione',
                        subTitle: 'Cancellazzione andata a buon fine',
                        buttons: ['Dismiss']
                    });
                    alert.present();
                    _this.navCtrl.pop();
                }
                else {
                    var alert = _this.alertCtrl.create({
                        title: 'Cancellazione',
                        subTitle: 'Cancellazzione fallita',
                        buttons: ['Dismiss']
                    });
                    alert.present();
                }
                s1.unsubscribe();
            });
            s.unsubscribe();
        });
        this.store.getUserData();
    };
    ComunicazioniDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'comunicazioni-details',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\comunicazioni-details\comunicazioni-details.html"*/'<ion-header>\n\n  <ion-navbar hideBackButton>\n\n    <ion-buttons left>\n\n      <button (click)="back()" ion-button icon-left clear small>\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n      </button>\n\n      </ion-buttons>\n\n      <ion-title>\n\n        <div class="text-default" >Comunicazioni</div>\n\n      </ion-title>\n\n      <ion-buttons end>\n\n          <button><ion-icon class="icon-button" name="contact" class="nav-icon text-default"></ion-icon></button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  <ion-content>\n\n    <div style="float:right;font-size: 2em;">\n\n      <ion-icon (click)="delete()"  name="trash"></ion-icon>\n\n    </div>\n\n  <img src={{com.cm_immagine}}>\n\n   <h1>{{com.cm_titolo}}</h1>\n\n    <p>{{com.cm_descrizione}}</p>\n\n    <p>{{com.cm_allegato}}</p>\n\n    <p>{{com.cm_data}}</p>\n\n  </ion-content>'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\comunicazioni-details\comunicazioni-details.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_store_store_service__["a" /* StoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_store_store_service__["a" /* StoreService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__services_shared_http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__services_shared_http_service__["a" /* HttpService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */]) === "function" && _e || Object])
    ], ComunicazioniDetailsPage);
    return ComunicazioniDetailsPage;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=comunicazioni-details.js.map

/***/ }),
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CircolariPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__circolari_details_circolari_details__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ComunicazioniPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CircolariPage = /** @class */ (function () {
    function CircolariPage(navCtrl, navParams, store, http, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.store = store;
        this.http = http;
        this.alertCtrl = alertCtrl;
    }
    CircolariPage.prototype.ngOnInit = function () {
        var _this = this;
        var s = this.store.userData$.subscribe(function (val) {
            var s1 = _this.http.getComunicazioniElenco(val.token_value, 0, 0, 'X', 'R').subscribe(function (val1) {
                _this.comFull = val1.l_lista_comunicazione;
                s1.unsubscribe();
            });
            s.unsubscribe();
        });
        this.store.getUserData();
    };
    CircolariPage.prototype.goToDetails = function (com) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__circolari_details_circolari_details__["a" /* CircolariDetailsPage */], { com: com });
    };
    CircolariPage.prototype.back = function () {
        var _this = this;
        var s = this.store.userData$.subscribe(function (val) {
            var s1 = _this.http.getComunicazioniElenco(val.token_value, 0, 0, 'X', 'R').subscribe(function (val1) {
                _this.comFull = val1.l_lista_comunicazione;
                var lette = true;
                for (var i = 1; i < _this.comFull.length; i++) {
                    if (_this.comFull[i].dc_letta == "N")
                        lette = false;
                }
                if (lette == true)
                    _this.navCtrl.pop();
                else {
                    var alert = _this.alertCtrl.create({
                        title: 'Aspetta!!',
                        subTitle: 'prima leggi tutte le circolari',
                        buttons: ['Ok']
                    });
                    alert.present();
                }
                s1.unsubscribe();
            });
            s.unsubscribe();
        });
        this.store.getUserData();
    };
    CircolariPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-circolari',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\circolari\circolari.html"*/'<ion-header>\n\n  <ion-navbar hideBackButton>\n\n    <ion-buttons left>\n\n      <button (click)="back()" ion-button icon-left clear small>\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-buttons end>\n\n      <button><ion-icon class="icon-button" name="news" class="nav-icon text-default"></ion-icon></button>\n\n    </ion-buttons>\n\n    <ion-title >\n\n      <div class="text-default">Circolari</div>\n\n    </ion-title>\n\n    \n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div *ngFor="let com of comFull">\n\n    <ion-card class="border-blue" *ngIf="com.dc_letta==\'N\'" (click)="goToDetails(com)"  >\n\n      <ion-card-content >\n\n        <h1 >\n\n          {{com.cm_titolo}}\n\n        </h1>\n\n        <p>\n\n        {{com.cm_descrizione}}\n\n        </p>\n\n      </ion-card-content>\n\n    </ion-card>\n\n    <ion-card class="border-green" *ngIf="com.dc_letta==\'S\'" (click)="goToDetails(com)"  >\n\n      <ion-card-content >\n\n        <h1 >\n\n          {{com.cm_titolo}}\n\n        </h1>\n\n        <p>\n\n        {{com.cm_descrizione}}\n\n        </p>\n\n      </ion-card-content>\n\n    </ion-card>\n\n</div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\circolari\circolari.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_store_store_service__["a" /* StoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_store_store_service__["a" /* StoreService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__["a" /* HttpService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* AlertController */]) === "function" && _e || Object])
    ], CircolariPage);
    return CircolariPage;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=circolari.js.map

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiUscitaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__messaggi_details_messaggi_details__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_store_store_service__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MessaggiUscitaPage = /** @class */ (function () {
    function MessaggiUscitaPage(navCtrl, store, http, alertCtrl) {
        this.navCtrl = navCtrl;
        this.store = store;
        this.http = http;
        this.alertCtrl = alertCtrl;
    }
    MessaggiUscitaPage.prototype.ngOnInit = function () {
        var _this = this;
        var s = this.store.userData$.subscribe(function (val) {
            var s1 = _this.http.getMessaggeList(val.token_value, '0', '0', 'O').subscribe(function (val1) {
                _this.messFull = val1.l_lista_messaggi;
                s1.unsubscribe();
            });
            s.unsubscribe();
        });
        this.store.getUserData();
    };
    MessaggiUscitaPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    MessaggiUscitaPage.prototype.goToDetails = function (mess) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__messaggi_details_messaggi_details__["a" /* MessaggiDetailsPage */], { mess: mess });
    };
    MessaggiUscitaPage.prototype.setStar = function (mess, stato) {
        var _this = this;
        var s = this.store.userData$.subscribe(function (val) {
            var s1 = _this.http.setStarMessage(val.token_value, mess.messaggi_key, stato).subscribe(function (r) {
                console.log(r);
                if (r.ErrorMessage.msg_code == 0) {
                    mess.preferito = stato;
                }
                s1.unsubscribe();
            });
            s.unsubscribe();
        });
        this.store.getUserData();
    };
    MessaggiUscitaPage.prototype.setDelete = function (mess) {
        var _this = this;
        var s = this.store.userData$.subscribe(function (val) {
            var s1 = _this.http.setDeleteMessage(val.token_value, mess.messaggi_key).subscribe(function (r) {
                console.log(r);
                s1.unsubscribe();
            });
            s.unsubscribe();
        });
        this.store.getUserData();
    };
    MessaggiUscitaPage.prototype.deleteConfirm = function (mess) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Conferma',
            message: 'spostare questo messaggio nel cestino?',
            buttons: [
                {
                    text: 'indietro',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'ok',
                    handler: function () {
                        _this.setDelete(mess);
                    }
                }
            ]
        });
        alert.present();
    };
    MessaggiUscitaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'messaggi-uscita',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\messaggi-uscita\messaggi-uscita.html"*/'<ion-header>\n\n    <ion-navbar hideBackButton>\n\n        <ion-buttons left>\n\n            <button ion-button menuToggle><ion-icon name="menu"></ion-icon></button>\n\n          </ion-buttons>\n\n      <ion-buttons right>\n\n        <button (click)="back()" ion-button icon-left clear small>\n\n          <ion-icon name="arrow-back"></ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n      \n\n      <ion-title >\n\n        <div class="text-default">USCITA</div>\n\n      </ion-title>\n\n      \n\n    </ion-navbar>\n\n\n\n  </ion-header>\n\n\n\n  <ion-content>\n\n      <button ion-button menuToggle>Toggle Menu</button>\n\n\n\n          <ion-list >\n\n              \n\n              <ion-item class="list-group-item" *ngFor="let mess of messFull"  >\n\n                  \n\n                  <div class=" box item" >\n\n                      <ion-icon name="eye" (click)="goToDetails(mess)"></ion-icon>\n\n                      <ion-icon name="checkbox"></ion-icon>\n\n                      <ion-icon name="star-outline" *ngIf="mess.preferito==\'\'" (click)="setStar(mess,\'S\')"></ion-icon>\n\n                      <ion-icon name="star-outline" *ngIf="mess.preferito==\'N\'" (click)="setStar(mess,\'S\')"></ion-icon>\n\n                      <ion-icon name="star" *ngIf="mess.preferito==\'S\'" (click)="setStar(mess,\'N\')"></ion-icon>\n\n                      <ion-icon name="trash" (click)="deleteConfirm(mess)"></ion-icon>\n\n                    </div>\n\n                    <div class=" box brief contact-small ">\n\n                      <h5 class="name ">{{mess.cognome_mit}} {{mess.nome_mit}}</h5>\n\n                      <p class="text ">{{mess.soggetto}}</p>\n\n                      <i class="fa fa-mobile device"></i>\n\n                    </div>\n\n                    <div class="box data">\n\n                      {{mess.data}}\n\n                    </div>\n\n                </ion-item>\n\n        </ion-list>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\messaggi-uscita\messaggi-uscita.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__services_store_store_service__["a" /* StoreService */], __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */]])
    ], MessaggiUscitaPage);
    return MessaggiUscitaPage;
}());

//# sourceMappingURL=messaggi-uscita.js.map

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Messaggi; });
var Messaggi;
(function (Messaggi) {
    var MessaggiErrore = /** @class */ (function () {
        function MessaggiErrore() {
        }
        return MessaggiErrore;
    }());
    Messaggi.MessaggiErrore = MessaggiErrore;
    //elemento lista messaggi
    var MessaggiElem = /** @class */ (function () {
        function MessaggiElem() {
        }
        return MessaggiElem;
    }());
    Messaggi.MessaggiElem = MessaggiElem;
    var MessaggiList = /** @class */ (function () {
        function MessaggiList() {
        }
        return MessaggiList;
    }());
    Messaggi.MessaggiList = MessaggiList;
    var MessaggioResult = /** @class */ (function () {
        function MessaggioResult() {
        }
        return MessaggioResult;
    }());
    Messaggi.MessaggioResult = MessaggioResult;
    var BustaMessaggio = /** @class */ (function () {
        function BustaMessaggio() {
        }
        return BustaMessaggio;
    }());
    Messaggi.BustaMessaggio = BustaMessaggio;
    var Messaggio = /** @class */ (function () {
        function Messaggio() {
        }
        return Messaggio;
    }());
    Messaggi.Messaggio = Messaggio;
    var Conoscenza = /** @class */ (function () {
        function Conoscenza() {
        }
        return Conoscenza;
    }());
    Messaggi.Conoscenza = Conoscenza;
})(Messaggi || (Messaggi = {}));
//# sourceMappingURL=messaggi.namespace.js.map

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiCestinoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__messaggi_details_messaggi_details__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_shared_http_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_messaggi_messaggi_namespace__ = __webpack_require__(120);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MessaggiCestinoPage = /** @class */ (function () {
    function MessaggiCestinoPage(navCtrl, store, http) {
        this.navCtrl = navCtrl;
        this.store = store;
        this.http = http;
    }
    MessaggiCestinoPage.prototype.ngOnInit = function () {
        var _this = this;
        var s = this.store.userData$.subscribe(function (val) {
            var s1 = _this.http.getMessaggeList(val.token_value, '0', '0', 'D').subscribe(function (val1) {
                _this.messFull = val1.l_lista_messaggi;
                s1.unsubscribe();
            });
            s.unsubscribe();
        });
        this.store.getUserData();
    };
    MessaggiCestinoPage.prototype.goToDetails = function (mess) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__messaggi_details_messaggi_details__["a" /* MessaggiDetailsPage */], { mess: mess });
    };
    MessaggiCestinoPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    MessaggiCestinoPage.prototype.delete = function (mess) {
        var _this = this;
        var s = this.store.userData$.subscribe(function (val) {
            var busta = new __WEBPACK_IMPORTED_MODULE_5__models_messaggi_messaggi_namespace__["a" /* Messaggi */].BustaMessaggio();
            busta.messaggio = mess;
            busta.token = val.token_value;
            var s1 = _this.http.deleteMessage(busta).subscribe(function (val1) {
                console.log(busta);
                console.log(val1);
                var canc = null;
                if (val.ErrorMessage.msg_code == 0) {
                    for (var i = void 0; i < _this.messFull.length; i++) {
                        if (_this.messFull[i].messaggi_key == mess.messaggi_key) {
                            canc = i;
                        }
                    }
                    ;
                    if (canc != null)
                        _this.messFull.slice(canc, 1);
                    alert("messaggio eliminato");
                }
                else {
                    alert("errore cancellazione");
                }
                s1.unsubscribe();
            });
            s.unsubscribe();
        });
        this.store.getUserData();
    };
    MessaggiCestinoPage.prototype.ripristina = function (mess) {
    };
    MessaggiCestinoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'messaggi-cestino',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\messaggi-cestino\messaggi-cestino.html"*/'<ion-header>\n\n    <ion-navbar hideBackButton>\n\n        <ion-buttons left>\n\n            <button ion-button menuToggle><ion-icon name="menu"></ion-icon></button>\n\n          </ion-buttons>\n\n      <ion-buttons right>\n\n        <button (click)="back()" ion-button icon-left clear small>\n\n          <ion-icon name="arrow-back"></ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n      \n\n      <ion-title >\n\n        <div class="text-default">CESTINO</div>\n\n      </ion-title>\n\n      \n\n    </ion-navbar>\n\n\n\n  </ion-header>\n\n\n\n  <ion-content>\n\n      <button ion-button menuToggle>Toggle Menu</button>\n\n\n\n          <ion-list >\n\n              \n\n              <ion-item class="list-group-item" *ngFor="let mess of messFull"  >\n\n                  \n\n                  <div class=" box item" >\n\n                      <ion-icon name="eye" (click)="goToDetails(mess)"></ion-icon>\n\n                      <ion-icon name="close"  (click)="delete(mess)"></ion-icon>\n\n                      <ion-icon name="cloud-upload"  (click)="ripristina(mess)"></ion-icon>\n\n                    </div>\n\n                    <div class=" box brief contact-small ">\n\n                      <h5 class="name ">{{mess.cognome_mit}} {{mess.nome_mit}}</h5>\n\n                      <p class="text ">{{mess.soggetto}}</p>\n\n                      <i class="fa fa-mobile device"></i>\n\n                    </div>\n\n                    <div class="box data">\n\n                      {{mess.data}}\n\n                    </div>\n\n                </ion-item>\n\n        </ion-list>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\messaggi-cestino\messaggi-cestino.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__services_store_store_service__["a" /* StoreService */], __WEBPACK_IMPORTED_MODULE_2__services_shared_http_service__["a" /* HttpService */]])
    ], MessaggiCestinoPage);
    return MessaggiCestinoPage;
}());

//# sourceMappingURL=messaggi-cestino.js.map

/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiImportantiPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__messaggi_details_messaggi_details__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MessaggiImportantiPage = /** @class */ (function () {
    function MessaggiImportantiPage(navCtrl, store, http, alertCtrl) {
        this.navCtrl = navCtrl;
        this.store = store;
        this.http = http;
        this.alertCtrl = alertCtrl;
    }
    MessaggiImportantiPage.prototype.ngOnInit = function () {
        var _this = this;
        var s = this.store.userData$.subscribe(function (val) {
            var s1 = _this.http.getMessaggeList(val.token_value, '0', '0', 'P').subscribe(function (val1) {
                _this.messFull = val1.l_lista_messaggi;
            });
            s.unsubscribe();
        });
        this.store.getUserData();
    };
    MessaggiImportantiPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    MessaggiImportantiPage.prototype.setStar = function (mess, stato) {
        var _this = this;
        var s = this.store.userData$.subscribe(function (val) {
            var s1 = _this.http.setStarMessage(val.token_value, mess.messaggi_key, stato).subscribe(function (r) {
                console.log(r);
                if (r.ErrorMessage.msg_code == 0) {
                    mess.preferito = stato;
                }
                s1.unsubscribe();
            });
            s.unsubscribe();
        });
        this.store.getUserData();
    };
    MessaggiImportantiPage.prototype.setDelete = function (mess) {
        var _this = this;
        var s = this.store.userData$.subscribe(function (val) {
            var s1 = _this.http.setDeleteMessage(val.token_value, mess.messaggi_key).subscribe(function (r) {
                console.log(r);
                s1.unsubscribe();
            });
            s.unsubscribe();
        });
        this.store.getUserData();
    };
    MessaggiImportantiPage.prototype.deleteConfirm = function (mess) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Conferma',
            message: 'spostare questo messaggio nel cestino?',
            buttons: [
                {
                    text: 'indietro',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'ok',
                    handler: function () {
                        _this.setDelete(mess);
                    }
                }
            ]
        });
        alert.present();
    };
    MessaggiImportantiPage.prototype.goToDetails = function (mess) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__messaggi_details_messaggi_details__["a" /* MessaggiDetailsPage */], { mess: mess });
    };
    MessaggiImportantiPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'messaggi-importanti',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\messaggi-importanti\messaggi-importanti.html"*/'<ion-header>\n\n  <ion-navbar hideBackButton>\n\n      <ion-buttons left>\n\n          <button ion-button menuToggle><ion-icon name="menu"></ion-icon></button>\n\n        </ion-buttons>\n\n    <ion-buttons right>\n\n      <button (click)="back()" ion-button icon-left clear small>\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    \n\n    <ion-title >\n\n      <div class="text-default">IMPORTANTI</div>\n\n    </ion-title>\n\n    \n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <button ion-button menuToggle>Toggle Menu</button>\n\n\n\n        <ion-list >\n\n            \n\n            <ion-item class="list-group-item" *ngFor="let mess of messFull"  >\n\n                \n\n                <div class=" box item" >\n\n                    <ion-icon name="eye" (click)="goToDetails(mess)"></ion-icon>\n\n                    <ion-icon name="checkbox"></ion-icon>\n\n                    <ion-icon name="star-outline" *ngIf="mess.preferito==\'\'" (click)="setStar(mess,\'S\')"></ion-icon>\n\n                      <ion-icon name="star-outline" *ngIf="mess.preferito==\'N\'" (click)="setStar(mess,\'S\')"></ion-icon>\n\n                      <ion-icon name="star" *ngIf="mess.preferito==\'S\'" (click)="setStar(mess,\'N\')"></ion-icon>\n\n                      <ion-icon name="trash" (click)="deleteConfirm(mess)"></ion-icon>\n\n                  </div>\n\n                  <div class=" box brief contact-small ">\n\n                    <h5 class="name ">{{mess.cognome_mit}} {{mess.nome_mit}}</h5>\n\n                    <p class="text ">{{mess.soggetto}}</p>\n\n                    <i class="fa fa-mobile device"></i>\n\n                  </div>\n\n                  <div class="box data">\n\n                    {{mess.data}}\n\n                  </div>\n\n              </ion-item>\n\n      </ion-list>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\messaggi-importanti\messaggi-importanti.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_store_store_service__["a" /* StoreService */], __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */]])
    ], MessaggiImportantiPage);
    return MessaggiImportantiPage;
}());

//# sourceMappingURL=messaggi-importanti.js.map

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__messaggi_uscita_messaggi_uscita__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__messaggi_cestino_messaggi_cestino__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_shared_http_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__messaggi_nuovo_messaggi_nuovo__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__messaggi_details_messaggi_details__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__messaggi_importanti_messaggi_importanti__ = __webpack_require__(122);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MessaggiPage = /** @class */ (function () {
    function MessaggiPage(navCtrl, navParams, menuCtrl, store, http, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.store = store;
        this.http = http;
        this.alertCtrl = alertCtrl;
    }
    MessaggiPage.prototype.ngOnInit = function () {
        var _this = this;
        this.messFull = this.navParams.get('messFull');
        console.log(this.messFull);
        var s = this.store.userData$.subscribe(function (val) {
            var s1 = _this.http.getMessaggeList(val.token_value, "0", "0", "I").subscribe(function (res) {
                console.log(res);
                if (res.ErrorMessage.msg_code == 0) {
                    _this.messFull = res.l_lista_messaggi;
                }
                else {
                    console.log("errore ricezione News");
                }
                s1.unsubscribe();
            });
            s.unsubscribe();
        });
        this.store.getUserData();
    };
    MessaggiPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    MessaggiPage.prototype.goToDetails = function (mess) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__messaggi_details_messaggi_details__["a" /* MessaggiDetailsPage */], { mess: mess });
    };
    MessaggiPage.prototype.goTonuovoMessaggio = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__messaggi_nuovo_messaggi_nuovo__["a" /* MessaggiNuovoPage */]);
    };
    MessaggiPage.prototype.goToUscitaMessaggi = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__messaggi_uscita_messaggi_uscita__["a" /* MessaggiUscitaPage */]);
    };
    MessaggiPage.prototype.goToImportantiMessaggi = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__messaggi_importanti_messaggi_importanti__["a" /* MessaggiImportantiPage */]);
    };
    MessaggiPage.prototype.goToCestinoMessaggio = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__messaggi_cestino_messaggi_cestino__["a" /* MessaggiCestinoPage */]);
    };
    MessaggiPage.prototype.setStar = function (mess, stato) {
        var _this = this;
        var s = this.store.userData$.subscribe(function (val) {
            var s1 = _this.http.setStarMessage(val.token_value, mess.messaggi_key, stato).subscribe(function (r) {
                console.log(r);
                if (r.ErrorMessage.msg_code == 0) {
                    mess.preferito = stato;
                }
                s1.unsubscribe();
            });
            s.unsubscribe();
        });
        this.store.getUserData();
    };
    MessaggiPage.prototype.setDelete = function (mess) {
        var _this = this;
        var s = this.store.userData$.subscribe(function (val) {
            var s1 = _this.http.setDeleteMessage(val.token_value, mess.messaggi_key).subscribe(function (r) {
                console.log(r);
                s1.unsubscribe();
            });
            s.unsubscribe();
        });
        this.store.getUserData();
    };
    MessaggiPage.prototype.deleteConfirm = function (mess) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Conferma',
            message: 'spostare questo messaggio nel cestino?',
            buttons: [
                {
                    text: 'indietro',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'ok',
                    handler: function () {
                        _this.setDelete(mess);
                    }
                }
            ]
        });
        alert.present();
    };
    MessaggiPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_7__angular_core__["m" /* Component */])({
            selector: 'messaggi',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\messaggi\messaggi.html"*/'<ion-header>\n\n    <ion-navbar hideBackButton>\n\n        <ion-buttons left>\n\n            <button ion-button menuToggle><ion-icon name="menu"></ion-icon></button>\n\n          </ion-buttons>\n\n      <ion-buttons right>\n\n        <button (click)="back()" ion-button icon-left clear small>\n\n          <ion-icon name="arrow-back"></ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n      \n\n      <ion-title >\n\n        <div class="text-default">MESSAGGI</div>\n\n      </ion-title>\n\n      \n\n    </ion-navbar>\n\n\n\n  </ion-header>\n\n  \n\n  <!--<ion-menu type="overlay" id="messaggi" [content]="mycontent1">\n\n      <ion-content>\n\n        <ion-list>\n\n        <ion-item (click)="goTonuovoMessaggio()"> Nuovo </ion-item>\n\n        <ion-item (click)="goToUscitaMessaggi()"> Uscita </ion-item>\n\n        <ion-item (click)="goToImportantiMessaggi()">Importanti</ion-item>\n\n        <ion-item (click)="goToCestinoMessaggio()" >Cestino</ion-item>\n\n        <ion-item menuClose detail-none>Nuovo messaggio</ion-item>\n\n        </ion-list>\n\n      </ion-content>\n\n      </ion-menu>\n\n    <ion-nav #mycontent1 [root]="rootPage" ></ion-nav>-->\n\n\n\n  <ion-content>\n\n      <button ion-button menuToggle>Toggle Menu</button>\n\n      <button ion-button (click)="goTonuovoMessaggio()">Nuovo</button>\n\n      <button ion-button (click)="goToUscitaMessaggi()">Uscita</button>\n\n      <button ion-button (click)="goToImportantiMessaggi()">Importanti</button>\n\n      <button ion-button (click)="goToCestinoMessaggio()">Cestino</button>\n\n       <!--<div *ngFor="let mess of messFull">\n\n         <ion-card   (click)="goToDetails(mess)">\n\n            <ion-card-content >\n\n              <h1 >\n\n                {{mess.cognome_mit}}\n\n              </h1>\n\n              <p>\n\n              {{mess.soggetto}}\n\n              </p>\n\n            </ion-card-content>\n\n          </ion-card>-->\n\n\n\n          <ion-list >\n\n              \n\n              <ion-item class="list-group-item" *ngFor="let mess of messFull"  >\n\n                  \n\n                  <div class=" box item" >\n\n                      <ion-icon name="eye" (click)="goToDetails(mess)"></ion-icon>\n\n                      <ion-icon name="checkbox"></ion-icon>\n\n                      <ion-icon name="star-outline" *ngIf="mess.preferito==\'\'" (click)="setStar(mess,\'S\')"></ion-icon>\n\n                      <ion-icon name="star-outline" *ngIf="mess.preferito==\'N\'" (click)="setStar(mess,\'S\')"></ion-icon>\n\n                      <ion-icon name="star" *ngIf="mess.preferito==\'S\'" (click)="setStar(mess,\'N\')"></ion-icon>\n\n                      <ion-icon name="trash" (click)="deleteConfirm(mess)"></ion-icon>\n\n                      <!--<div  class="user-small contact-small">\n\n                        <img  src="{{mess.url_avatar}}">\n\n                      </div>-->\n\n                    </div>\n\n                    <div class=" box brief contact-small ">\n\n                      <h5 class="name ">{{mess.cognome_mit}} {{mess.nome_mit}}</h5>\n\n                      <p class="text ">{{mess.soggetto}}</p>\n\n                      <i class="fa fa-mobile device"></i>\n\n                    </div>\n\n                    <div class="box data">\n\n                      {{mess.data}}\n\n                    </div>\n\n                </ion-item>\n\n        </ion-list>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\messaggi\messaggi.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__services_store_store_service__["a" /* StoreService */], __WEBPACK_IMPORTED_MODULE_3__services_shared_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["b" /* AlertController */]])
    ], MessaggiPage);
    return MessaggiPage;
}());

//# sourceMappingURL=messaggi.js.map

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__news_details_news_details__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NewsPage = /** @class */ (function () {
    function NewsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.borderColor = "border-blue";
    }
    NewsPage.prototype.ngOnInit = function () {
        this.newsFull = this.navParams.get('news');
    };
    NewsPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    NewsPage.prototype.goToDetails = function (news) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__news_details_news_details__["a" /* NewsDetailsPage */], { news: news });
    };
    NewsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'news',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\news\news.html"*/'<ion-header>\n\n    <ion-navbar hideBackButton>\n\n      <ion-buttons left>\n\n        <button (click)="back()" ion-button icon-left clear small>\n\n          <ion-icon name="arrow-back"></ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n      <ion-buttons end>\n\n        <button><ion-icon class="icon-button" name="news" class="nav-icon text-default"></ion-icon></button>\n\n      </ion-buttons>\n\n      <ion-title >\n\n        <div class="text-default">News</div>\n\n      </ion-title>\n\n      \n\n    </ion-navbar>\n\n  </ion-header>\n\n  <ion-content>\n\n    <div *ngFor="let news of newsFull">\n\n      <ion-card  class="border-green" *ngIf="news.dn_letta==\'N\'" (click)="goToDetails(news)">\n\n        <ion-card-content >\n\n          <h1 >\n\n            {{news.nw_titolo}}\n\n          </h1>\n\n          <p>\n\n          {{news.nw_descrizione}}\n\n          </p>\n\n        </ion-card-content>\n\n      </ion-card>\n\n      <ion-card  class="border-blue" *ngIf="news.dn_letta!=\'N\'" (click)="goToDetails(news)">\n\n          <ion-card-content >\n\n            <h1 >\n\n              {{news.nw_titolo}}\n\n            </h1>\n\n            <p>\n\n            {{news.nw_descrizione}}\n\n            </p>\n\n          </ion-card-content>\n\n        </ion-card>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\news\news.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavParams */]])
    ], NewsPage);
    return NewsPage;
}());

//# sourceMappingURL=news.js.map

/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_contact_contact_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_contact_contact_namespace__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_email_composer__ = __webpack_require__(241);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ContactDetailsPage = /** @class */ (function () {
    function ContactDetailsPage(navCtrl, conService, navParams, callNumber, emailComposer, alertCtrl, platform) {
        this.navCtrl = navCtrl;
        this.conService = conService;
        this.navParams = navParams;
        this.callNumber = callNumber;
        this.emailComposer = emailComposer;
        this.alertCtrl = alertCtrl;
    }
    ContactDetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.contact = new __WEBPACK_IMPORTED_MODULE_1__models_contact_contact_namespace__["a" /* Contact */].ContactDataFull();
        this.contact.dipendente = new __WEBPACK_IMPORTED_MODULE_1__models_contact_contact_namespace__["a" /* Contact */].Dipendente();
        this.contactMin = this.navParams.get('contact');
        if (this.contactMin) {
            this.message = 'utente trovato ' + this.contactMin.nome;
            this.conService.contactsFull$.subscribe(function (val) {
                console.log(val);
                if (val != null) {
                    _this.contact = val;
                }
                else {
                    alert("errore recupero risorsa");
                }
            });
            this.conService.GetContactDetails(this.contactMin.dipendenti_key);
        }
        else {
            this.message = 'utente non trovato';
        }
    };
    ContactDetailsPage.prototype.ngOnDestroy = function () {
    };
    ContactDetailsPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    ContactDetailsPage.prototype.call = function () {
        this.callNumber.callNumber(this.contact.dipendente.telefono, true)
            .then(function (res) { return console.log('Launched dialer!', res); })
            .catch(function (err) { return console.log('Error launching dialer', err); });
    };
    ContactDetailsPage.prototype.email = function () {
        var email = {
            to: this.contact.dipendente.email,
        };
        this.emailComposer.open(email);
    };
    ContactDetailsPage.prototype.presentConfirmEmail = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Conferma invio e-mail',
            message: 'Vuoi inviare un\'e-mail a ' + this.contact.dipendente.nome
                + " " + this.contact.dipendente.cognome + '?',
            buttons: [
                {
                    text: 'Indietro',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Conferma',
                    handler: function () {
                        _this.email();
                    }
                }
            ]
        });
        alert.present();
    };
    ContactDetailsPage.prototype.presentConfirmCall = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Conferma chiamata',
            message: 'Vuoi chiamare ' + this.contact.dipendente.nome
                + " " + this.contact.dipendente.cognome + '?',
            buttons: [
                {
                    text: 'Indietro',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Conferma',
                    handler: function () {
                        _this.call();
                    }
                }
            ]
        });
        alert.present();
    };
    ContactDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-contact-details',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\contact-details\contact-details.html"*/'<!--<ion-header>\n\n<ion-navbar hideBackButton>\n\n  <ion-buttons left>\n\n    <button (click)="back()" ion-button icon-left clear small>\n\n      <ion-icon name="arrow-back"></ion-icon>\n\n    </button>\n\n    </ion-buttons>\n\n    <ion-title>\n\n      Rubrica\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-item>\n\n        <img src={{contact.dipendente.url_avatar}} class="avatar-img">\n\n        <h1>{{contact.dipendente.nome}} {{contact.dipendente.cognome}}</h1>\n\n        <ion-grid>\n\n          <ion-row>\n\n          <ion-col class="propretyName">N° INTERNO </ion-col>\n\n          <ion-col class="proprety">{{contact.dipendente.matricola}}</ion-col>\n\n          </ion-row>\n\n          <ion-row>\n\n              <ion-col class="propretyName">RUOLO AZIENDALE  </ion-col>\n\n              <ion-col class="proprety">{{contact.dipendente.ruolo_aziendale}}</ion-col>\n\n          </ion-row>\n\n          <ion-row>\n\n              <ion-col class="propretyName">DIVISIONE </ion-col>\n\n              <ion-col class="proprety">{{contact.dipendente.divisione}}</ion-col>\n\n            </ion-row>\n\n        </ion-grid>\n\n        <div (click)="presentConfirmCall()" class="mailtel"><ion-icon name="call"></ion-icon>{{contact.dipendente.telefono}}</div>\n\n        <div (click)="presentConfirmEmail()" class="mailtel"><ion-icon name="mail"></ion-icon>{{contact.dipendente.email}}</div>\n\n  </ion-item>\n\n</ion-content>-->\n\n\n\n<ion-header>\n\n    <ion-navbar hideBackButton>\n\n      <ion-buttons left>\n\n        <button (click)="back()" ion-button icon-left clear small>\n\n          <ion-icon name="arrow-back"></ion-icon>\n\n        </button>\n\n        </ion-buttons>\n\n        <ion-title>\n\n          <div class="text-default" >RUBRICA</div>\n\n        </ion-title>\n\n        <ion-buttons end>\n\n            <button><ion-icon class="icon-button" name="contact" class="nav-icon text-default"></ion-icon></button>\n\n          </ion-buttons>\n\n      </ion-navbar>\n\n    </ion-header>\n\n    <ion-content>\n\n\n\n      <div class="userData text-center">\n\n        <div class="user-bigger  mt-5 mb-3 addBook marginleftimm">\n\n          <img  src={{contact.dipendente.url_avatar}}>\n\n        </div>\n\n        <h5 class="name">{{contact.dipendente.nome}} {{contact.dipendente.cognome}}</h5>\n\n        <p class="role">{{contact.dipendente.ruolo_aziendale}}</p>\n\n      \n\n        <table class="roleInfo marginleftinfo">\n\n          <tr>\n\n            <td class="text-left">\n\n              N° interno\n\n            </td>\n\n            <td class="text-right">\n\n                {{contact.dipendente.matricola}}\n\n            </td>\n\n          </tr>\n\n          <tr>\n\n            <td class="text-left">\n\n              Ruolo aziendale\n\n            </td>\n\n            <td class="text-right">\n\n                {{contact.dipendente.ruolo_aziendale}}\n\n            </td>\n\n          </tr>\n\n          <tr>\n\n            <td class="text-left">\n\n              Mansione\n\n            </td>\n\n            <td class="text-right">\n\n                {{contact.dipendente.ruolo_aziendale}}\n\n            </td>\n\n          </tr>\n\n        </table>\n\n        <table class="contacts mt-5 mb-5 align-middle marginleftcom">\n\n          <tr (click)="presentConfirmEmail()">\n\n            <td class="text-left">\n\n                <ion-icon name="call"></ion-icon>\n\n            </td>\n\n            <td class="text-right">\n\n              <span>{{contact.dipendente.telefono}}</span>\n\n            </td>\n\n          </tr>\n\n          <tr (click)="presentConfirmCall()">\n\n            <td class="text-left">\n\n                <ion-icon name="mail"></ion-icon>\n\n      \n\n            </td>\n\n            <td class="text-right" >\n\n                {{contact.dipendente.email}}\n\n            </td>\n\n          </tr>\n\n        </table>\n\n        <a href="#" class="btn btn-custom btn-sm">DIPENDENZA GERARCHICA</a>\n\n  </div>\n\n  \n\n\n\n\n\n    </ion-content>\n\n\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\contact-details\contact-details.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_0__services_contact_contact_service__["a" /* ContactService */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_email_composer__["a" /* EmailComposer */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* Platform */]])
    ], ContactDetailsPage);
    return ContactDetailsPage;
}());

//# sourceMappingURL=contact-details.js.map

/***/ }),
/* 126 */,
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ErrorService = /** @class */ (function () {
    function ErrorService(http) {
        this.http = http;
    }
    /**public sendError(url: string) : Observable<Error.ErrorResponse>{
        return this.http.get<Error.ErrorResponse>(url);
    }*/
    ErrorService.prototype.sendError = function (data) {
    };
    ErrorService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], ErrorService);
    return ErrorService;
}());

//# sourceMappingURL=error.service.js.map

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePrioModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_home_prio_home_prio__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HomePrioModule = /** @class */ (function () {
    function HomePrioModule() {
    }
    HomePrioModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_0__pages_home_prio_home_prio__["a" /* HomePrioPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_0__pages_home_prio_home_prio__["a" /* HomePrioPage */]]
        })
    ], HomePrioModule);
    return HomePrioModule;
}());

//# sourceMappingURL=home-prio.module.js.map

/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the LoadingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoadingPage = /** @class */ (function () {
    function LoadingPage(loadingCtrl, navCtrl, store) {
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.store = store;
    }
    LoadingPage.prototype.ngOnInit = function () {
        var _this = this;
        this.presentLoadingDefault();
        this.subscrition = this.store.userData$.subscribe(function (val) {
            if (val != null) {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
            }
            else {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
            }
        });
        this.store.getUserData();
    };
    LoadingPage.prototype.ngOnDestroy = function () {
        this.subscrition.unsubscribe();
    };
    LoadingPage.prototype.presentLoadingDefault = function () {
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        setTimeout(function () {
            loading.dismiss();
        }, 1000);
    };
    LoadingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-loading',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\loading\loading.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>loading</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content >\n  <!--<ion-spinner name="bubbles"></ion-spinner>-->\n</ion-content>\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\loading\loading.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_0__services_store_store_service__["a" /* StoreService */]])
    ], LoadingPage);
    return LoadingPage;
}());

//# sourceMappingURL=loading.js.map

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfiloPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_file_transfer__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_login_login_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_contact_contact_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_contact_contact_namespace__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(247);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ProfiloPage = /** @class */ (function () {
    function ProfiloPage(navCtrl, alertCtrl, login, conService, transfer, camera, loadingCtrl, store, actionSheetCtrl, navController) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.login = login;
        this.conService = conService;
        this.transfer = transfer;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.store = store;
        this.actionSheetCtrl = actionSheetCtrl;
        this.navController = navController;
    }
    ProfiloPage_1 = ProfiloPage;
    ProfiloPage.prototype.ngOnInit = function () {
        var _this = this;
        this.user = new __WEBPACK_IMPORTED_MODULE_4__models_contact_contact_namespace__["a" /* Contact */].ContactDataFull();
        this.user.dipendente = new __WEBPACK_IMPORTED_MODULE_4__models_contact_contact_namespace__["a" /* Contact */].Dipendente();
        this.conService.contactsFull$.subscribe(function (val) {
            if (val != null) {
                _this.user = val;
            }
            else {
                alert("errore recupero risorsa");
            }
        });
        this.conService.GetContactDetails(-1);
    };
    ProfiloPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    ProfiloPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Modifica avatar',
            buttons: [
                {
                    text: 'galleria',
                    handler: function () {
                        _this.changeAvatar("gallery");
                    }
                },
                {
                    text: 'fotocamera',
                    handler: function () {
                        _this.changeAvatar("camera");
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    ProfiloPage.prototype.changeAvatar = function (mode) {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        if (mode == "camera") {
            options = {
                quality: 100,
                destinationType: this.camera.DestinationType.DATA_URL,
                sourceType: this.camera.PictureSourceType.CAMERA
            };
        }
        this.camera.getPicture(options).then(function (imageData) {
            _this.imageURI = imageData;
            var s = _this.store.userData$.subscribe(function (val) {
                s.unsubscribe();
                var s1 = _this.login.changeAvatar(_this.imageURI, val).subscribe(function (r) {
                    s1.unsubscribe();
                    console.log(r);
                    if (r.ErrorMessage.msg_code == 0) {
                        alert("avatar modificato correttamente");
                        _this.navController.pop();
                        _this.navController.push(ProfiloPage_1);
                    }
                    else {
                        alert("errore modifica avatar");
                    }
                });
            });
            _this.store.getUserData();
        }, function (err) {
            console.log(err);
        });
    };
    ProfiloPage = ProfiloPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["m" /* Component */])({
            selector: 'page-profilo',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\profilo\profilo.html"*/'<ion-header>\n\n    <ion-navbar hideBackButton>\n\n      <ion-buttons left>\n\n        <button (click)="back()" ion-button icon-left clear small>\n\n          <ion-icon name="arrow-back"></ion-icon>\n\n        </button>\n\n        </ion-buttons>\n\n        <ion-title>\n\n          <div class="text-default" >PROFILO</div>\n\n        </ion-title>\n\n        <ion-buttons end>\n\n            <button><ion-icon class="icon-button" name="contact" class="nav-icon text-default"></ion-icon></button>\n\n          </ion-buttons>\n\n      </ion-navbar>\n\n    </ion-header>\n\n    <ion-content>\n\n      <!--<ion-item>\n\n            <img src={{user.dipendente.url_avatar}} class="avatar-img"  (click)="presentActionSheet()">\n\n            <ion-icon class="change-img-ico" name="camera" (click)="presentActionSheet()" ></ion-icon>\n\n            <h1>{{user.dipendente.nome}} {{user.dipendente.cognome}}</h1>\n\n            <ion-grid>\n\n              <ion-row>\n\n              <ion-col class="propretyName">RUOLO </ion-col>\n\n              <ion-col class="proprety">{{user.dipendente.ruolo_aziendale}}</ion-col>\n\n              </ion-row>\n\n              <ion-row>\n\n                  <ion-col class="propretyName">UFFICIO </ion-col>\n\n                  <ion-col class="proprety">{{user.dipendente.ufficio}}</ion-col>\n\n              </ion-row>\n\n              <ion-row>\n\n                  <ion-col class="propretyName">RESPONSABILE </ion-col>\n\n                  <ion-col class="proprety">{{user.dipendente.nome_resp_divisione}}</ion-col>\n\n              </ion-row>\n\n              <ion-row>\n\n                <ion-col class="propretyName">SEDE ASSUNZIONE </ion-col>\n\n                <ion-col class="proprety"></ion-col>\n\n              </ion-row>\n\n              <ion-row>\n\n                  <ion-col class="propretyName">SEDE OPERATIVA </ion-col>\n\n                  <ion-col class="proprety"></ion-col>\n\n              </ion-row>\n\n            </ion-grid>\n\n      </ion-item>-->\n\n\n\n\n\n              <div class="userData text-center">\n\n                <div class="user-bigger  mt-5 mb-3 addBook marginleftimm">\n\n                  <img (click)="presentActionSheet()" src={{user.dipendente.url_avatar}}>\n\n                </div>\n\n                <h5 class="name">{{user.dipendente.nome}} {{user.dipendente.cognome}}</h5>\n\n                <p class="role">{{user.dipendente.ruolo_aziendale}}</p>\n\n              \n\n                <table class="roleInfo marginleftinfo">\n\n                  <tr>\n\n                    <td class="text-left">\n\n                      N° interno\n\n                    </td>\n\n                    <td class="text-right">\n\n                        {{user.dipendente.matricola}}\n\n                    </td>\n\n                  </tr>\n\n                  <tr>\n\n                    <td class="text-left">\n\n                      Ruolo aziendale\n\n                    </td>\n\n                    <td class="text-right">\n\n                        {{user.dipendente.ruolo_aziendale}}\n\n                    </td>\n\n                  </tr>\n\n                  <tr>\n\n                    <td class="text-left">\n\n                      Mansione\n\n                    </td>\n\n                    <td class="text-right">\n\n                        {{user.dipendente.ruolo_aziendale}}\n\n                    </td>\n\n                  </tr>\n\n                </table>\n\n                <table class="contacts mt-5 mb-5 align-middle marginleftcom">\n\n                  <tr>\n\n                    <td class="text-left">\n\n                        <ion-icon name="call"></ion-icon>\n\n                    </td>\n\n                    <td class="text-right">\n\n                      <span>{{user.dipendente.telefono}}</span>\n\n                    </td>\n\n                  </tr>\n\n                  <tr>\n\n                    <td class="text-left">\n\n                        <ion-icon name="mail"></ion-icon>\n\n              \n\n                    </td>\n\n                    <td class="text-right">\n\n                        {{user.dipendente.email}}\n\n                    </td>\n\n                  </tr>\n\n                </table>\n\n                <a href="#" class="btn btn-custom btn-sm">DIPENDENZA GERARCHICA</a>\n\n          </div>\n\n  \n\n\n\n\n\n    </ion-content>\n\n\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\profilo\profilo.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1__services_login_login_service__["a" /* LoginService */], __WEBPACK_IMPORTED_MODULE_3__services_contact_contact_service__["a" /* ContactService */], __WEBPACK_IMPORTED_MODULE_0__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__services_store_store_service__["a" /* StoreService */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["i" /* NavController */]])
    ], ProfiloPage);
    return ProfiloPage;
    var ProfiloPage_1;
}());

//# sourceMappingURL=profilo.js.map

/***/ }),
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 141;

/***/ }),
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CheckService = /** @class */ (function () {
    function CheckService(http) {
        this.http = http;
    }
    /**public sendError(url: string) : Observable<Error.ErrorResponse>{
        return this.http.get<Error.ErrorResponse>(url);
    }*/
    CheckService.prototype.checkToken = function (token) {
        return this.http.get("http://allinappws.mesys.it/services/checktoken/" + token);
    };
    CheckService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], CheckService);
    return CheckService;
}());

//# sourceMappingURL=check.service.js.map

/***/ }),
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 186;

/***/ }),
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CircolariCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__circolari_details_circolari_details__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__circolari_circolari__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_comunicazione_comunicazione_namespace__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_shared_http_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_store_store_service__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CircolariCardPage = /** @class */ (function () {
    function CircolariCardPage(navCtrl, http, store) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.store = store;
        this.comunicazioniFull = [];
        this.comunicazioniMin = [];
    }
    CircolariCardPage.prototype.ngOnInit = function () {
        var _this = this;
        var s = this.store.userData$.subscribe(function (val) {
            var s1 = _this.http.getComunicazioniElenco(val.token_value, 0, 0, 'X', 'R').subscribe(function (val1) {
                _this.comunicazioniFull = val1.l_lista_comunicazione;
                s1.unsubscribe();
                for (var i = 0; i < 3; i++) {
                    _this.comunicazioniMin[i] = new __WEBPACK_IMPORTED_MODULE_2__models_comunicazione_comunicazione_namespace__["a" /* Comunicazione */].ComunicazioneElencoElem();
                    if (_this.comunicazioniFull[i] != null)
                        _this.comunicazioniMin[i] = _this.comunicazioniFull[i];
                }
            });
            s.unsubscribe();
        });
        this.store.getUserData();
        //questo sarà in una subscribe
    };
    CircolariCardPage.prototype.goToCircolari = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__circolari_circolari__["a" /* CircolariPage */]);
    };
    CircolariCardPage.prototype.goToDetails = function (com) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__circolari_details_circolari_details__["a" /* CircolariDetailsPage */], { com: com });
    };
    CircolariCardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["m" /* Component */])({
            selector: 'circolari-card',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\circolari-card\circolari-card.html"*/'<div class="card card-large">\n\n    <div class="card-header bg-comm text-header text-white" (click)="goToCircolari()" >Circolari</div>\n\n    <div class="card-body">\n\n        \n\n        <ul class="list-group list-group-flush comm " >\n\n            <home-com  *ngFor="let data of comunicazioniMin" [data] = "data" (click)="goToDetails(data)" >\n\n            </home-com>\n\n        </ul>\n\n\n\n    </div>\n\n</div>'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\circolari-card\circolari-card.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__services_shared_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_6__services_store_store_service__["a" /* StoreService */]])
    ], CircolariCardPage);
    return CircolariCardPage;
}());

//# sourceMappingURL=circolari-card.js.map

/***/ }),
/* 227 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CircolariCardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_circolari_card_circolari_card__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_com_home_com_module__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var CircolariCardModule = /** @class */ (function () {
    function CircolariCardModule() {
    }
    CircolariCardModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_0__pages_circolari_card_circolari_card__["a" /* CircolariCardPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicModule */], __WEBPACK_IMPORTED_MODULE_1__home_com_home_com_module__["a" /* HomeComModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_0__pages_circolari_card_circolari_card__["a" /* CircolariCardPage */]]
        })
    ], CircolariCardModule);
    return CircolariCardModule;
}());

//# sourceMappingURL=circolari-card.module.js.map

/***/ }),
/* 228 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_comunicazione_comunicazione_namespace__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComPage = /** @class */ (function () {
    function HomeComPage() {
    }
    HomeComPage.prototype.ngOnInit = function () {
        this.giorno = " ";
        this.mese = " ";
        if (this.data.cm_data != null)
            this.mese = this.data.cm_data.charAt(5) + this.data.cm_data.charAt(6);
        if (this.data.cm_data != null)
            this.giorno = this.data.cm_data.charAt(8) + this.data.cm_data.charAt(9);
        if (this.mese == "01")
            this.mese = "Gennaio";
        else if (this.mese == "02")
            this.mese = "Febbraio";
        else if (this.mese == "03")
            this.mese = "Marzo";
        else if (this.mese == "04")
            this.mese = "Aprile";
        else if (this.mese == "05")
            this.mese = "Maggio";
        else if (this.mese == "06")
            this.mese = "Giugno";
        else if (this.mese == "07")
            this.mese = "Luglio";
        else if (this.mese == "08")
            this.mese = "Agosto";
        else if (this.mese == "09")
            this.mese = "Settembre";
        else if (this.mese == "10")
            this.mese = "Ottobre";
        else if (this.mese == "11")
            this.mese = "Novembre";
        else if (this.mese == "12")
            this.mese = "Diciembre";
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('data'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__models_comunicazione_comunicazione_namespace__["a" /* Comunicazione */].ComunicazioneElencoElem)
    ], HomeComPage.prototype, "data", void 0);
    HomeComPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'home-com',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\home-com\home-com.html"*/'<li class="list-group-item">\n\n	<div class="item">\n\n		<span class="day">{{giorno}}</span>\n\n		<span class="mounth">{{mese}}</span>\n\n	</div>\n\n	<div class="brief">\n\n		<h5 class="title">{{data.cm_titolo}}</h5>\n\n		<p class="text">{{data.cm_descrizione}}</p>\n\n	</div>\n\n</li>'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\home-com\home-com.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], HomeComPage);
    return HomeComPage;
}());

//# sourceMappingURL=home-com.js.map

/***/ }),
/* 229 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeMessPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_messaggi_messaggi_namespace__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeMessPage = /** @class */ (function () {
    function HomeMessPage() {
    }
    HomeMessPage.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["D" /* Input */])('data'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__models_messaggi_messaggi_namespace__["a" /* Messaggi */].MessaggiElem)
    ], HomeMessPage.prototype, "data", void 0);
    HomeMessPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'home-mess',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\home-mess\home-mess.html"*/'\n\n<li class="list-group-item" >\n\n	<div class="item">\n\n		<i class="fa fa-bell "><ion-icon  name="flash"></ion-icon></i>\n\n	</div>\n\n	<div class="brief">\n\n		<h5>{{data.nome_mit}} {{data.cognome_mit}}</h5>\n\n		<p>{{data.soggetto}}</p>\n\n	</div>\n\n</li>\n\n			'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\home-mess\home-mess.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], HomeMessPage);
    return HomeMessPage;
}());

//# sourceMappingURL=home-mess.js.map

/***/ }),
/* 230 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__messaggi_details_messaggi_details__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__messaggi_messaggi__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_shared_http_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_store_store_service__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MessaggiCardPage = /** @class */ (function () {
    function MessaggiCardPage(navCtrl, http, store) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.store = store;
        this.messFull = [];
        this.messMin = [];
    }
    MessaggiCardPage.prototype.ngOnInit = function () {
        var _this = this;
        var s = this.store.userData$.subscribe(function (val) {
            var s1 = _this.http.getMessaggeList(val.token_value, "0", "0", "I").subscribe(function (res) {
                console.log(res);
                if (res.ErrorMessage.msg_code == 0) {
                    _this.messFull = res.l_lista_messaggi;
                    for (var i = 0; i < 4; i++) {
                        if (_this.messFull[i] != null) {
                            _this.messMin[i] = _this.messFull[i];
                        }
                    }
                }
                else {
                    console.log("errore ricezione News");
                }
                s1.unsubscribe();
            });
            s.unsubscribe();
        });
        this.store.getUserData();
        /**for (let i = 0; i < 10; i++){
          this.messFull[i] = new Messaggi.MessaggiElem();
          this.messFull[i].cognome_des = "Amministratore";
          this.messFull[i].cognome_mit = "Pinoli";
          this.messFull[i].data = "00:00:00:00";
          this.messFull[i].destinatario_key = 1;
          this.messFull[i].messaggio = "ciao come va?";
          this.messFull[i].soggetto = "saluti";
          this.messFull[i].stato_messaggio = "S";
          if (i%2 == 0){
            this.messFull[i].stato_messaggio = "N";
          }
        }
        for (let i = 0 ; i < 4 ; i++){
          this.messMin[i] = this.messFull[i];
        }
        console.log(this.messFull);
        console.log (this.messMin);
        **/
    };
    MessaggiCardPage.prototype.goToMessaggi = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__messaggi_messaggi__["a" /* MessaggiPage */], { messFull: this.messFull });
        //this.navCtrl.setRoot(MessaggiPage);
    };
    MessaggiCardPage.prototype.goToDetails = function (mess) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__messaggi_details_messaggi_details__["a" /* MessaggiDetailsPage */], { mess: mess });
    };
    MessaggiCardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'messaggi-card',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\messaggi-card\messaggi-card.html"*/'<div class="card" >\n\n    <div class="card-header bg-comm text-header text-white" (click)="goToMessaggi()">Messaggi</div>\n\n    <div class="card-body">\n\n        <ul class="list-group list-group-flush priority" >\n\n            <home-mess *ngFor="let data of messMin" [data] = "data" (click)="goToDetails(data)" >\n\n            </home-mess>\n\n        </ul>\n\n    </div>\n\n</div>'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\messaggi-card\messaggi-card.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_shared_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_5__services_store_store_service__["a" /* StoreService */]])
    ], MessaggiCardPage);
    return MessaggiCardPage;
}());

//# sourceMappingURL=messaggi-card.js.map

/***/ }),
/* 231 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeMessModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_home_mess_home_mess__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HomeMessModule = /** @class */ (function () {
    function HomeMessModule() {
    }
    HomeMessModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_0__pages_home_mess_home_mess__["a" /* HomeMessPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_0__pages_home_mess_home_mess__["a" /* HomeMessPage */]]
        })
    ], HomeMessModule);
    return HomeMessModule;
}());

//# sourceMappingURL=home-mess.module.js.map

/***/ }),
/* 232 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiCardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_mess_home_mess_module__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_messaggi_card_messaggi_card__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var MessaggiCardModule = /** @class */ (function () {
    function MessaggiCardModule() {
    }
    MessaggiCardModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__pages_messaggi_card_messaggi_card__["a" /* MessaggiCardPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicModule */], __WEBPACK_IMPORTED_MODULE_0__home_mess_home_mess_module__["a" /* HomeMessModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__pages_messaggi_card_messaggi_card__["a" /* MessaggiCardPage */]]
        })
    ], MessaggiCardModule);
    return MessaggiCardModule;
}());

//# sourceMappingURL=messaggi-card.module.js.map

/***/ }),
/* 233 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComunicazioniCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__comunicazioni_details_comunicazioni_details__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__comunicazioni_comunicazioni__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_comunicazione_comunicazione_namespace__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_shared_http_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_store_store_service__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ComunicazioniCardPage = /** @class */ (function () {
    function ComunicazioniCardPage(navCtrl, http, store) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.store = store;
        this.comunicazioniFull = [];
        this.comunicazioniMin = [];
    }
    ComunicazioniCardPage.prototype.ngOnInit = function () {
        var _this = this;
        var s = this.store.userData$.subscribe(function (val) {
            var s1 = _this.http.getComunicazioniElenco(val.token_value, 0, 0, 'X', 'C').subscribe(function (val1) {
                _this.comunicazioniFull = val1.l_lista_comunicazione;
                s1.unsubscribe();
                for (var i = 0; i < 3; i++) {
                    _this.comunicazioniMin[i] = new __WEBPACK_IMPORTED_MODULE_2__models_comunicazione_comunicazione_namespace__["a" /* Comunicazione */].ComunicazioneElencoElem();
                    if (_this.comunicazioniFull[i] != null)
                        _this.comunicazioniMin[i] = _this.comunicazioniFull[i];
                }
            });
            s.unsubscribe();
        });
        this.store.getUserData();
        //questo sarà in una subscribe
    };
    ComunicazioniCardPage.prototype.goToComunicazioni = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__comunicazioni_comunicazioni__["a" /* ComunicazioniPage */]);
    };
    ComunicazioniCardPage.prototype.goToDetails = function (com) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__comunicazioni_details_comunicazioni_details__["a" /* ComunicazioniDetailsPage */], { com: com });
    };
    ComunicazioniCardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["m" /* Component */])({
            selector: 'comunicazioni-card',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\comunicazioni-card\comunicazioni-card.html"*/'<div class="card card-large">\n\n    <div class="card-header bg-comm text-header text-white" (click)="goToComunicazioni()" >Comunicazioni</div>\n\n    <div class="card-body">\n\n        \n\n        <ul class="list-group list-group-flush comm " >\n\n            <home-com  *ngFor="let data of comunicazioniMin" [data] = "data" (click)="goToDetails(data)" >\n\n            </home-com>\n\n        </ul>\n\n\n\n    </div>\n\n</div>'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\comunicazioni-card\comunicazioni-card.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_shared_http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_shared_http_service__["a" /* HttpService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__services_store_store_service__["a" /* StoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_store_store_service__["a" /* StoreService */]) === "function" && _c || Object])
    ], ComunicazioniCardPage);
    return ComunicazioniCardPage;
    var _a, _b, _c;
}());

//# sourceMappingURL=comunicazioni-card.js.map

/***/ }),
/* 234 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__news_details_news_details__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__news_news__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_shared_http_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_store_store_service__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NewsCardPage = /** @class */ (function () {
    function NewsCardPage(navCtrl, http, store) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.store = store;
        this.newsMin = [];
    }
    NewsCardPage.prototype.ngOnInit = function () {
        var _this = this;
        var s = this.store.userData$.subscribe(function (val) {
            var s1 = _this.http.getNewsList(val.token_value, "0", "0", "X").subscribe(function (res) {
                console.log(res);
                if (res.ErrorMessage.msg_code == 0) {
                    _this.newsFull = res.l_lista_news;
                    for (var i = 0; i < 4; i++) {
                        if (_this.newsFull[i] != null) {
                            _this.newsMin[i] = _this.newsFull[i];
                        }
                    }
                }
                else {
                    console.log("errore ricezione News");
                }
                s1.unsubscribe();
            });
            s.unsubscribe();
        });
        this.store.getUserData();
    };
    NewsCardPage.prototype.goToNews = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__news_news__["a" /* NewsPage */], { news: this.newsFull });
    };
    NewsCardPage.prototype.goToDetails = function (news) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__news_details_news_details__["a" /* NewsDetailsPage */], { news: news });
    };
    NewsCardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'news-card',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\news-card\news-card.html"*/'<div class="card" >\n\n    <div class="card-header bg-comm text-header text-white" (click)="goToNews()">News</div>\n\n    <div class="card-body">\n\n        <ul class="list-group list-group-flush priority" >\n\n            <home-news *ngFor="let data of newsMin" [data] = "data" (click)="goToDetails(data)" >\n\n            </home-news>\n\n        </ul>\n\n    </div>\n\n</div>'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\news-card\news-card.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_shared_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_5__services_store_store_service__["a" /* StoreService */]])
    ], NewsCardPage);
    return NewsCardPage;
}());

//# sourceMappingURL=news-card.js.map

/***/ }),
/* 235 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsCardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_news_home_com_module__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_news_card_news_card__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var NewsCardModule = /** @class */ (function () {
    function NewsCardModule() {
    }
    NewsCardModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__pages_news_card_news_card__["a" /* NewsCardPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicModule */], __WEBPACK_IMPORTED_MODULE_0__home_news_home_com_module__["a" /* HomeNewsModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__pages_news_card_news_card__["a" /* NewsCardPage */]]
        })
    ], NewsCardModule);
    return NewsCardModule;
}());

//# sourceMappingURL=news-card.module.js.map

/***/ }),
/* 236 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactCardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_contact_card_contact_card__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ContactCardModule = /** @class */ (function () {
    function ContactCardModule() {
    }
    ContactCardModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_0__pages_contact_card_contact_card__["a" /* ContactCardPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_0__pages_contact_card_contact_card__["a" /* ContactCardPage */]]
        })
    ], ContactCardModule);
    return ContactCardModule;
}());

//# sourceMappingURL=contact-card.module.js.map

/***/ }),
/* 237 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__contacts_contacts__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ContactCardPage = /** @class */ (function () {
    function ContactCardPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ContactCardPage.prototype.ngOnInit = function () {
    };
    ContactCardPage.prototype.goToContact = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__contacts_contacts__["a" /* ContactsPage */]);
    };
    ContactCardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'contact-card',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\contact-card\contact-card.html"*/'\n\n    <button (click)="goToContact()"  block outline class="text-default rounded-generic-card button-large button-large-blue" ion-button>\n\n        <div>Rubrica</div>\n\n        <ion-icon class="icon-button" name="contacts">\n\n        </ion-icon>				\n\n    </button>\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\contact-card\contact-card.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
    ], ContactCardPage);
    return ContactCardPage;
}());

//# sourceMappingURL=contact-card.js.map

/***/ }),
/* 238 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Contact; });
var Contact;
(function (Contact) {
    var ContactDataFull = /** @class */ (function () {
        function ContactDataFull() {
        }
        return ContactDataFull;
    }());
    Contact.ContactDataFull = ContactDataFull;
    var ContactSede = /** @class */ (function () {
        function ContactSede() {
        }
        return ContactSede;
    }());
    Contact.ContactSede = ContactSede;
    var Dipendente = /** @class */ (function () {
        function Dipendente() {
        }
        return Dipendente;
    }());
    Contact.Dipendente = Dipendente;
    var ContactDataMin = /** @class */ (function () {
        function ContactDataMin() {
        }
        return ContactDataMin;
    }());
    Contact.ContactDataMin = ContactDataMin;
    var ContactList = /** @class */ (function () {
        function ContactList() {
        }
        return ContactList;
    }());
    Contact.ContactList = ContactList;
})(Contact || (Contact = {}));
//# sourceMappingURL=contact.namespace.js.map

/***/ }),
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePrioPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_home_element_home_element_namespace__ = __webpack_require__(243);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomePrioPage = /** @class */ (function () {
    function HomePrioPage() {
    }
    HomePrioPage.prototype.ngOnInit = function () {
        console.log(this.data);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('data'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__models_home_element_home_element_namespace__["a" /* HomeElement */].PrioritaElement)
    ], HomePrioPage.prototype, "data", void 0);
    HomePrioPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'home-prio',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\home-prio\home-prio.html"*/'\n\n<li class="list-group-item" >\n\n	<div class="item">\n\n		<i class="fa fa-bell"><ion-icon name="notifications"></ion-icon></i>\n\n	</div>\n\n	<div class="brief">\n\n		<h5>{{data.titolo}}</h5>\n\n		<p>{{data.testo}}</p>\n\n	</div>\n\n</li>\n\n			'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\home-prio\home-prio.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], HomePrioPage);
    return HomePrioPage;
}());

//# sourceMappingURL=home-prio.js.map

/***/ }),
/* 243 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeElement; });
var HomeElement;
(function (HomeElement) {
    var ComunicazioniElement = /** @class */ (function () {
        function ComunicazioniElement() {
        }
        return ComunicazioniElement;
    }());
    HomeElement.ComunicazioniElement = ComunicazioniElement;
    var PrioritaElement = /** @class */ (function () {
        function PrioritaElement() {
        }
        return PrioritaElement;
    }());
    HomeElement.PrioritaElement = PrioritaElement;
})(HomeElement || (HomeElement = {}));
//# sourceMappingURL=home-element.namespace.js.map

/***/ }),
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComunicazioniCardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_com_home_com_module__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_comunicazioni_card_comunicazioni_card__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ComunicazioniCardModule = /** @class */ (function () {
    function ComunicazioniCardModule() {
    }
    ComunicazioniCardModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__pages_comunicazioni_card_comunicazioni_card__["a" /* ComunicazioniCardPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicModule */], __WEBPACK_IMPORTED_MODULE_0__home_com_home_com_module__["a" /* HomeComModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__pages_comunicazioni_card_comunicazioni_card__["a" /* ComunicazioniCardPage */]]
        })
    ], ComunicazioniCardModule);
    return ComunicazioniCardModule;
}());

//# sourceMappingURL=comunicazioni-card.module.js.map

/***/ }),
/* 249 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MyChatPage = /** @class */ (function () {
    function MyChatPage(ref, http, navCtrl) {
        this.ref = ref;
        this.http = http;
        this.navCtrl = navCtrl;
        this.licenseKey = "Z8AZN-TX6NP-3KETR-LDF4L-SF1LP"; // Replace the value with your CometChat License Key;
        this.apiKey = "16d09e11cf125fa84d7450ed3e114642"; // Replace the value with your CometChat Api Key;
        this.name = "ugo";
        this.password = "1234";
        this.host = "http://testchat.mesys.it";
        this.localhost = "http://localhost:8100";
        this.iflocal = true;
        this.userId = -1;
        if (this.iflocal) {
            this.host = this.localhost;
        }
        this.login(this.name, this.password);
        this.getFriendList();
    }
    MyChatPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    MyChatPage.prototype.initializeChat = function () {
    };
    MyChatPage.prototype.login = function (name, password) {
        var _this = this;
        var ind = this.host + "/cometchat/api/index.php?action=authenticateUser&api-key=" + this.apiKey +
            "&username=" + name + "&password=" + password;
        this.http.get(ind).subscribe(function (res) {
            console.log(res);
            alert("success" + JSON.stringify(res));
            _this.userId = res["success"]["userid"];
        });
    };
    ;
    MyChatPage.prototype.getFriendList = function () {
        var ind = this.host + "/cometchat/api/index.php?action=getfriend&api-key=" + this.apiKey +
            "&userid=" + this.userId;
        console.log(ind);
        this.http.get(ind).subscribe(function (res) {
            console.log(res);
            alert("success" + JSON.stringify(res));
        });
    };
    MyChatPage.prototype.launchChat = function () {
    };
    MyChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-mychat',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\mychat\mychat.html"*/'<ion-header>\n\n    <ion-navbar  hideBackButton>\n\n        <ion-buttons left>\n\n            <button (click)="back()" ion-button icon-left clear small>\n\n          <ion-icon name="arrow-back"></ion-icon>\n\n          </button>\n\n          </ion-buttons>\n\n      <ion-title>\n\n        CometChat Ionic Sample App\n\n      </ion-title>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  \n\n  <ion-content padding>\n\n    <div class="cometchat_logodiv">\n\n      <ion-avatar class="cometchat_logo" width="150" height="150">\n\n        <ion-img width="50" height="50" src="assets/imgs/logo.png"></ion-img>\n\n      </ion-avatar>\n\n    </div>\n\n    <ion-list>\n\n      <ion-row>\n\n        \n\n      </ion-row>\n\n    </ion-list>\n\n  </ion-content>'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\mychat\mychat.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_core__["j" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */]])
    ], MyChatPage);
    return MyChatPage;
}());

//# sourceMappingURL=mychat.js.map

/***/ }),
/* 250 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(271);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_comunicazioni_details_comunicazioni_details__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_circolari_details_circolari_details_module__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_circolari_details_circolari_details__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_circolari_card_circolari_card__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_circolari_circolari__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_circolari_card_circolari_card_module__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_circolari_circolari_module__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_comunicazioni_details_comunicazioni_details_module__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_comunicazioni_comunicazioni_module__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_messaggi_uscita_messaggi_uscita__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_messaggi_cestino_messaggi_cestino__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_messaggi_importanti_messaggi_importanti__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__modules_messaggi_uscita_messaggi_uscita_module__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__modules_messaggi_cestino_messaggi_cestino_module__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__modules_messaggi_importanti_messaggi_importanti_module__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_messaggi_nuovo_messaggi_nuovo__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__modules_messaggi_nuovo_messaggi_nuovo_module__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_home_mess_home_mess__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_messaggi_card_messaggi_card__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_messaggi_details_messaggi_details__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_messaggi_messaggi__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__modules_home_mess_home_mess_module__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__modules_messaggi_card_messaggi_card_module__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_comunicazioni_card_comunicazioni_card__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_news_details_news_details__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__modules_news_details_news_details_module__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_news_card_news_card__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__modules_news_news_module__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__modules_news_card_news_card_module__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__modules_contact_card_contact_card_module__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_contact_card_contact_card__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_home_prio_home_prio__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__modules_home_prio_home_prio_module__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_home_com_home_com__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__modules_home_com_home_com_module__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_base64__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_native_email_composer__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_call_number__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__services_shared_error_service__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__angular_platform_browser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__angular_common_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__ionic_native_status_bar__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__ionic_native_splash_screen__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__app_component__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__ionic_native_file_transfer__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__ionic_native_file__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__ionic_native_camera__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__modules_login_login_module__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__modules_home_home_module__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__modules_loading_loading_module__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__modules_chat_chat_module__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__modules_mychat_mychat_module__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__modules_profilo_profilo_module__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__pages_home_home__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__pages_login_login__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__pages_loading_loading__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__pages_chat_chat__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__pages_mychat_mychat__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__pages_contacts_contacts__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__pages_contact_details_contact_details__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__pages_profilo_profilo__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__services_comunicazione_service__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__services_shared_http_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__services_login_login_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__ionic_storage__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__services_contact_contact_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__modules_contacts_contacts_module__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70__modules_contact_details_contact_details_module__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71__services_shared_check_service__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72__pages_news_news__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_73__modules_comunicazioni_card_comunicazioni_card_module__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_74__modules_messaggi_messaggi_module__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_75__modules_messaggi_details_messaggi_details_module__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_76__pages_comunicazioni_comunicazioni__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















































// #REGION - Modules






// #REGION - Components/pages

// import { TabsPage } from './pages/tabs/tabs';
// import { ComunicazioniPage } from './pages/comunicazioni/comunicazioni';







// #REGION - Services














var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_39__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_45__app_component__["a" /* MyApp */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_41_ionic_angular__["e" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_40__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_49__modules_login_login_module__["a" /* LoginModule */],
                __WEBPACK_IMPORTED_MODULE_42__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_50__modules_home_home_module__["a" /* HomeModule */],
                __WEBPACK_IMPORTED_MODULE_73__modules_comunicazioni_card_comunicazioni_card_module__["a" /* ComunicazioniCardModule */],
                __WEBPACK_IMPORTED_MODULE_8__modules_comunicazioni_comunicazioni_module__["a" /* ComunicazioniPageModule */],
                __WEBPACK_IMPORTED_MODULE_7__modules_comunicazioni_details_comunicazioni_details_module__["a" /* ComunicazioniDetailsModule */],
                __WEBPACK_IMPORTED_MODULE_34__modules_home_com_home_com_module__["a" /* HomeComModule */],
                __WEBPACK_IMPORTED_MODULE_32__modules_home_prio_home_prio_module__["a" /* HomePrioModule */],
                __WEBPACK_IMPORTED_MODULE_51__modules_loading_loading_module__["a" /* LoadingModule */],
                __WEBPACK_IMPORTED_MODULE_52__modules_chat_chat_module__["a" /* ChatModule */],
                __WEBPACK_IMPORTED_MODULE_53__modules_mychat_mychat_module__["a" /* MyChatModule */],
                __WEBPACK_IMPORTED_MODULE_69__modules_contacts_contacts_module__["a" /* ContactsModule */],
                __WEBPACK_IMPORTED_MODULE_70__modules_contact_details_contact_details_module__["a" /* ContactDetailsModule */],
                __WEBPACK_IMPORTED_MODULE_54__modules_profilo_profilo_module__["a" /* ProfiloModule */],
                __WEBPACK_IMPORTED_MODULE_29__modules_contact_card_contact_card_module__["a" /* ContactCardModule */],
                __WEBPACK_IMPORTED_MODULE_28__modules_news_card_news_card_module__["a" /* NewsCardModule */],
                __WEBPACK_IMPORTED_MODULE_27__modules_news_news_module__["a" /* NewsModule */],
                __WEBPACK_IMPORTED_MODULE_25__modules_news_details_news_details_module__["a" /* NewsDetailsModule */],
                __WEBPACK_IMPORTED_MODULE_74__modules_messaggi_messaggi_module__["a" /* MessaggiModule */],
                __WEBPACK_IMPORTED_MODULE_75__modules_messaggi_details_messaggi_details_module__["a" /* MessaggiDetailsModule */],
                __WEBPACK_IMPORTED_MODULE_22__modules_messaggi_card_messaggi_card_module__["a" /* MessaggiCardModule */],
                __WEBPACK_IMPORTED_MODULE_21__modules_home_mess_home_mess_module__["a" /* HomeMessModule */],
                __WEBPACK_IMPORTED_MODULE_16__modules_messaggi_nuovo_messaggi_nuovo_module__["a" /* MessaggiNuovoModule */],
                __WEBPACK_IMPORTED_MODULE_14__modules_messaggi_importanti_messaggi_importanti_module__["a" /* MessaggiImportantiModule */],
                __WEBPACK_IMPORTED_MODULE_12__modules_messaggi_uscita_messaggi_uscita_module__["a" /* MessaggiUscitaModule */],
                __WEBPACK_IMPORTED_MODULE_13__modules_messaggi_cestino_messaggi_cestino_module__["a" /* MessaggiCestinoModule */],
                __WEBPACK_IMPORTED_MODULE_6__modules_circolari_circolari_module__["a" /* CircolariPageModule */],
                __WEBPACK_IMPORTED_MODULE_5__modules_circolari_card_circolari_card_module__["a" /* CircolariCardModule */],
                __WEBPACK_IMPORTED_MODULE_1__modules_circolari_details_circolari_details_module__["a" /* CircolariDetailsModule */],
                __WEBPACK_IMPORTED_MODULE_41_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_45__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_66__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_41_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_45__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_55__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_comunicazioni_card_comunicazioni_card__["a" /* ComunicazioniCardPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_home_com_home_com__["a" /* HomeComPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_home_prio_home_prio__["a" /* HomePrioPage */],
                __WEBPACK_IMPORTED_MODULE_60__pages_contacts_contacts__["a" /* ContactsPage */],
                // TabsPage,
                __WEBPACK_IMPORTED_MODULE_76__pages_comunicazioni_comunicazioni__["a" /* ComunicazioniPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_comunicazioni_details_comunicazioni_details__["a" /* ComunicazioniDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_56__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_57__pages_loading_loading__["a" /* LoadingPage */],
                __WEBPACK_IMPORTED_MODULE_58__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_59__pages_mychat_mychat__["a" /* MyChatPage */],
                __WEBPACK_IMPORTED_MODULE_62__pages_profilo_profilo__["a" /* ProfiloPage */],
                __WEBPACK_IMPORTED_MODULE_61__pages_contact_details_contact_details__["a" /* ContactDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_contact_card_contact_card__["a" /* ContactCardPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_news_card_news_card__["a" /* NewsCardPage */],
                __WEBPACK_IMPORTED_MODULE_72__pages_news_news__["a" /* NewsPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_news_details_news_details__["a" /* NewsDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_messaggi_messaggi__["a" /* MessaggiPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_messaggi_details_messaggi_details__["a" /* MessaggiDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_messaggi_card_messaggi_card__["a" /* MessaggiCardPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_home_mess_home_mess__["a" /* HomeMessPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_messaggi_nuovo_messaggi_nuovo__["a" /* MessaggiNuovoPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_messaggi_importanti_messaggi_importanti__["a" /* MessaggiImportantiPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_messaggi_uscita_messaggi_uscita__["a" /* MessaggiUscitaPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_messaggi_cestino_messaggi_cestino__["a" /* MessaggiCestinoPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_circolari_circolari__["a" /* CircolariPage */],
                __WEBPACK_IMPORTED_MODULE_3__pages_circolari_card_circolari_card__["a" /* CircolariCardPage */],
                __WEBPACK_IMPORTED_MODULE_2__pages_circolari_details_circolari_details__["a" /* CircolariDetailsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_43__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_44__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_67__services_store_store_service__["a" /* StoreService */],
                __WEBPACK_IMPORTED_MODULE_63__services_comunicazione_service__["a" /* ComunicazioneService */],
                __WEBPACK_IMPORTED_MODULE_64__services_shared_http_service__["a" /* HttpService */],
                __WEBPACK_IMPORTED_MODULE_65__services_login_login_service__["a" /* LoginService */],
                __WEBPACK_IMPORTED_MODULE_38__services_shared_error_service__["a" /* ErrorService */],
                __WEBPACK_IMPORTED_MODULE_68__services_contact_contact_service__["a" /* ContactService */],
                __WEBPACK_IMPORTED_MODULE_71__services_shared_check_service__["a" /* CheckService */],
                __WEBPACK_IMPORTED_MODULE_37__ionic_native_call_number__["a" /* CallNumber */],
                __WEBPACK_IMPORTED_MODULE_36__ionic_native_email_composer__["a" /* EmailComposer */],
                __WEBPACK_IMPORTED_MODULE_46__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_47__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_48__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_35__ionic_native_base64__["a" /* Base64 */],
                { provide: __WEBPACK_IMPORTED_MODULE_39__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_41_ionic_angular__["d" /* IonicErrorHandler */] },
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CircolariDetailsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_circolari_details_circolari_details__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CircolariDetailsModule = /** @class */ (function () {
    function CircolariDetailsModule() {
    }
    CircolariDetailsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_0__pages_circolari_details_circolari_details__["a" /* CircolariDetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_0__pages_circolari_details_circolari_details__["a" /* CircolariDetailsPage */]),
            ],
        })
    ], CircolariDetailsModule);
    return CircolariDetailsModule;
}());

//# sourceMappingURL=circolari-details.module.js.map

/***/ }),
/* 321 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CircolariPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_circolari_circolari__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CircolariPageModule = /** @class */ (function () {
    function CircolariPageModule() {
    }
    CircolariPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_0__pages_circolari_circolari__["a" /* CircolariPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_0__pages_circolari_circolari__["a" /* CircolariPage */]]
        })
    ], CircolariPageModule);
    return CircolariPageModule;
}());

//# sourceMappingURL=circolari.module.js.map

/***/ }),
/* 322 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComunicazioniDetailsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_comunicazioni_details_comunicazioni_details__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ComunicazioniDetailsModule = /** @class */ (function () {
    function ComunicazioniDetailsModule() {
    }
    ComunicazioniDetailsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_0__pages_comunicazioni_details_comunicazioni_details__["a" /* ComunicazioniDetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_0__pages_comunicazioni_details_comunicazioni_details__["a" /* ComunicazioniDetailsPage */]),
            ],
        })
    ], ComunicazioniDetailsModule);
    return ComunicazioniDetailsModule;
}());

//# sourceMappingURL=comunicazioni-details.module.js.map

/***/ }),
/* 323 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComunicazioniPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_comunicazioni_comunicazioni__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ComunicazioniPageModule = /** @class */ (function () {
    function ComunicazioniPageModule() {
    }
    ComunicazioniPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_0__pages_comunicazioni_comunicazioni__["a" /* ComunicazioniPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_0__pages_comunicazioni_comunicazioni__["a" /* ComunicazioniPage */]]
        })
    ], ComunicazioniPageModule);
    return ComunicazioniPageModule;
}());

//# sourceMappingURL=comunicazioni.module.js.map

/***/ }),
/* 324 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiUscitaModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_messaggi_uscita_messaggi_uscita__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MessaggiUscitaModule = /** @class */ (function () {
    function MessaggiUscitaModule() {
    }
    MessaggiUscitaModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_0__pages_messaggi_uscita_messaggi_uscita__["a" /* MessaggiUscitaPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_0__pages_messaggi_uscita_messaggi_uscita__["a" /* MessaggiUscitaPage */]]
        })
    ], MessaggiUscitaModule);
    return MessaggiUscitaModule;
}());

//# sourceMappingURL=messaggi-uscita.module.js.map

/***/ }),
/* 325 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiCestinoModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_messaggi_cestino_messaggi_cestino__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MessaggiCestinoModule = /** @class */ (function () {
    function MessaggiCestinoModule() {
    }
    MessaggiCestinoModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_0__pages_messaggi_cestino_messaggi_cestino__["a" /* MessaggiCestinoPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_0__pages_messaggi_cestino_messaggi_cestino__["a" /* MessaggiCestinoPage */]]
        })
    ], MessaggiCestinoModule);
    return MessaggiCestinoModule;
}());

//# sourceMappingURL=messaggi-cestino.module.js.map

/***/ }),
/* 326 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiImportantiModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_messaggi_importanti_messaggi_importanti__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MessaggiImportantiModule = /** @class */ (function () {
    function MessaggiImportantiModule() {
    }
    MessaggiImportantiModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_0__pages_messaggi_importanti_messaggi_importanti__["a" /* MessaggiImportantiPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_0__pages_messaggi_importanti_messaggi_importanti__["a" /* MessaggiImportantiPage */]]
        })
    ], MessaggiImportantiModule);
    return MessaggiImportantiModule;
}());

//# sourceMappingURL=messaggi-importanti.module.js.map

/***/ }),
/* 327 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiNuovoModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_messaggi_nuovo_messaggi_nuovo__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MessaggiNuovoModule = /** @class */ (function () {
    function MessaggiNuovoModule() {
    }
    MessaggiNuovoModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_0__pages_messaggi_nuovo_messaggi_nuovo__["a" /* MessaggiNuovoPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_0__pages_messaggi_nuovo_messaggi_nuovo__["a" /* MessaggiNuovoPage */]]
        })
    ], MessaggiNuovoModule);
    return MessaggiNuovoModule;
}());

//# sourceMappingURL=messaggi-nuovo.module.js.map

/***/ }),
/* 328 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsDetailsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_news_details_news_details__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NewsDetailsModule = /** @class */ (function () {
    function NewsDetailsModule() {
    }
    NewsDetailsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_0__pages_news_details_news_details__["a" /* NewsDetailsPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_0__pages_news_details_news_details__["a" /* NewsDetailsPage */]]
        })
    ], NewsDetailsModule);
    return NewsDetailsModule;
}());

//# sourceMappingURL=news-details.module.js.map

/***/ }),
/* 329 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_news_news__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NewsModule = /** @class */ (function () {
    function NewsModule() {
    }
    NewsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_0__pages_news_news__["a" /* NewsPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_0__pages_news_news__["a" /* NewsPage */]]
        })
    ], NewsModule);
    return NewsModule;
}());

//# sourceMappingURL=news.module.js.map

/***/ }),
/* 330 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeNewsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_home_news_home_news__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HomeNewsModule = /** @class */ (function () {
    function HomeNewsModule() {
    }
    HomeNewsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_0__pages_home_news_home_news__["a" /* HomeNewsPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_0__pages_home_news_home_news__["a" /* HomeNewsPage */]]
        })
    ], HomeNewsModule);
    return HomeNewsModule;
}());

//# sourceMappingURL=home-com.module.js.map

/***/ }),
/* 331 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeNewsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_news_news_namespace__ = __webpack_require__(332);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeNewsPage = /** @class */ (function () {
    function HomeNewsPage() {
    }
    HomeNewsPage.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('data'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__models_news_news_namespace__["a" /* News */].NewsElem)
    ], HomeNewsPage.prototype, "data", void 0);
    HomeNewsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'home-news',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\home-news\home-news.html"*/'\n\n<li class="list-group-item" >\n\n	<div class="item">\n\n		<i class="fa fa-bell "><ion-icon  name="flash"></ion-icon></i>\n\n	</div>\n\n	<div class="brief">\n\n		<h5>{{data.nw_titolo}}</h5>\n\n		<p>{{data.nw_descrizione}}</p>\n\n	</div>\n\n</li>\n\n			'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\home-news\home-news.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], HomeNewsPage);
    return HomeNewsPage;
}());

//# sourceMappingURL=home-news.js.map

/***/ }),
/* 332 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return News; });
var News;
(function (News) {
    var MessaggioErrore = /** @class */ (function () {
        function MessaggioErrore() {
        }
        return MessaggioErrore;
    }());
    News.MessaggioErrore = MessaggioErrore;
    var NewsElem = /** @class */ (function () {
        function NewsElem() {
        }
        return NewsElem;
    }());
    News.NewsElem = NewsElem;
    var NewsList = /** @class */ (function () {
        function NewsList() {
        }
        return NewsList;
    }());
    News.NewsList = NewsList;
    var NewsResult = /** @class */ (function () {
        function NewsResult() {
        }
        return NewsResult;
    }());
    News.NewsResult = NewsResult;
})(News || (News = {}));
//# sourceMappingURL=news.namespace.js.map

/***/ }),
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_loading_loading__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(245);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, store) {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.store = store;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_0__pages_loading_loading__["a" /* LoadingPage */];
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_1__services_store_store_service__["a" /* StoreService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),
/* 343 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Login; });
var Login;
(function (Login) {
    var MessaggioErrore = /** @class */ (function () {
        function MessaggioErrore() {
        }
        return MessaggioErrore;
    }());
    Login.MessaggioErrore = MessaggioErrore;
    var Token = /** @class */ (function () {
        function Token() {
        }
        return Token;
    }());
    Login.Token = Token;
    var Result = /** @class */ (function () {
        function Result() {
        }
        return Result;
    }());
    Login.Result = Result;
})(Login || (Login = {}));
//# sourceMappingURL=login.namespace.js.map

/***/ }),
/* 344 */,
/* 345 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_login_login__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_login_login_service__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__pages_login_login__["a" /* LoginPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["b" /* CommonModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__pages_login_login__["a" /* LoginPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__services_login_login_service__["a" /* LoginService */]
            ]
        })
    ], LoginModule);
    return LoginModule;
}());

//# sourceMappingURL=login.module.js.map

/***/ }),
/* 346 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__circolari_card_circolari_card_module__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__messaggi_card_messaggi_card_module__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__news_card_news_card_module__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__priorita_card_priorita_module__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__chat_card_contact_card_module__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__documentale_card_documentale_card_module__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__contact_card_contact_card_module__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_prio_home_prio_module__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__home_com_home_com_module__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_home_home__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__comunicazioni_card_comunicazioni_card_module__ = __webpack_require__(248);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_9__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_11_ionic_angular__["e" /* IonicModule */], __WEBPACK_IMPORTED_MODULE_8__home_com_home_com_module__["a" /* HomeComModule */], __WEBPACK_IMPORTED_MODULE_7__home_prio_home_prio_module__["a" /* HomePrioModule */], __WEBPACK_IMPORTED_MODULE_6__contact_card_contact_card_module__["a" /* ContactCardModule */],
                __WEBPACK_IMPORTED_MODULE_5__documentale_card_documentale_card_module__["a" /* DocumentaleCardModule */], __WEBPACK_IMPORTED_MODULE_4__chat_card_contact_card_module__["a" /* ChatCardModule */], __WEBPACK_IMPORTED_MODULE_3__priorita_card_priorita_module__["a" /* PrioritaCardModule */], __WEBPACK_IMPORTED_MODULE_1__messaggi_card_messaggi_card_module__["a" /* MessaggiCardModule */],
                __WEBPACK_IMPORTED_MODULE_2__news_card_news_card_module__["a" /* NewsCardModule */], __WEBPACK_IMPORTED_MODULE_12__comunicazioni_card_comunicazioni_card_module__["a" /* ComunicazioniCardModule */], __WEBPACK_IMPORTED_MODULE_0__circolari_card_circolari_card_module__["a" /* CircolariCardModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */]]
        })
    ], HomeModule);
    return HomeModule;
}());

//# sourceMappingURL=home.module.js.map

/***/ }),
/* 347 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrioritaCardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_priorita_card_priorita_card__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_prio_home_prio_module__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var PrioritaCardModule = /** @class */ (function () {
    function PrioritaCardModule() {
    }
    PrioritaCardModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_0__pages_priorita_card_priorita_card__["a" /* PrioritaCardPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicModule */], __WEBPACK_IMPORTED_MODULE_1__home_prio_home_prio_module__["a" /* HomePrioModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_0__pages_priorita_card_priorita_card__["a" /* PrioritaCardPage */]]
        })
    ], PrioritaCardModule);
    return PrioritaCardModule;
}());

//# sourceMappingURL=priorita.module.js.map

/***/ }),
/* 348 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrioritaCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_home_element_home_element_namespace__ = __webpack_require__(243);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PrioritaCardPage = /** @class */ (function () {
    function PrioritaCardPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.prioritaFull = [];
        this.prioritaMin = [];
    }
    PrioritaCardPage.prototype.ngOnInit = function () {
        for (var i = 0; i < 10; i++) {
            this.prioritaFull[i] = new __WEBPACK_IMPORTED_MODULE_2__models_home_element_home_element_namespace__["a" /* HomeElement */].PrioritaElement();
            this.prioritaFull[i].titolo = "Lettura news";
            this.prioritaFull[i].testo = "Acquisizione nuovo cliente";
        }
        for (var i = 0; i < 4; i++) {
            this.prioritaMin[i] = this.prioritaFull[i];
        }
        console.log(this.prioritaMin);
    };
    PrioritaCardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'priorita-card',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\priorita-card\priorita-card.html"*/'<div class="card">\n\n    <div class="card-header bg-priority text-header text-white">Priorità</div>\n\n    <div class="card-body">\n\n        <ul class="list-group list-group-flush priority" >\n\n            <home-prio *ngFor="let data of prioritaMin" [data] = "data">\n\n            </home-prio>\n\n        </ul>\n\n    </div>\n\n</div>\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\priorita-card\priorita-card.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavParams */]])
    ], PrioritaCardPage);
    return PrioritaCardPage;
}());

//# sourceMappingURL=priorita-card.js.map

/***/ }),
/* 349 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatCardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_chat_card_chat_card__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChatCardModule = /** @class */ (function () {
    function ChatCardModule() {
    }
    ChatCardModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_0__pages_chat_card_chat_card__["a" /* ChatCardPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_0__pages_chat_card_chat_card__["a" /* ChatCardPage */]]
        })
    ], ChatCardModule);
    return ChatCardModule;
}());

//# sourceMappingURL=contact-card.module.js.map

/***/ }),
/* 350 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chat_chat__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ChatCardPage = /** @class */ (function () {
    function ChatCardPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ChatCardPage.prototype.ngOnInit = function () {
    };
    ChatCardPage.prototype.goToChat = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__chat_chat__["a" /* ChatPage */]);
    };
    ChatCardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'chat-card',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\chat-card\chat-card.html"*/'<div class="card" (click)="goToChat()">\n\n    <div class="card-header bg-chat text-header text-white">Chat</div>\n\n    <div class="card-body">Vai alla chat</div>\n\n</div>\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\chat-card\chat-card.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
    ], ChatCardPage);
    return ChatCardPage;
}());

//# sourceMappingURL=chat-card.js.map

/***/ }),
/* 351 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentaleCardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_documentale_card_documentale_card__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DocumentaleCardModule = /** @class */ (function () {
    function DocumentaleCardModule() {
    }
    DocumentaleCardModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_0__pages_documentale_card_documentale_card__["a" /* DocumentaleCardPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_0__pages_documentale_card_documentale_card__["a" /* DocumentaleCardPage */]]
        })
    ], DocumentaleCardModule);
    return DocumentaleCardModule;
}());

//# sourceMappingURL=documentale-card.module.js.map

/***/ }),
/* 352 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentaleCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DocumentaleCardPage = /** @class */ (function () {
    function DocumentaleCardPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    DocumentaleCardPage.prototype.ngOnInit = function () {
    };
    DocumentaleCardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'documentale-card',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\documentale-card\documentale-card.html"*/'\n\n    <button  block outline class="rounded-generic-card button-large button-large-green" ion-button>\n\n        <div>Documentale</div>\n\n        <ion-icon class="icon-button" name="paper">\n\n        </ion-icon>      \n\n    </button>\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\documentale-card\documentale-card.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* NavController */]])
    ], DocumentaleCardPage);
    return DocumentaleCardPage;
}());

//# sourceMappingURL=documentale-card.js.map

/***/ }),
/* 353 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_loading_loading__ = __webpack_require__(129);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var LoadingModule = /** @class */ (function () {
    function LoadingModule() {
    }
    LoadingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__pages_loading_loading__["a" /* LoadingPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["b" /* CommonModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__pages_loading_loading__["a" /* LoadingPage */]
            ],
            providers: []
        })
    ], LoadingModule);
    return LoadingModule;
}());

//# sourceMappingURL=loading.module.js.map

/***/ }),
/* 354 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_chat_chat__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChatModule = /** @class */ (function () {
    function ChatModule() {
    }
    ChatModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__pages_chat_chat__["a" /* ChatPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__pages_chat_chat__["a" /* ChatPage */]]
        })
    ], ChatModule);
    return ChatModule;
}());

//# sourceMappingURL=chat.module.js.map

/***/ }),
/* 355 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyChatModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_mychat_mychat__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MyChatModule = /** @class */ (function () {
    function MyChatModule() {
    }
    MyChatModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__pages_mychat_mychat__["a" /* MyChatPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__pages_mychat_mychat__["a" /* MyChatPage */]]
        })
    ], MyChatModule);
    return MyChatModule;
}());

//# sourceMappingURL=mychat.module.js.map

/***/ }),
/* 356 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfiloModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_profilo_profilo__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProfiloModule = /** @class */ (function () {
    function ProfiloModule() {
    }
    ProfiloModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__pages_profilo_profilo__["a" /* ProfiloPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__pages_profilo_profilo__["a" /* ProfiloPage */]]
        })
    ], ProfiloModule);
    return ProfiloModule;
}());

//# sourceMappingURL=profilo.module.js.map

/***/ }),
/* 357 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComunicazioneService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ComunicazioneService = /** @class */ (function () {
    function ComunicazioneService(http) {
        this.http = http;
    }
    ComunicazioneService.prototype.loadComunicazioniList = function (profileId) {
        return this.http.get(''); //qui dobbiamo inserire la URL del servizio che si sta invocando per la restituzione dell'elenco delle comunicazioni
    };
    ComunicazioneService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__["a" /* HttpService */]])
    ], ComunicazioneService);
    return ComunicazioneService;
}());

//# sourceMappingURL=comunicazione.service.js.map

/***/ }),
/* 358 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_contacts_contacts__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ContactsModule = /** @class */ (function () {
    function ContactsModule() {
    }
    ContactsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__pages_contacts_contacts__["a" /* ContactsPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__pages_contacts_contacts__["a" /* ContactsPage */]]
        })
    ], ContactsModule);
    return ContactsModule;
}());

//# sourceMappingURL=contacts.module.js.map

/***/ }),
/* 359 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactDetailsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_contact_details_contact_details__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ContactDetailsModule = /** @class */ (function () {
    function ContactDetailsModule() {
    }
    ContactDetailsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__pages_contact_details_contact_details__["a" /* ContactDetailsPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__pages_contact_details_contact_details__["a" /* ContactDetailsPage */]]
        })
    ], ContactDetailsModule);
    return ContactDetailsModule;
}());

//# sourceMappingURL=contact-details.module.js.map

/***/ }),
/* 360 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_messaggi_messaggi__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MessaggiModule = /** @class */ (function () {
    function MessaggiModule() {
    }
    MessaggiModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_0__pages_messaggi_messaggi__["a" /* MessaggiPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_0__pages_messaggi_messaggi__["a" /* MessaggiPage */]]
        })
    ], MessaggiModule);
    return MessaggiModule;
}());

//# sourceMappingURL=messaggi.module.js.map

/***/ }),
/* 361 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiDetailsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_messaggi_details_messaggi_details__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MessaggiDetailsModule = /** @class */ (function () {
    function MessaggiDetailsModule() {
    }
    MessaggiDetailsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_0__pages_messaggi_details_messaggi_details__["a" /* MessaggiDetailsPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_0__pages_messaggi_details_messaggi_details__["a" /* MessaggiDetailsPage */]]
        })
    ], MessaggiDetailsModule);
    return MessaggiDetailsModule;
}());

//# sourceMappingURL=messaggi-details.module.js.map

/***/ })
],[250]);
//# sourceMappingURL=main.js.map