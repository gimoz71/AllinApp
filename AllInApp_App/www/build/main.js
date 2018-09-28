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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_login_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_check_service__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(80);
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
                                    _this.ud = rl;
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
    StoreService.prototype.getUserDataPromise = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.ud == null) {
                //store service prima inizializzaione
                _this.storage.get("userData").then(function (val) {
                    //recuperato token dal database
                    if (val != null && val.ErrorMessage.msg_code == 0) {
                        //controllo la validità del token
                        _this.check.checkToken(val.token_value).subscribe(function (r) {
                            //token corretto lo invio
                            if (r.ErrorMessage.msg_code == 0) {
                                _this.ud = r;
                                resolve(r);
                            }
                            else {
                                //token non corretto faccio il login
                                _this.login.login(val.token_user, val.token_password).subscribe(function (rl) {
                                    console.log("log userdata 1");
                                    _this.setUserData(rl);
                                    if (rl.ErrorMessage.msg_code == 0) {
                                        _this.ud = rl;
                                        resolve(rl);
                                    }
                                });
                            }
                        });
                    }
                    else {
                        //devo andare alla pagina del login
                        resolve(null);
                    }
                });
            }
            else {
                //store service già inizializzato
                _this.check.checkToken(_this.ud.token_value).subscribe(
                //check sul token
                function (r) {
                    //token valido lo invio
                    if (r.ErrorMessage.msg_code == 0) {
                        resolve(r);
                    }
                    else {
                        _this.login.login(r.token_user, r.token_password).subscribe(
                        //token non valido faccio il login
                        function (rl) {
                            console.log("log userdata 2");
                            if (rl.ErrorMessage.msg_code == 0) {
                                _this.setUserData(rl);
                                _this.ud = rl;
                                resolve(rl);
                            }
                            else {
                                alert("login non riuscito");
                            }
                        });
                    }
                });
            }
        });
    };
    StoreService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1__shared_check_service__["a" /* CheckService */], __WEBPACK_IMPORTED_MODULE_0__login_login_service__["a" /* LoginService */]])
    ], StoreService);
    return StoreService;
}());

//# sourceMappingURL=store.service.js.map

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__);
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
    function HttpService(http, store) {
        this.http = http;
        this.store = store;
    }
    HttpService.prototype.getToken = function (url) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' });
        return this.http.get(url, { headers: headers });
    };
    HttpService.prototype.get = function (url) {
        return this.http.get(url);
    };
    HttpService.prototype.getNewsList = function (from, to, lette) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.store.getUserDataPromise().then(function (token) {
                var url = "http://allinappws.mesys.it/services/get_elenco_news/" + token.token_value + "/" + from + "/" + to + "/" + lette;
                console.log(url);
                var s = _this.http.get(url).subscribe(function (r) {
                    if (r.ErrorMessage.msg_code == 0) {
                        resolve(r.l_lista_news);
                    }
                    else {
                        reject(r.ErrorMessage);
                    }
                    s.unsubscribe();
                });
            });
        });
    };
    /**public getNewsList(token : string, from : string, to : string , lette : string) : Observable<News.NewsList>{
        let url = "http://allinappws.mesys.it/services/get_elenco_news/"+ token +"/"+from+"/"+to +"/"+ lette;
        console.log(url);
        return this.http.get<News.NewsList>(url);
    }*/
    HttpService.prototype.getPublicNews = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.store.getUserDataPromise().then(function (token) {
                var url = "http://server/services/get_public_news/{token}/{key}/" + token.token_value + "/" + key + "/";
                console.log(url);
                var s = _this.http.get(url).subscribe(function (r) {
                    if (r.ErrorMessage.msg_code == 0) {
                        resolve(r.news);
                    }
                    else {
                        reject(r.ErrorMessage);
                    }
                    s.unsubscribe();
                });
            });
        });
    };
    /** public setReadNews (token : string , key: number): Observable<News.NewsResult>{
         let url = "http://allinappws.mesys.it/services/set_read_news/"+token +"/"+key+"/";
         console.log(url);
         return this.http.get<News.NewsResult>(url);
     }**/
    HttpService.prototype.setReadNews = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.store.getUserDataPromise().then(function (token) {
                var url = "http://allinappws.mesys.it/services/set_read_news/" + token.token_value + "/" + key + "/";
                console.log(url);
                var s = _this.http.get(url).subscribe(function (r) {
                    if (r.ErrorMessage.msg_code == 0) {
                        resolve(r.result);
                    }
                    else {
                        reject(r.ErrorMessage);
                    }
                    s.unsubscribe();
                });
            });
        });
    };
    /**public getMessaggeList(token : string, from : string, to : string , tipo : string):Observable<Messaggi.MessaggiList>{
         let url = "http://allinappws.mesys.it/services/get_elenco_messaggi/"+ token +"/"+from+"/"+to +"/"+ tipo;
         console.log(url);
         return this.http.get<Messaggi.MessaggiList>(url);
     }**/
    HttpService.prototype.getMessaggeList = function (from, to, tipo) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.store.getUserDataPromise().then(function (token) {
                var url = "http://allinappws.mesys.it/services/get_elenco_messaggi/" + token.token_value + "/" + from + "/" + to + "/" + tipo;
                console.log(url);
                var s = _this.http.get(url).subscribe(function (r) {
                    if (r.ErrorMessage.msg_code == 0) {
                        resolve(r.l_lista_messaggi);
                    }
                    else {
                        reject(r.ErrorMessage);
                    }
                    s.unsubscribe();
                });
            });
        });
    };
    /**public getMessagge(token : string, key : number):Observable<Messaggi.BustaMessaggio>{
        let url = "http://allinappws.mesys.it/services/get_messaggio/"+ token +"/"+key;
        console.log(url);
        return this.http.get<Messaggi.BustaMessaggio>(url);
    }*/
    HttpService.prototype.getMessagge = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.store.getUserDataPromise().then(function (token) {
                var url = "http://allinappws.mesys.it/services/get_messaggio/" + token.token_value + "/" + key;
                console.log(url);
                var s = _this.http.get(url).subscribe(function (r) {
                    if (r.ErrorMessage.msg_code == 0) {
                        resolve(r);
                    }
                    else {
                        reject(r.ErrorMessage);
                    }
                    s.unsubscribe();
                });
            });
        });
    };
    /**public setStarMessage (token : string , key: number, stato: string): Observable<Messaggi.MessaggioResult>{
        let url = "http://allinappws.mesys.it/services/set_star_message/"+ token +"/"+key +"/"+stato;
        console.log(url);
        return this.http.get<Messaggi.MessaggioResult>(url);
    }*/
    HttpService.prototype.setStarMessage = function (key, stato) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.store.getUserDataPromise().then(function (token) {
                var url = "http://allinappws.mesys.it/services/set_star_message/" + token.token_value + "/" + key + "/" + stato;
                console.log(url);
                var s = _this.http.get(url).subscribe(function (r) {
                    if (r.ErrorMessage.msg_code == 0) {
                        resolve(r);
                    }
                    else {
                        reject(r.ErrorMessage);
                    }
                    s.unsubscribe();
                });
            });
        });
    };
    /**public setDeleteMessage (token : string , key: number): Observable<Messaggi.MessaggioResult>{
        let url = "http://allinappws.mesys.it/services/set_deleted_message/"+ token +"/"+key;
        console.log(url);
        return this.http.get<Messaggi.MessaggioResult>(url);
    }*/
    HttpService.prototype.setDeleteMessage = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.store.getUserDataPromise().then(function (token) {
                var url = "http://allinappws.mesys.it/services/set_deleted_message/" + token.token_value + "/" + key;
                console.log(url);
                var s = _this.http.get(url).subscribe(function (r) {
                    if (r.ErrorMessage.msg_code == 0) {
                        resolve(r);
                    }
                    else {
                        reject(r.ErrorMessage);
                    }
                    s.unsubscribe();
                });
            });
        });
    };
    /**public deleteMessage (mess): Observable<Messaggi.MessaggioResult>{
        let url = "http://allinappws.mesys.it/services/del_message/";
        console.log(url);
        return this.http.post<Messaggi.MessaggioResult>(url, mess);
    }*/
    HttpService.prototype.deleteMessage = function (mess) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.store.getUserDataPromise().then(function (token) {
                var url = "http://allinappws.mesys.it/services/del_message/";
                console.log(url);
                var s = _this.http.post(url, mess).subscribe(function (r) {
                    if (r.ErrorMessage.msg_code == 0) {
                        resolve(r);
                    }
                    else {
                        reject(r.ErrorMessage);
                    }
                    s.unsubscribe();
                });
            });
        });
    };
    /**public sendMessage(token : string, mess: Messaggi.BustaMessaggio){
        let url = "http://allinappws.mesys.it/services/put_message";
        console.log(url);
        console.log (mess);
        return this.http.post<Messaggi.MessaggioResult>(url, mess);
    }*/
    HttpService.prototype.sendMessage = function (mess) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.store.getUserDataPromise().then(function (token) {
                var url = "http://allinappws.mesys.it/services/put_message";
                console.log(url);
                var s = _this.http.post(url, mess).subscribe(function (r) {
                    if (r.ErrorMessage.msg_code == 0) {
                        resolve(r);
                    }
                    else {
                        reject(r.ErrorMessage);
                    }
                    s.unsubscribe();
                });
            });
        });
    };
    /**public getComunicazioniElenco (token : string , from : number, to: number, lette : string, tipo : string){
        let url = "http://allinappws.mesys.it/services/get_elenco_comunicazioni/"+ token +"/" + from +
            "/" + to +"/" + lette + "/"+ tipo + "/";
        console.log(url);
        return this.http.get<Comunicazione.ComunicazioniElenco>(url);
    }*/
    HttpService.prototype.getComunicazioniElenco = function (from, to, lette, tipo) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.store.getUserDataPromise().then(function (token) {
                var url = "http://allinappws.mesys.it/services/get_elenco_comunicazioni/" + token.token_value + "/" + from +
                    "/" + to + "/" + lette + "/" + tipo + "/";
                console.log(url);
                var s = _this.http.get(url).subscribe(function (r) {
                    if (r.ErrorMessage.msg_code == 0) {
                        resolve(r.l_lista_comunicazione);
                    }
                    else {
                        reject(r.ErrorMessage);
                    }
                    s.unsubscribe();
                });
            });
        });
    };
    /**public getComunicazione (token : string , key: number ){
        let url = "http://allinappws.mesys.it/services/get_public_comunicazione/"
        + token + "/" + key + "/";
        console.log(url);
        return this.http.get<Comunicazione.ComunicazioneResult>(url);
    }*/
    HttpService.prototype.getComunicazione = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.store.getUserDataPromise().then(function (token) {
                var url = "http://allinappws.mesys.it/services/get_public_comunicazione/"
                    + token.token_value + "/" + key + "/";
                console.log(url);
                var s = _this.http.get(url).subscribe(function (r) {
                    if (r.ErrorMessage.msg_code == 0) {
                        resolve(r.comunicazione);
                    }
                    else {
                        reject(r.ErrorMessage);
                    }
                    s.unsubscribe();
                });
            });
        });
    };
    /**public setReadComunicazione (token : string , key : number){
        let url = "http://allinappws.mesys.it/services/set_read_comunicazione/"
            + token + "/" +  key + "/";
        console.log(url);
        return this.http.get<Comunicazione.Result>(url);
    }*/
    HttpService.prototype.setReadComunicazione = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.store.getUserDataPromise().then(function (token) {
                var url = "http://allinappws.mesys.it/services/set_read_comunicazione/"
                    + token.token_value + "/" + key + "/";
                console.log(url);
                var s = _this.http.get(url).subscribe(function (r) {
                    if (r.ErrorMessage.msg_code == 0) {
                        resolve(r.result);
                    }
                    else {
                        reject(r.ErrorMessage);
                    }
                    s.unsubscribe();
                });
            });
        });
    };
    /**public setDeletedComunicazione (token: string , key: number){
        let url = "http://allinappws.mesys.it/services/set_deleted_comunicazione/" + token + "/" + key +"/";
        console.log(url);
        return this.http.get<Comunicazione.Result>(url);
    }*/
    HttpService.prototype.setDeletedComunicazione = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.store.getUserDataPromise().then(function (token) {
                var url = "http://allinappws.mesys.it/services/set_deleted_comunicazione/" + token.token_value + "/" + key + "/";
                console.log(url);
                var s = _this.http.get(url).subscribe(function (r) {
                    if (r.ErrorMessage.msg_code == 0) {
                        resolve(r.result);
                    }
                    else {
                        reject(r.ErrorMessage);
                    }
                    s.unsubscribe();
                });
            });
        });
    };
    /**public getElencoTipoDocumenti(token : string){
        let url = "http://allinappws.mesys.it/services/get_elenco_tipo_documenti/" + token;
        console.log(url);
        return this.http.get<Documentale.tipiElenco>(url);
    }*/
    HttpService.prototype.getElencoTipoDocumenti = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.store.getUserDataPromise().then(function (token) {
                var url = "http://allinappws.mesys.it/services/get_elenco_tipo_documenti/" + token.token_value;
                console.log(url);
                var s = _this.http.get(url).subscribe(function (r) {
                    if (r.ErrorMessage.msg_code == 0) {
                        resolve(r.l_lista_tipo_documenti);
                    }
                    else {
                        reject(r.ErrorMessage);
                    }
                    s.unsubscribe();
                });
            });
        });
    };
    /**public getCategorieDocumenti(token: string, categoria : number){
        let url = "http://allinappws.mesys.it/services/get_elenco_categoria_documenti/"+ token+"/"+categoria;
        console.log(url);
        return this.http.get<Documentale.ListaCategorie>(url);
    }*/
    HttpService.prototype.getCategorieDocumenti = function (categoria) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.store.getUserDataPromise().then(function (token) {
                var url = "http://allinappws.mesys.it/services/get_elenco_categoria_documenti/" + token.token_value + "/" + categoria;
                console.log(url);
                var s = _this.http.get(url).subscribe(function (r) {
                    if (r.ErrorMessage.msg_code == 0) {
                        resolve(r.l_lista_categoria_documenti);
                    }
                    else {
                        reject(r.ErrorMessage);
                    }
                    s.unsubscribe();
                });
            });
        });
    };
    /**public getElencoDocumenti (token : string, from : number, to : number, tipo : number, categoria : number){
        let url = "http://allinappws.mesys.it/services/get_elenco_documenti/"+token+"/"+from +"/"+ to+"/"+
         tipo+ "/"+ categoria;
         console.log(url);
         return this.http.get<Documentale.ListaDocumenti>(url);
    }*/
    HttpService.prototype.getElencoDocumenti = function (from, to, tipo, categoria) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.store.getUserDataPromise().then(function (token) {
                var url = "http://allinappws.mesys.it/services/get_elenco_documenti/" + token.token_value + "/" + from + "/" + to + "/" +
                    tipo + "/" + categoria;
                console.log(url);
                var s = _this.http.get(url).subscribe(function (r) {
                    if (r.ErrorMessage.msg_code == 0) {
                        resolve(r.l_lista_documenti);
                    }
                    else {
                        reject(r.ErrorMessage);
                    }
                    s.unsubscribe();
                });
            });
        });
    };
    /**public getDocumento (token : string , key : number){
        let url = "http://allinappws.mesys.it/services/get_public_documento/" + token + "/"+ key + "/";
        console.log (url);
        return this.http.get<Documentale.DocumentoResult>(url);
    }*/
    HttpService.prototype.getDocumento = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.store.getUserDataPromise().then(function (token) {
                var url = "http://allinappws.mesys.it/services/get_public_documento/" + token.token_value + "/" + key + "/";
                console.log(url);
                var s = _this.http.get(url).subscribe(function (r) {
                    if (r.ErrorMessage.msg_code == 0) {
                        resolve(r.documento);
                    }
                    else {
                        reject(r.ErrorMessage);
                    }
                    s.unsubscribe();
                });
            });
        });
    };
    HttpService.prototype.getModules = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.store.getUserDataPromise().then(function (token) {
                var url = "http://allinappws.mesys.it/services/get_modules/" + token.token_value;
                console.log(url);
                var s = _this.http.get(url).subscribe(function (r) {
                    if (r.ErrorMessage.msg_code == 0) {
                        resolve(r.l_moduli);
                    }
                    else {
                        reject(r.ErrorMessage);
                    }
                    s.unsubscribe();
                });
            });
        });
    };
    HttpService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_0__store_store_service__["a" /* StoreService */]])
    ], HttpService);
    return HttpService;
}());

//# sourceMappingURL=http.service.js.map

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__messaggi_nuovo_messaggi_nuovo__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_shared_http_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(1);
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
        this.http.getModules().then(function (modules) {
            console.log(modules);
            for (var i = 0; i < modules.length; i++) {
                if (modules[i].tab_moduli_cod == 7) {
                    _this.color = modules[i].tab_moduli_colore;
                    _this.icon = modules[i].tab_moduli_icona;
                }
            }
        }, function (error) {
            console.log(error);
        });
        this.mess = this.navParams.get('mess');
        /**let s = this.store.userData$.subscribe(
          (val: Login.Token)=>{
            let s1 = this.http.getMessagge(val.token_value, this.mess.messaggi_key).subscribe(
              (val1)=>{
                this.mess = val1.messaggio;
                console.log(this.mess);
                s1.unsubscribe();
              }
            );
            s.unsubscribe();
          }
        );
        this.store.getUserData();*/
        this.http.getMessagge(this.mess.messaggi_key).then(function (val1) {
            _this.mess = val1.messaggio;
            console.log(_this.mess);
        }, function (error) {
            console.log(error);
        });
    };
    MessaggiDetailsPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    MessaggiDetailsPage.prototype.setDelete = function (mess) {
        /**let s = this.store.userData$.subscribe(
          (val: Login.Token)=>{
            let s1 = this.http.setDeleteMessage(val.token_value, mess.messaggi_key).subscribe(
              (r)=>{
                console.log(r);
                s1.unsubscribe();
              }
            );
            s.unsubscribe();
          }
        );
        this.store.getUserData();*/
        this.http.setDeleteMessage(mess.messaggi_key).then(function (r) {
            console.log(r);
        }, function (error) {
            console.log(error);
        });
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
        /**let s = this.store.userData$.subscribe(
          (val: Login.Token)=>{
            let s1 = this.http.setStarMessage(val.token_value,mess.messaggi_key,stato).subscribe(
              (r)=>{
                console.log(r);
                if (r.ErrorMessage.msg_code == 0){
                  mess.preferito = stato;
                }
                s1.unsubscribe();
              }
            );
            s.unsubscribe();
          }
        );
        this.store.getUserData();*/
        this.http.setStarMessage(mess.messaggi_key, stato).then(function (r) {
            mess.preferito = stato;
        }, function (error) {
            console.log(error);
        });
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
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__ = __webpack_require__(148);
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
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = "http://server/services/put_error";
            _this.http.post(url, data).subscribe(function (val) {
                resolve(val);
            });
        });
    };
    ErrorService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], ErrorService);
    return ErrorService;
}());

//# sourceMappingURL=error.service.js.map

/***/ }),
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(24);
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
/* 41 */,
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_home_com_home_com__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeMessModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_home_mess_home_mess__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(24);
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
        /** this.attivo = attivo;
         this.subscription = this.store.userData$.subscribe((val : Login.Token) =>{
             this.token = val.token_value;
             let url = "http://allinappws.mesys.it/services/get_elenco_dipendenti/"+ this.token +"/"+this.attivo;
             this.http.get<Contact.ContactList>(url).subscribe((val)=>{
                     this.lc = val;
                     this.contactsList.next(this.lc);
                 }
                 );
             this.subscription.unsubscribe();
             }
         );
         this.store.getUserData();**/
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.store.getUserDataPromise().then(function (token) {
                var url = "http://allinappws.mesys.it/services/get_elenco_dipendenti/" + token.token_value + "/" + attivo;
                console.log(url);
                var s = _this.http.get(url).subscribe(function (r) {
                    if (r.ErrorMessage.msg_code == 0) {
                        resolve(r.l_dipendenti);
                    }
                    else {
                        reject(r.ErrorMessage);
                    }
                    s.unsubscribe();
                });
            });
        });
    };
    ContactService.prototype.GetContactDetails = function (key) {
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
        /**console.log("sono in get contacts details");
        this.subscriptionFull = this.store.userData$.subscribe((val : Login.Token) =>{
            if (key == -1) key = val.token_dipendente_key ;
            this.token = val.token_value;
            let url = "http://allinappws.mesys.it/services/get_scheda_dipendente/"+ this.token +"/"+ key;
            console.log(url);
            console.log (val);
            this.http.get<Contact.ContactDataFull>(url).subscribe((val)=>{
                    this.cd = val;
                    this.contactFull.next(this.cd);
                }
                );
            this.subscriptionFull.unsubscribe();
            }
        );
        this.store.getUserData();**/
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.store.getUserDataPromise().then(function (token) {
                var url = "http://allinappws.mesys.it/services/get_scheda_dipendente/" + token.token_value + "/" + key;
                console.log(url);
                var s = _this.http.get(url).subscribe(function (r) {
                    if (r.ErrorMessage.msg_code == 0) {
                        resolve(r.dipendente);
                    }
                    else {
                        reject(r.ErrorMessage);
                    }
                    s.unsubscribe();
                });
            });
        });
    };
    ContactService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1__store_store_service__["a" /* StoreService */]])
    ], ContactService);
    return ContactService;
}());

//# sourceMappingURL=contact.service.js.map

/***/ }),
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComunicazioniDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_shared_http_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_comunicazione_comunicazione_namespace__ = __webpack_require__(61);
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
        this.http.getModules().then(function (modules) {
            console.log(modules);
            for (var i = 0; i < modules.length; i++) {
                if (modules[i].tab_moduli_cod == 7) {
                    _this.color = modules[i].tab_moduli_colore;
                    _this.icon = modules[i].tab_moduli_icona;
                }
            }
        }, function (error) {
            console.log(error);
        });
        var c = this.navParams.get('com');
        this.com = new __WEBPACK_IMPORTED_MODULE_4__models_comunicazione_comunicazione_namespace__["a" /* Comunicazione */].Comunicazione;
        /**let s = this.store.userData$.subscribe(
          (val)=>{
            let s1 = this.http.getComunicazione(val.token_value,c.comunicazione_key).subscribe(
              (val1)=>{
                this.com = val1.comunicazione;
                s1.unsubscribe();
              }
            )
            let s2 = this.http.setReadComunicazione(val.token_value, c.comunicazione_key).subscribe(
              (val2)=>{
                s2.unsubscribe();
              }
            );
            s.unsubscribe();
          }
        )
        this.store.getUserData();*/
        this.http.getComunicazione(c.comunicazione_key).then(function (val1) {
            _this.com = val1;
        }, function (error) {
            console.log(error);
        });
        this.http.setReadComunicazione(c.comunicazione_key).then(function (val2) {
            console.log(val2);
        }, function (error) {
            console.log(error);
        });
    };
    ComunicazioniDetailsPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    ComunicazioniDetailsPage.prototype.delete = function () {
        var _this = this;
        /**let s = this.store.userData$.subscribe(
          (val)=>{
            let s1 = this.http.setDeletedComunicazione(val.token_value, this.com.comunicazione_key).subscribe(
              (val1)=>{
                if (val1.ErrorMessage.msg_code == 0){
                  let alert = this.alertCtrl.create({
                    title: 'Cancellazione',
                    subTitle: 'Cancellazzione andata a buon fine',
                    buttons: ['Dismiss']
                  });
                  alert.present();
                  this.navCtrl.pop();
                }else{
                  let alert = this.alertCtrl.create({
                    title: 'Cancellazione',
                    subTitle: 'Cancellazzione fallita',
                    buttons: ['Dismiss']
                  });
                  alert.present();
                }
                s1.unsubscribe();
              }
            )
            s.unsubscribe();
          }
        )
        this.store.getUserData();*/
        this.http.setDeletedComunicazione(this.com.comunicazione_key).then(function (val1) {
            if (val1.ErrorMessage.msg_code == 0) {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Cancellazione',
                    subTitle: 'Cancellazzione andata a buon fine',
                    buttons: ['Dismiss']
                });
                alert_1.present();
                _this.navCtrl.pop();
            }
            else {
                var alert_2 = _this.alertCtrl.create({
                    title: 'Cancellazione',
                    subTitle: 'Cancellazzione fallita',
                    buttons: ['Dismiss']
                });
                alert_2.present();
            }
        }, function (error) {
            console.log(error);
        });
    };
    ComunicazioniDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'comunicazioni-details',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\comunicazioni-details\comunicazioni-details.html"*/'<ion-header>\n\n  <ion-navbar hideBackButton>\n\n    <ion-buttons left>\n\n      <button (click)="back()" ion-button icon-left clear small>\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n      </button>\n\n      </ion-buttons>\n\n      <ion-title>\n\n        <div class="text-default" >Comunicazioni</div>\n\n      </ion-title>\n\n      <ion-buttons end>\n\n          <button><ion-icon class="icon-button" name="contact" class="nav-icon text-default"></ion-icon></button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  <ion-content>\n\n    <div style="float:right;font-size: 2em;">\n\n      <ion-icon (click)="delete()"  name="trash"></ion-icon>\n\n    </div>\n\n  <img src={{com.cm_immagine}}>\n\n   <h1>{{com.cm_titolo}}</h1>\n\n    <p>{{com.cm_descrizione}}</p>\n\n    <p>{{com.cm_allegato}}</p>\n\n    <p>{{com.cm_data}}</p>\n\n  </ion-content>'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\comunicazioni-details\comunicazioni-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__services_store_store_service__["a" /* StoreService */],
            __WEBPACK_IMPORTED_MODULE_0__services_shared_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */]])
    ], ComunicazioniDetailsPage);
    return ComunicazioniDetailsPage;
}());

//# sourceMappingURL=comunicazioni-details.js.map

/***/ }),
/* 61 */
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
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CircolariDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_shared_http_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_comunicazione_comunicazione_namespace__ = __webpack_require__(61);
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
        this.http.getModules().then(function (modules) {
            console.log(modules);
            for (var i = 0; i < modules.length; i++) {
                if (modules[i].tab_moduli_cod == 7) {
                    _this.color = modules[i].tab_moduli_colore;
                    _this.icon = modules[i].tab_moduli_icona;
                }
            }
        }, function (error) {
            console.log(error);
        });
        var c = this.navParams.get('com');
        this.com = new __WEBPACK_IMPORTED_MODULE_4__models_comunicazione_comunicazione_namespace__["a" /* Comunicazione */].Comunicazione;
        /**let s = this.store.userData$.subscribe(
          (val)=>{
            let s1 = this.http.getComunicazione(val.token_value,c.comunicazione_key).subscribe(
              (val1)=>{
                this.com = val1.comunicazione;
                s1.unsubscribe();
              }
            )
            s.unsubscribe();
          }
        )
        this.store.getUserData();*/
        this.http.getComunicazione(c.comunicazione_key).then(function (val1) {
            _this.com = val1;
        }, function (error) {
            console.log(error);
        });
    };
    CircolariDetailsPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    CircolariDetailsPage.prototype.delete = function () {
        console.log("ciao");
        /**let s = this.store.userData$.subscribe(
          (val)=>{
            let s1 = this.http.setDeletedComunicazione(val.token_value, this.com.comunicazione_key).subscribe(
              (val1)=>{
                s1.unsubscribe();
              }
            )
            s.unsubscribe();
          }
        )
        this.store.getUserData();*/
        this.http.setDeletedComunicazione(this.com.comunicazione_key).then(function (val1) {
            console.log(val1);
        }, function (error) {
            console.log(error);
        });
    };
    CircolariDetailsPage.prototype.read = function () {
        /**let s = this.store.userData$.subscribe(
          (val)=>{
            let s2 = this.http.setReadComunicazione(val.token_value, this.com.comunicazione_key).subscribe(
              (val2)=>{
                console.log (val2);
                if (val2.ErrorMessage.msg_code == 0){
                    let alert = this.alertCtrl.create({
                      title: 'Lettura confermata',
                      subTitle: '',
                      buttons: ['Ok']
                    });
                    alert.present();
                }
                s2.unsubscribe();
              }
            );
            s.unsubscribe();
          }
        )
        this.store.getUserData();*/
        var _this = this;
        var s = this.store.userData$.subscribe(function (val) {
            var s2 = _this.http.setReadComunicazione(_this.com.comunicazione_key).then(function (val2) {
                console.log(val2);
                if (val2.ErrorMessage.msg_code == 0) {
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Lettura confermata',
                        subTitle: '',
                        buttons: ['Ok']
                    });
                    alert_1.present();
                }
            });
        }, function (error) {
            console.log(error);
        });
    };
    CircolariDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'circolari-details',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\circolari-details\circolari-details.html"*/'<ion-header>\n\n  <ion-navbar hideBackButton>\n\n    <ion-buttons left>\n\n      <button (click)="back()" ion-button icon-left clear small>\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n      </button>\n\n      </ion-buttons>\n\n      <ion-title>\n\n        <div class="text-default" >Circolari</div>\n\n      </ion-title>\n\n      <ion-buttons end>\n\n          <button><ion-icon class="icon-button" name="contact" class="nav-icon text-default"></ion-icon></button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  <ion-content>\n\n    <div style="float:right;font-size: 2em;">\n\n      <ion-icon (click)="delete()"  name="trash"></ion-icon>\n\n    </div>\n\n  <img src={{com.cm_immagine}}>\n\n   <h1>{{com.cm_titolo}}</h1>\n\n    <p>{{com.cm_descrizione}}</p>\n\n    <p>{{com.cm_allegato}}</p>\n\n    <p>{{com.cm_data}}</p>\n\n\n\n\n\n  <ion-item>\n\n    <ion-label>Conferma lettura</ion-label>\n\n    <ion-checkbox [(ngModel)]="conferma"></ion-checkbox>\n\n  </ion-item>\n\n  <button *ngIf="conferma==true" ion-button (click)="read()">OK</button>\n\n  </ion-content>'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\circolari-details\circolari-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__services_store_store_service__["a" /* StoreService */],
            __WEBPACK_IMPORTED_MODULE_0__services_shared_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */]])
    ], CircolariDetailsPage);
    return CircolariDetailsPage;
}());

//# sourceMappingURL=circolari-details.js.map

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CircolariPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__circolari_details_circolari_details__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(1);
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
        this.http.getModules().then(function (modules) {
            console.log(modules);
            for (var i = 0; i < modules.length; i++) {
                if (modules[i].tab_moduli_cod == 3) {
                    _this.color = modules[i].tab_moduli_colore;
                    _this.icon = modules[i].tab_moduli_icona;
                }
            }
        }, function (error) {
            console.log(error);
        });
        /**let s = this.store.userData$.subscribe(
          (val)=>{
            let s1 = this.http.getComunicazioniElenco(val.token_value,0,0,'X','R').subscribe(
              (val1)=>{
                this.comFull = val1.l_lista_comunicazione;
                s1.unsubscribe();
              }
            )
            s.unsubscribe();
          }
        )
        this.store.getUserData();*/
        var s1 = this.http.getComunicazioniElenco(0, 0, 'X', 'R').then(function (val1) {
            _this.comFull = val1;
        }, function (error) {
            console.log(error);
        });
    };
    CircolariPage.prototype.goToDetails = function (com) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__circolari_details_circolari_details__["a" /* CircolariDetailsPage */], { com: com });
    };
    CircolariPage.prototype.back = function () {
        /**let s = this.store.userData$.subscribe(
          (val)=>{
            let s1 = this.http.getComunicazioniElenco(val.token_value,0,0,'X','R').subscribe(
              (val1)=>{
                this.comFull = val1.l_lista_comunicazione;
                let lette = true;
                for (let i = 1 ; i < this.comFull.length ; i++){
                  if (this.comFull[i].dc_letta == "N") lette = false;
                }
                if (lette == true )this.navCtrl.pop();
                else{
                  let alert = this.alertCtrl.create({
                    title: 'Aspetta!!',
                    subTitle: 'prima leggi tutte le circolari',
                    buttons: ['Ok']
                  });
                  alert.present();
                }
                s1.unsubscribe();
              }
            )
            s.unsubscribe();
          }
        )
        this.store.getUserData();*/
        var _this = this;
        this.http.getComunicazioniElenco(0, 0, 'X', 'R').then(function (val1) {
            _this.comFull = val1;
            var lette = true;
            for (var i = 1; i < _this.comFull.length; i++) {
                if (_this.comFull[i].dc_letta == "N")
                    lette = false;
            }
            if (lette == true)
                _this.navCtrl.pop();
            else {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Aspetta!!',
                    subTitle: 'prima leggi tutte le circolari',
                    buttons: ['Ok']
                });
                alert_1.present();
            }
        }, function (error) {
            console.log(error);
        });
    };
    CircolariPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-circolari',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\circolari\circolari.html"*/'<!--<ion-header>\n\n  <ion-navbar hideBackButton>\n\n    <ion-buttons left>\n\n      <button (click)="back()" ion-button icon-left clear small>\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-buttons end>\n\n      <button><ion-icon class="icon-button" name="news" class="nav-icon text-default"></ion-icon></button>\n\n    </ion-buttons>\n\n    <ion-title >\n\n      <div class="text-default">Circolari</div>\n\n    </ion-title>\n\n    \n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div *ngFor="let com of comFull">\n\n    <ion-card class="border-blue" *ngIf="com.dc_letta==\'N\'" (click)="goToDetails(com)"  >\n\n      <ion-card-content >\n\n        <h1 >\n\n          {{com.cm_titolo}}\n\n        </h1>\n\n        <p>\n\n        {{com.cm_descrizione}}\n\n        </p>\n\n      </ion-card-content>\n\n    </ion-card>\n\n    <ion-card class="border-green" *ngIf="com.dc_letta==\'S\'" (click)="goToDetails(com)"  >\n\n      <ion-card-content >\n\n        <h1 >\n\n          {{com.cm_titolo}}\n\n        </h1>\n\n        <p>\n\n        {{com.cm_descrizione}}\n\n        </p>\n\n      </ion-card-content>\n\n    </ion-card>\n\n</div>\n\n</ion-content>-->\n\n\n\n<body class="fixed-nav sticky-footer bg-light sidenav-toggled" id="page-top">\n\n    <!-- Navigation-->\n\n    <div class="content-wrapper">\n\n      <div class="container-fluid">\n\n  \n\n        <div class="row">\n\n  \n\n          <!-- CARDS COMUNICAZIONE-->\n\n          <div class="col mb-4" >\n\n            <div class="card-header text-white" [ngStyle]="{\'color\' : color }">Comunicazioni\n\n              <a (click)="back()" class="float-right">\n\n                <i class="fa fa-fw fa-chevron-left"></i>\n\n              </a>\n\n  \n\n            </div>\n\n            <div class="card no-border mb-3 mt-3" >\n\n              <ul class="list-group list-group-flush comm" [ngStyle]="{\'color\' : color }">\n\n                <div *ngFor="let com of comFull">\n\n                  <li class="list-group-item" *ngIf="com.dc_letta==\'N\'" (click)="goToDetails(com)">\n\n                    <div  class="item">\n\n                      <span class="day">21</span>\n\n                      <span [ngStyle]="{\'color\' : color }" class="mounth">Dicembre</span>\n\n                    </div>\n\n                    <div class="brief">\n\n                      <h5 class="title">{{com.cm_titolo}}</h5>\n\n                      <p [ngStyle]="{\'color\' : color }" class="text">{{com.cm_descrizione}}</p>\n\n                      <i [ngStyle]="{\'color\' : color }" class="fa fa-eye read"></i>\n\n                    </div>\n\n                  </li>\n\n                  <li class="list-group-item" *ngIf="com.dc_letta==\'S\'" (click)="goToDetails(com)">\n\n                    <div class="item">\n\n                      <span class="day">21</span>\n\n                      <span class="mounth">Settembre</span>\n\n                    </div>\n\n                    <div class="brief">\n\n                      <h5 class="title">{{com.cm_titolo}}</h5>\n\n                      <p class="text">{{com.cm_descrizione}}</p>\n\n                      <i class="fa fa-eye read"></i>\n\n                    </div>\n\n                  </li>\n\n              </div>\n\n              </ul>\n\n  \n\n            \n\n            </div>\n\n          </div>\n\n  \n\n        </div>\n\n  \n\n      </div>\n\n      <!-- /.container-fluid-->\n\n      <!-- /.content-wrapper-->\n\n      <footer class="sticky-footer">\n\n        <div class="container">\n\n          <div class="text-center">\n\n            <small>Copyright AllinApp 2018</small>\n\n          </div>\n\n        </div>\n\n      </footer>'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\circolari\circolari.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__services_store_store_service__["a" /* StoreService */],
            __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* AlertController */]])
    ], CircolariPage);
    return CircolariPage;
}());

//# sourceMappingURL=circolari.js.map

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComunicazioniPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__comunicazioni_details_comunicazioni_details__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(1);
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
        this.http.getModules().then(function (modules) {
            console.log(modules);
            for (var i = 0; i < modules.length; i++) {
                if (modules[i].tab_moduli_cod == 1) {
                    _this.color = modules[i].tab_moduli_colore;
                    _this.icon = modules[i].tab_moduli_icona;
                }
            }
        }, function (error) {
            console.log(error);
        });
        /**let s = this.store.userData$.subscribe(
          (val)=>{
            let s1 = this.http.getComunicazioniElenco(0,0,'X','C').subscribe(
              (val1)=>{
                this.comFull = val1.l_lista_comunicazione;
                s1.unsubscribe();
              }
            )
            s.unsubscribe();
          }
        )
        this.store.getUserData();*/
        this.http.getComunicazioniElenco(0, 0, 'X', 'C').then(function (val1) {
            _this.comFull = val1;
        }, function (error) {
            console.log(error);
        });
    };
    ComunicazioniPage.prototype.goToDetails = function (com) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__comunicazioni_details_comunicazioni_details__["a" /* ComunicazioniDetailsPage */], { com: com });
    };
    ComunicazioniPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    ComunicazioniPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-comunicazioni',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\comunicazioni\comunicazioni.html"*/'<!--<ion-header>\n\n  <ion-navbar hideBackButton>\n\n    <ion-buttons left>\n\n      <button (click)="back()" ion-button icon-left clear small>\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-buttons end>\n\n      <button><ion-icon class="icon-button" name="news" class="nav-icon text-default"></ion-icon></button>\n\n    </ion-buttons>\n\n    <ion-title >\n\n      <div class="text-default">Comunicazioni</div>\n\n    </ion-title>\n\n    \n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div *ngFor="let com of comFull">\n\n    <ion-card class="border-blue" *ngIf="com.dc_letta==\'N\'" (click)="goToDetails(com)"  >\n\n      <ion-card-content >\n\n        <h1 >\n\n          {{com.cm_titolo}}\n\n        </h1>\n\n        <p>\n\n        {{com.cm_descrizione}}\n\n        </p>\n\n      </ion-card-content>\n\n    </ion-card>\n\n    <ion-card class="border-green" *ngIf="com.dc_letta==\'S\'" (click)="goToDetails(com)"  >\n\n      <ion-card-content >\n\n        <h1 >\n\n          {{com.cm_titolo}}\n\n        </h1>\n\n        <p>\n\n        {{com.cm_descrizione}}\n\n        </p>\n\n      </ion-card-content>\n\n    </ion-card>\n\n</div>\n\n</ion-content>-->\n\n\n\n<body class="fixed-nav sticky-footer bg-light sidenav-toggled" id="page-top">\n\n    <!-- Navigation-->\n\n    <div class="content-wrapper">\n\n      <div class="container-fluid">\n\n  \n\n        <div class="row">\n\n  \n\n          <!-- CARDS COMUNICAZIONE-->\n\n          <div class="col mb-4" >\n\n            <div class="card-header text-white" [ngStyle]="{\'color\' : color }">Comunicazioni\n\n              <a (click)="back()" class="float-right">\n\n                <i class="fa fa-fw fa-chevron-left"></i>\n\n              </a>\n\n  \n\n            </div>\n\n            <div class="card no-border mb-3 mt-3" >\n\n              <ul class="list-group list-group-flush comm" [ngStyle]="{\'color\' : color }">\n\n                <div *ngFor="let com of comFull">\n\n                  <li class="list-group-item" *ngIf="com.dc_letta==\'N\'" (click)="goToDetails(com)">\n\n                    <div  class="item">\n\n                      <span class="day">21</span>\n\n                      <span [ngStyle]="{\'color\' : color }" class="mounth">Dicembre</span>\n\n                    </div>\n\n                    <div class="brief">\n\n                      <h5 class="title">{{com.cm_titolo}}</h5>\n\n                      <p [ngStyle]="{\'color\' : color }" class="text">{{com.cm_descrizione}}</p>\n\n                      <i [ngStyle]="{\'color\' : color }" class="fa fa-eye read"></i>\n\n                    </div>\n\n                  </li>\n\n                  <li class="list-group-item" *ngIf="com.dc_letta==\'S\'" (click)="goToDetails(com)">\n\n                    <div class="item">\n\n                      <span class="day">21</span>\n\n                      <span class="mounth">Settembre</span>\n\n                    </div>\n\n                    <div class="brief">\n\n                      <h5 class="title">{{com.cm_titolo}}</h5>\n\n                      <p class="text">{{com.cm_descrizione}}</p>\n\n                      <i class="fa fa-eye read"></i>\n\n                    </div>\n\n                  </li>\n\n              </div>\n\n              </ul>\n\n  \n\n            \n\n            </div>\n\n          </div>\n\n  \n\n        </div>\n\n  \n\n      </div>\n\n      <!-- /.container-fluid-->\n\n      <!-- /.content-wrapper-->\n\n      <footer class="sticky-footer">\n\n        <div class="container">\n\n          <div class="text-center">\n\n            <small>Copyright AllinApp 2018</small>\n\n          </div>\n\n        </div>\n\n      </footer>'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\comunicazioni\comunicazioni.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__services_store_store_service__["a" /* StoreService */],
            __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__["a" /* HttpService */]])
    ], ComunicazioniPage);
    return ComunicazioniPage;
}());

//# sourceMappingURL=comunicazioni.js.map

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiNuovoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_shared_http_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_contact_contact_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__messaggi_details_messaggi_details__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_messaggi_messaggi_namespace__ = __webpack_require__(233);
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
        this.http.getModules().then(function (modules) {
            console.log(modules);
            for (var i = 0; i < modules.length; i++) {
                if (modules[i].tab_moduli_cod == 7) {
                    _this.color = modules[i].tab_moduli_colore;
                    _this.icon = modules[i].tab_moduli_icona;
                }
            }
        }, function (error) {
            console.log(error);
        });
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
        /**let s  = this.conService.contactsList$.subscribe((val)=>{
          if (val != null){
            if (val.ErrorMessage.msg_code == 0){
              this.contacts = val.l_dipendenti;
              console.log(this.contacts);
            }else{
              alert("errore recupero della risorsa");
            }
          }else{
            console.log("errore in contacts service");
          }
          s.unsubscribe();
        });
        this.conService.GetContacts("X");*/
        this.conService.GetContacts("X").then(function (val) {
            _this.contacts = val;
            console.log(_this.contacts);
        }, function (error) {
            alert("errore recupero della risorsa");
        });
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
        /**let s = this.store.userData$.subscribe((val)=>{
          let mit : Contact.ContactDataMin;
          for (let i=0; i< this.contacts.length; i++ ){
            if (this.contacts[i].dipendenti_key == val.token_dipendente_key){
              mit = this.contacts[i];
            }
          }
          for (let i=0; i< this.contacts.length; i++ ){
            let s = this.contacts[i].nome + " " + this.contacts[i].cognome;
            if (s  == this.nomeDestinatario){
              this.destinatario = this.contacts[i];
            }
          }
          for (let i=0; i< this.contacts.length; i++ ){
            let s = this.contacts[i].nome + " " + this.contacts[i].cognome;
            if (s  == this.nomeConoscenza){
              this.conoscenza = this.contacts[i];
            }
          }
          if (mit != null){
            if (this.destinatario != null){
            let busta: Messaggi.BustaMessaggio = new Messaggi.BustaMessaggio();
            let mess : Messaggi.Messaggio = new Messaggi.Messaggio();
            let con : Messaggi.Conoscenza = new Messaggi.Conoscenza();
            
            mess.mittente_key = val.token_dipendente_key;
            mess.destinatario_key = this.destinatario.dipendenti_key;
            mess.data = new Date().getTime().toString();
            mess.soggetto = this.oggetto;
            mess.messaggio = this.messaggio;
            mess.preferito = 'N';
            mess.stato_lettura =  'N';
            //stato_messaggio: string;
            mess.cognome_mit = mit.cognome;
            mess.nome_mit = mit.nome;
            mess.cognome_des = this.destinatario.cognome;
            mess.nome_des = this.destinatario.nome;
    
            if (this.conoscenza != null){
              con.dipendente_key = this.conoscenza.dipendenti_key;
              con.nominativo = this.conoscenza.nome + " " + this.conoscenza.cognome;
            }
    
            busta.c_conoscenza = [];
            busta.c_conoscenza.push(con);
            busta.messaggio = mess;
            busta.token = val.token_value;
    
            let s1 = this.http.sendMessage(val.token_value, busta).subscribe((r)=>{
              console.log (r);
              if (r.ErrorMessage.msg_code == 0){
                console.log(busta);
                alert ("messaggio inviato correttamente");
              }else{
                alert("errore nell'invio del messaggio");
              }
              s1.unsubscribe();
            });
            s.unsubscribe();
          }else{
            alert("errore recupero mittente");
          }
        }else{
          alert("selezionare destinatario");
        }
        });
        this.store.getUserData();*/
        var s = this.store.getUserDataPromise().then(function (val) {
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
                    _this.http.sendMessage(busta_1).then(function (r) {
                        console.log(r);
                        if (r.ErrorMessage.msg_code == 0) {
                            console.log(busta_1);
                            alert("messaggio inviato correttamente");
                        }
                        else {
                            alert("errore nell'invio del messaggio");
                        }
                    });
                }
                else {
                    alert("errore recupero mittente");
                }
            }
            else {
                alert("selezionare destinatario");
            }
        });
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
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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
        this.http.getModules().then(function (modules) {
            console.log(modules);
            for (var i = 0; i < modules.length; i++) {
                if (modules[i].tab_moduli_cod == 7) {
                    _this.color = modules[i].tab_moduli_colore;
                    _this.icon = modules[i].tab_moduli_icona;
                }
            }
        }, function (error) {
            console.log(error);
        });
        this.news = this.navParams.get('news');
        /**let s = this.store.userData$.subscribe((val)=>{
          let s1 = this.http.setReadNews(val.token_value, this.news.news_key).subscribe(
            (r)=>{
              console.log(r);
            }
          );
          s.unsubscribe();
          }
        );
        this.store.getUserData();*/
        this.http.setReadNews(this.news.news_key).then(function (val) {
            console.log("news letta");
        }, function (error) {
            console.log(error);
        });
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
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_shared_http_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__news_details_news_details__ = __webpack_require__(66);
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
    function NewsPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.borderColor = "border-blue";
    }
    NewsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.http.getModules().then(function (modules) {
            console.log(modules);
            for (var i = 0; i < modules.length; i++) {
                if (modules[i].tab_moduli_cod == 7) {
                    _this.color = modules[i].tab_moduli_colore;
                    _this.icon = modules[i].tab_moduli_icona;
                }
            }
        }, function (error) {
            console.log(error);
        });
        this.newsFull = this.navParams.get('news');
    };
    NewsPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    NewsPage.prototype.goToDetails = function (news) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__news_details_news_details__["a" /* NewsDetailsPage */], { news: news });
    };
    NewsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'news',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\news\news.html"*/'<ion-header>\n\n    <ion-navbar hideBackButton>\n\n      <ion-buttons left>\n\n        <button (click)="back()" ion-button icon-left clear small>\n\n          <ion-icon name="arrow-back"></ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n      <ion-buttons end>\n\n        <button><ion-icon class="icon-button" name="news" class="nav-icon text-default"></ion-icon></button>\n\n      </ion-buttons>\n\n      <ion-title >\n\n        <div class="text-default">News</div>\n\n      </ion-title>\n\n      \n\n    </ion-navbar>\n\n  </ion-header>\n\n  <ion-content>\n\n    <div *ngFor="let news of newsFull">\n\n      <ion-card  class="border-green" *ngIf="news.dn_letta==\'N\'" (click)="goToDetails(news)">\n\n        <ion-card-content >\n\n          <h1 >\n\n            {{news.nw_titolo}}\n\n          </h1>\n\n          <p>\n\n          {{news.nw_descrizione}}\n\n          </p>\n\n        </ion-card-content>\n\n      </ion-card>\n\n      <ion-card  class="border-blue" *ngIf="news.dn_letta!=\'N\'" (click)="goToDetails(news)">\n\n          <ion-card-content >\n\n            <h1 >\n\n              {{news.nw_titolo}}\n\n            </h1>\n\n            <p>\n\n            {{news.nw_descrizione}}\n\n            </p>\n\n          </ion-card-content>\n\n        </ion-card>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\news\news.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__services_shared_http_service__["a" /* HttpService */]])
    ], NewsPage);
    return NewsPage;
}());

//# sourceMappingURL=news.js.map

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_shared_http_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_contact_contact_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__contact_details_contact_details__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_shared_error_service__ = __webpack_require__(36);
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
    function ContactsPage(navCtrl, conService, platform, err, http) {
        this.navCtrl = navCtrl;
        this.conService = conService;
        this.platform = platform;
        this.err = err;
        this.http = http;
        this.contacts = [];
        this.groupedContacts = [];
        this.clonedContacts = [];
    }
    ContactsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.http.getModules().then(function (modules) {
            console.log(modules);
            for (var i = 0; i < modules.length; i++) {
                if (modules[i].tab_moduli_cod == 6) {
                    _this.color = modules[i].tab_moduli_colore;
                    _this.icon = modules[i].tab_moduli_icona;
                }
            }
        }, function (error) {
            console.log(error);
        });
        this.contacts = [];
        /**this.subscrition = this.conService.contactsList$.subscribe((val)=>{
          console.log(val);
          console.log("sono nel costruttore di contact page");
          if (val != null){
            if (val.ErrorMessage.msg_code == 0){
              this.contacts = val.l_dipendenti;
              this.clonedContacts  = Object.assign([], this.contacts);
              this.groupContacts(this.contacts);
              console.log(this.contacts);
            }else{
              alert("errore recupero della risorsa");
              this.err.sendError(val.ErrorMessage);
            }
          }else{
            console.log("errore in contacts service");
          }
        })
        this.conService.GetContacts("X");**/
        this.conService.GetContacts("X").then(function (val) {
            _this.contacts = val;
            _this.clonedContacts = Object.assign([], _this.contacts);
            _this.groupContacts(_this.contacts);
            console.log(_this.contacts);
        }, function (error) {
            console.log(error);
        });
    };
    ContactsPage.prototype.ngOnDestroy = function () {
        //this.subscrition.unsubscribe();
    };
    ContactsPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    ContactsPage.prototype.goToDetails = function (contact) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__contact_details_contact_details__["a" /* ContactDetailsPage */], { contact: contact });
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
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-contacts',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\contacts\contacts.html"*/'<ion-header>\n\n  <ion-navbar hideBackButton>\n\n    <ion-buttons left>\n\n      <button (click)="back()" ion-button icon-left clear small>\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-buttons end>\n\n      <button><i [ngStyle]="{\'color\' : color, \'font-size\': \'2em\' }" [ngClass]="icon"></i></button>\n\n    </ion-buttons>\n\n    <ion-title >\n\n      <div [ngStyle]="{\'color\' : color}" class="text-default">Rubrica</div>\n\n    </ion-title>\n\n    \n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  \n\n    <ion-searchbar  (ionInput)="getItems($event)"></ion-searchbar>\n\n    <ion-list >\n\n        <ion-item-group class="list-group list-group-flush addressBook addBook" *ngFor="let group of groupedContacts">\n\n          <ion-item-divider class="group-header bg-default small text-white" >{{group.letter}}</ion-item-divider>\n\n          <ion-item class="list-group-item" *ngFor="let contact of group.contacts" (click)="goToDetails(contact)" >\n\n              <div class="item" >\n\n                  <div  class="user-small contact-small">\n\n                    <img  src="{{contact.url_avatar}}">\n\n                  </div>\n\n                </div>\n\n                <div class="brief contact-small ">\n\n                  <h5 class="name ">{{contact.nome}} {{contact.cognome}}</h5>\n\n                  <p class="text ">{{contact.ruolo_aziendale}}</p>\n\n                  <i class="fa fa-mobile device"></i>\n\n                </div>\n\n            </ion-item>\n\n        </ion-item-group>\n\n    </ion-list>\n\n    \n\n\n\n\n\n\n\n    <!--<div class="tab-content mt-3">\n\n        <div class="card no-border mb-3 ">\n\n          <div class="card-header bg-default small text-white">R</div>\n\n          <ul class="list-group list-group-flush addressBook addBook">\n\n            <li class="list-group-item" onclick="location.href = \'chat.html\'">\n\n              <div class="item" start>\n\n                <div class="user-small">\n\n                  <img src="/Assets/images/user-thumb.jpg">\n\n                </div>\n\n              </div>\n\n              <div class="brief">\n\n                <h5 class="name">Paolo Rossi</h5>\n\n                <p class="text">Addetto vendite</p>\n\n                <i class="fa fa-mobile device"></i>\n\n              </div>\n\n            </li>\n\n            \n\n          </ul>\n\n          </div></div>-->\n\n      \n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\contacts\contacts.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__services_contact_contact_service__["a" /* ContactService */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_5__services_shared_error_service__["a" /* ErrorService */], __WEBPACK_IMPORTED_MODULE_0__services_shared_http_service__["a" /* HttpService */]])
    ], ContactsPage);
    return ContactsPage;
}());

//# sourceMappingURL=contacts.js.map

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__circolari_circolari__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__news_news__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_login_login_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profilo_profilo__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__contacts_contacts__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__chat_chat__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__comunicazioni_comunicazioni__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_shared_http_service__ = __webpack_require__(8);
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
        this.colonne = [];
        this.posizione = [];
        this.icone = [];
        this.colori = [];
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        //richiedo quali servizi devono essere visualizzati 
        this.presenze["Comunicazioni"] = "false";
        this.presenze["Circolari"] == "false";
        this.presenze["Chat"] = "false";
        this.presenze["Documentale"] = "false";
        this.presenze["Rubrica"] = "false";
        this.presenze["Messaggi"] = "false";
        this.presenze["News"] = "false";
        this.colonne["Comunicazioni"] = 1;
        this.colonne["Circolari"] = 1;
        this.colonne["Chat"] = 1;
        this.colonne["Documentale"] = 1;
        this.colonne["Rubrica"] = 1;
        this.colonne["Messaggi"] = 1;
        this.colonne["News"] = 1;
        this.icone["Comunicazioni"] = "";
        this.icone["Circolari"] = "";
        this.icone["Chat"] = "";
        this.icone["Documentale"] = "";
        this.icone["Rubrica"] = "";
        this.icone["Messaggi"] = "";
        this.icone["News"] = "";
        this.colori["Comunicazioni"] = "";
        this.colori["Circolari"] = "";
        this.colori["Chat"] = "";
        this.colori["Documentale"] = "";
        this.colori["Rubrica"] = "";
        this.colori["Messaggi"] = "";
        this.colori["News"] = "";
        this.http.getModules().then(function (modules) {
            console.log(modules);
            _this.modules = modules;
            for (var i = 0; i < modules.length; i++) {
                if (modules[i].tab_moduli_attivo == "S") {
                    _this.presenze[modules[i].tab_moduli_desc] = "true";
                    _this.colonne[modules[i].tab_moduli_desc] = modules[i].tab_moduli_colonne;
                    _this.icone[modules[i].tab_moduli_desc] = modules[i].tab_moduli_icona;
                    _this.colori[modules[i].tab_moduli_desc] = modules[i].tab_moduli_colore;
                    //this.colonne[modules[i].tab_moduli_desc]= 1;
                    //this.modules[i].tab_moduli_colonne = 1;
                }
                /**if (this.modules[i].tab_moduli_desc=="Messaggi"){
                  this.modules[i].tab_moduli_colonne = 2;
                  this.colonne["Messaggi"]= 2;
                }*/
            }
        }, function (error) {
            console.log(error);
        });
        //ricevo tutti i dati 
        //le prossime verranno eseguite solo se sono presenti nei dati
        var s1 = this.store.getUserDataPromise().then(function (val) {
            console.log(val);
            if (val.flag_richiesta_lettura == true) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__circolari_circolari__["a" /* CircolariPage */]);
            }
        });
    };
    HomePage.prototype.GoProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__profilo_profilo__["a" /* ProfiloPage */]);
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
    HomePage.prototype.goToChat = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__chat_chat__["a" /* ChatPage */]);
    };
    HomePage.prototype.goToContact = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__contacts_contacts__["a" /* ContactsPage */]);
    };
    HomePage.prototype.logOut = function () {
        this.storage.clear();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */]);
    };
    HomePage.prototype.goToComunicazioni = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__comunicazioni_comunicazioni__["a" /* ComunicazioniPage */]);
    };
    HomePage.prototype.goToCircolari = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__circolari_circolari__["a" /* CircolariPage */]);
    };
    HomePage.prototype.goToNews = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__news_news__["a" /* NewsPage */]);
    };
    HomePage.prototype.goToMessaggi = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__comunicazioni_comunicazioni__["a" /* ComunicazioniPage */]);
    };
    HomePage.prototype.goToDocumentale = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__comunicazioni_comunicazioni__["a" /* ComunicazioniPage */]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_9__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar >\n\n	<button ion-button menuToggle ><ion-icon name="menu"></ion-icon></button>\n\n	<ion-title >ALL IN APP</ion-title>\n\n	\n\n    <ion-buttons end><img width="30em" src="assets/imgs/logo.png"></ion-buttons>\n\n	\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-menu id="home"[content]="mycontent">\n\n	<ion-content>\n\n	  <ion-list>\n\n			<ion-item><img width="30em" src="assets/imgs/logo.png"> <div style="position : absolute; left : 4em; top: 1.2em;">ALL IN APP</div></ion-item>\n\n			<ion-item (click)="GoProfile()">  Profilo </ion-item>\n\n			<ion-item *ngIf="this.presenze[\'Comunicazioni\']==\'true\'"(click)="goToComunicazioni()">  <i [ngStyle]="{\'color\' : colori[\'Comunicazioni\'] }" [ngClass]="icone[\'Comunicazioni\']"></i> Comunicazioni</ion-item>\n\n			<ion-item *ngIf="this.presenze[\'Circolari\']==\'true\'"(click)="goToCircolari()"> <i [ngStyle]="{\'color\' : colori[\'Circolari\'] }" [ngClass]="icone[\'Circolari\']"></i> Circolari</ion-item>	\n\n			<ion-item *ngIf="this.presenze[\'Chat\']==\'true\'" (click)="goToChat()"> <i [ngStyle]="{\'color\' : colori[\'Chat\'] }"  [ngClass]="icone[\'Chat\']"></i> Chat</ion-item>\n\n			<ion-item *ngIf="this.presenze[\'News\']==\'true\'"(click)="goToNews()"> <i [ngStyle]="{\'color\' : colori[\'News\'] }" [ngClass]="icone[\'News\']"></i> News</ion-item>\n\n			<ion-item *ngIf="this.presenze[\'Messaggi\']==\'true\'"(click)="goToMessaggi()"> <i [ngStyle]="{\'color\' : colori[\'Messaggi\'] }" [ngClass]="icone[\'Messaggi\']"></i> Messaggi</ion-item>\n\n			<ion-item *ngIf="this.presenze[\'Documentale\']==\'true\'" (click)="goToDocumentale()"> <i [ngStyle]="{\'color\' : colori[\'Documentale\'] }" [ngClass]="icone[\'Documentale\']"></i> Documentale</ion-item>\n\n			<ion-item *ngIf="this.presenze[\'Rubrica\']==\'true\'"(click)="goToContact()"> <i  [ngStyle]="{\'color\' : colori[\'Rubrica\'] }" [ngClass]="icone[\'Rubrica\']"></i> Rubrica</ion-item>			  \n\n			<ion-item (click)="logOut()"> LogOut </ion-item>\n\n			<ion-item (click)="changePassword()">Cambia password</ion-item>\n\n			<ion-item menuClose detail-none>Close Menu</ion-item>\n\n	  </ion-list>\n\n	</ion-content>\n\n  </ion-menu>\n\n  \n\n  <ion-nav #mycontent [root]="rootPage"  ></ion-nav>\n\n\n\n<ion-content >\n\n	<ion-grid >\n\n		<ion-row  class="cards-container" >\n\n			<ion-col *ngIf="this.presenze[\'Circolari\']==\'true\'&&this.colonne[\'Circolari\']==2"  col-12>\n\n				<circolari-card [modules]=modules ></circolari-card>\n\n			</ion-col>\n\n			<ion-col  *ngIf="this.presenze[\'Comunicazioni\']==\'true\'&&this.colonne[\'Comunicazioni\']==2" col-12>\n\n					<comunicazioni-card [modules]=modules></comunicazioni-card>\n\n			</ion-col>\n\n			<ion-col *ngIf="this.presenze[\'Chat\']==\'true\'&&this.colonne[\'Chat\']==2"   col-12>\n\n					<chat-card [modules]=modules ></chat-card>\n\n			</ion-col>\n\n			<ion-col *ngIf="this.presenze[\'News\']==\'true\'&&this.colonne[\'News\']==2" col-12>\n\n				<news-card [modules]=modules  ></news-card>\n\n			</ion-col>\n\n			<ion-col *ngIf="this.presenze[\'Messaggi\']==\'true\'&&this.colonne[\'Messaggi\']==2" col-12>\n\n					<messaggi-card [modules]=modules  ></messaggi-card>\n\n			</ion-col>\n\n			<ion-col *ngIf="this.presenze[\'Documentale\']==\'true\'&&this.colonne[\'Documentale\']==2" col-12>\n\n				<documentale-card [modules]=modules  ></documentale-card>\n\n			</ion-col>\n\n			<ion-col *ngIf="this.presenze[\'Rubrica\']==\'true\'&&this.colonne[\'Rubrica\']==2" col-12>\n\n				<contact-card [modules]=modules  ></contact-card>\n\n			</ion-col>\n\n			<ion-col *ngIf="this.presenze[\'Circolari\']==\'true\'&&this.colonne[\'Circolari\']==1" col-6>\n\n				<circolari-card [modules]=modules ></circolari-card>\n\n			</ion-col>\n\n			<ion-col  *ngIf="this.presenze[\'Comunicazioni\']==\'true\'&&this.colonne[\'Comunicazioni\']==1" col-6>\n\n				<comunicazioni-card [modules]=modules></comunicazioni-card>\n\n			</ion-col>	\n\n			<ion-col *ngIf="this.presenze[\'Chat\']==\'true\'&&this.colonne[\'Chat\']==1"  col-6>\n\n				<chat-card [modules]=modules ></chat-card>\n\n			</ion-col>\n\n			<ion-col *ngIf="this.presenze[\'News\']==\'true\'&&this.colonne[\'News\']==1" col-6>\n\n				<news-card [modules]=modules  ></news-card>\n\n			</ion-col>\n\n			<ion-col *ngIf="this.presenze[\'Messaggi\']==\'true\'&&this.colonne[\'Messaggi\']==1" col-6>\n\n				<messaggi-card [modules]=modules  ></messaggi-card>\n\n			</ion-col>\n\n			<ion-col *ngIf="this.presenze[\'Documentale\']==\'true\'&&this.colonne[\'Documentale\']==1" col-6>\n\n				<documentale-card [modules]=modules  ></documentale-card>\n\n			</ion-col>\n\n			<ion-col *ngIf="this.presenze[\'Rubrica\']==\'true\'&&this.colonne[\'Rubrica\']==1" col-6>\n\n				<contact-card [modules]=modules  ></contact-card>\n\n			</ion-col>	\n\n		</ion-row>\n\n		\n\n	</ion-grid>\n\n	\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_10_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_12__services_shared_http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12__services_shared_http_service__["a" /* HttpService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_10_ionic_angular__["b" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10_ionic_angular__["b" /* AlertController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__services_store_store_service__["a" /* StoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_store_store_service__["a" /* StoreService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__services_login_login_service__["a" /* LoginService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_login_login_service__["a" /* LoginService */]) === "function" && _f || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=home.js.map

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_login_login_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_shared_error_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_login_login_namespace__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(69);
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
        var s = this.loginService.login(this.username, this.password).subscribe(function (r) {
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
            s.unsubscribe();
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
            selector: 'login',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\login\login.html"*/'<ion-content class="bg-dark login" padding>\n\n  <form (ngSubmit)="login()" #registerForm="ngForm" class="container">\n\n    <div class="card-transp card-login mx-auto mt-5">\n\n        <ion-row class="card-header-login">\n\n            <ion-col>\n\n              <div class="logo">AllInApp</div>\n\n            </ion-col>\n\n          </ion-row>\n\n          <ion-row class="card-body">\n\n            <ion-col>\n\n              <ion-list inset>\n\n                <div class="form-group">\n\n                  <input class="form-control" type="text" placeholder="Email" name="email" [(ngModel)]="username" required/>\n\n                </div>\n\n                <div class="form-group">\n\n                  <input class="form-control" type="password" placeholder="Password" name="password" [(ngModel)]="password" required/>  \n\n                </div>\n\n              </ion-list>\n\n            </ion-col>\n\n          </ion-row>\n\n        <ion-row>\n\n          <ion-col>\n\n            <span class="switch switch-sm">\n\n              <input type="checkbox" class="switch" id="switch-id">\n\n              <label for="switch-id">Salva</label>\n\n            </span>\n\n          </ion-col>\n\n          <ion-col>\n\n            <button ion-button class="btn btn-transparent btn-block" full type="submit" [disabled]="!registerForm.form.valid">Entra</button>\n\n          </ion-col>\n\n        </ion-row>\n\n    </div>\n\n  </form>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\login\login.html"*/
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
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentaleListaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__documentale_details_documentale_details__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_shared_error_service__ = __webpack_require__(36);
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






var DocumentaleListaPage = /** @class */ (function () {
    function DocumentaleListaPage(navCtrl, http, store, err, para) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.store = store;
        this.err = err;
        this.para = para;
    }
    DocumentaleListaPage.prototype.ngOnInit = function () {
        var _this = this;
        this.http.getModules().then(function (modules) {
            console.log(modules);
            for (var i = 0; i < modules.length; i++) {
                if (modules[i].tab_moduli_cod == 7) {
                    _this.color = modules[i].tab_moduli_colore;
                    _this.icon = modules[i].tab_moduli_icona;
                }
            }
        }, function (error) {
            console.log(error);
        });
        var cat = this.para.get("cat");
        this.http.getElencoDocumenti(0, 0, cat.tab_tipo_documento_cod, cat.tab_categoria_documento_cod).then(function (val1) {
            _this.lista = val1;
        }, function (error) {
            console.log(error);
        });
    };
    DocumentaleListaPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    DocumentaleListaPage.prototype.goToDetails = function (doc) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__documentale_details_documentale_details__["a" /* DocumentaleDetailsPage */], { doc: doc });
    };
    DocumentaleListaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'documentale-lista',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\documentale-lista\documentale-lista.html"*/'<!--<ion-header>\n\n  <ion-navbar hideBackButton>\n\n    <ion-buttons left>\n\n      <button (click)="back()" ion-button icon-left clear small>\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-buttons end>\n\n      <button><ion-icon class="icon-button" name="contacts" class="nav-icon text-default"></ion-icon></button>\n\n    </ion-buttons>\n\n    <ion-title >\n\n      <div class="text-default">Documentale</div>\n\n    </ion-title>\n\n    \n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div *ngFor="let doc of lista">\n\n    <ion-card   (click)="goToDetails(doc)">\n\n      <ion-card-content >\n\n        <h1 >\n\n          {{doc.tab_tipo_documento_desc}}\n\n        </h1>\n\n        <p>\n\n        {{doc.doc_titolo}}\n\n        </p>\n\n      </ion-card-content>\n\n    </ion-card>\n\n</div>\n\n</ion-content>-->\n\n\n\n<body class="fixed-nav sticky-footer bg-light sidenav-toggled" id="page-top">\n\n\n\n    <div class="content-wrapper">\n\n      <div class="container-fluid">\n\n  \n\n        <div class="row">\n\n  \n\n          <!-- CARDS DOCUMENTALE-->\n\n          <div class="col mb-4">\n\n                <div class="card no-border mb-3 ">\n\n                  <div class="card-header " [ngStyle]="{\'color\' : color }"><i [ngClass]="icon"></i>Documentale\n\n                    <a (click)="back()" class="float-right">\n\n                      <i class="fa fa-fw fa-chevron-left"></i>\n\n                    </a>\n\n                  </div>\n\n                  <ul class="list-group list-group-flush docs addBook">\n\n                      <li  *ngFor="let doc of lista" (click)="goToDetails(doc)" class="list-group-item">\n\n                        <div class="item">\n\n                            <i [ngClass]="icon" [ngStyle]="{\'color\' : color }"></i>\n\n                        </div>\n\n                        <div class="brief">\n\n                          <h5 class="name">{{doc.tab_tipo_documento_desc}}  {{doc.doc_titolo}}</h5>\n\n                        </div>\n\n                      </li>\n\n                  </ul>\n\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n  \n\n        </div>\n\n  \n\n      <!-- /.container-fluid-->\n\n      <!-- /.content-wrapper-->\n\n      <footer class="sticky-footer">\n\n        <div class="container">\n\n          <div class="text-center">\n\n            <small>Copyright AllinApp 2018</small>\n\n          </div>\n\n        </div>\n\n      </footer>\n\n      <!-- Scroll to Top Button-->\n\n      <a class="scroll-to-top rounded" href="#page-top">\n\n        <i class="fa fa-angle-up"></i>\n\n      </a>\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\documentale-lista\documentale-lista.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_5__services_store_store_service__["a" /* StoreService */],
            __WEBPACK_IMPORTED_MODULE_4__services_shared_error_service__["a" /* ErrorService */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */]])
    ], DocumentaleListaPage);
    return DocumentaleListaPage;
}());

//# sourceMappingURL=documentale-lista.js.map

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentaleDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_shared_http_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_shared_error_service__ = __webpack_require__(36);
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





var DocumentaleDetailsPage = /** @class */ (function () {
    function DocumentaleDetailsPage(navCtrl, http, store, err, para) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.store = store;
        this.err = err;
        this.para = para;
    }
    DocumentaleDetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.http.getModules().then(function (modules) {
            console.log(modules);
            for (var i = 0; i < modules.length; i++) {
                if (modules[i].tab_moduli_cod == 7) {
                    _this.color = modules[i].tab_moduli_colore;
                    _this.icon = modules[i].tab_moduli_icona;
                }
            }
        }, function (error) {
            console.log(error);
        });
        this.doc = this.para.get("doc");
        var s1 = this.http.getDocumento(this.doc.documenti_key).then(function (val1) {
            _this.doc = val1;
        }, function (error) {
            console.log(error);
        });
    };
    DocumentaleDetailsPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    DocumentaleDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'documentale-details',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\documentale-details\documentale-details.html"*/'<ion-header>\n\n  <ion-navbar hideBackButton>\n\n    <ion-buttons left>\n\n      <button (click)="back()" ion-button icon-left clear small>\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-buttons end>\n\n      <button><ion-icon class="icon-button" name="contacts" class="nav-icon text-default"></ion-icon></button>\n\n    </ion-buttons>\n\n    <ion-title >\n\n      <div class="text-default">Documentale</div>\n\n    </ion-title>\n\n    \n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <h1>{{doc.doc_titolo}}</h1>\n\n  <p>{{doc.doc_url}}</p>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\documentale-details\documentale-details.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_0__services_shared_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_4__services_store_store_service__["a" /* StoreService */],
            __WEBPACK_IMPORTED_MODULE_3__services_shared_error_service__["a" /* ErrorService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */]])
    ], DocumentaleDetailsPage);
    return DocumentaleDetailsPage;
}());

//# sourceMappingURL=documentale-details.js.map

/***/ }),
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
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentaleCategoriePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__documentale_lista_documentale_lista__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_shared_error_service__ = __webpack_require__(36);
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






var DocumentaleCategoriePage = /** @class */ (function () {
    function DocumentaleCategoriePage(navCtrl, http, store, err, para) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.store = store;
        this.err = err;
        this.para = para;
    }
    DocumentaleCategoriePage.prototype.ngOnInit = function () {
        var _this = this;
        this.http.getModules().then(function (modules) {
            console.log(modules);
            for (var i = 0; i < modules.length; i++) {
                if (modules[i].tab_moduli_cod == 7) {
                    _this.color = modules[i].tab_moduli_colore;
                    _this.icon = modules[i].tab_moduli_icona;
                }
            }
        }, function (error) {
            console.log(error);
        });
        this.categoria = this.para.get("categoria");
        this.http.getCategorieDocumenti(this.categoria).then(function (val1) {
            _this.categorie = val1;
        }, function (error) {
            console.log(error);
        });
    };
    DocumentaleCategoriePage.prototype.goToLista = function (cat) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__documentale_lista_documentale_lista__["a" /* DocumentaleListaPage */], { cat: cat });
    };
    DocumentaleCategoriePage.prototype.back = function () {
        this.navCtrl.pop();
    };
    DocumentaleCategoriePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'documentale-categorie',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\documentale-categorie\documentale-categorie.html"*/'<!--<ion-header>\n\n  <ion-navbar hideBackButton>\n\n    <ion-buttons left>\n\n      <button (click)="back()" ion-button icon-left clear small>\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-buttons end>\n\n      <button><ion-icon class="icon-button" name="contacts" class="nav-icon text-default"></ion-icon></button>\n\n    </ion-buttons>\n\n    <ion-title >\n\n      <div class="text-default">Documentale</div>\n\n    </ion-title>\n\n    \n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div *ngFor="let cate of categorie">\n\n    <ion-card   (click)="goToLista(cate)">\n\n      <ion-card-content >\n\n        <h1 >\n\n          {{cate.tab_categoria_documento_desc}}\n\n        </h1>\n\n        <p>\n\n        {{cate.num_documenti}}\n\n        </p>\n\n      </ion-card-content>\n\n    </ion-card>\n\n</div>\n\n</ion-content>-->\n\n\n\n<body class="fixed-nav sticky-footer bg-light sidenav-toggled" id="page-top">\n\n\n\n    <div class="content-wrapper">\n\n      <div class="container-fluid">\n\n  \n\n        <div class="row">\n\n  \n\n          <!-- CARDS DOCUMENTALE-->\n\n          <div class="col mb-4">\n\n                <div class="card no-border mb-3 ">\n\n                  <div class="card-header " [ngStyle]="{\'color\' : color }"><i [ngClass]="icon"></i>Documentale\n\n                    <a (click)="back()" class="float-right">\n\n                      <i class="fa fa-fw fa-chevron-left"></i>\n\n                    </a>\n\n                  </div>\n\n                  <ul class="list-group list-group-flush docs addBook">\n\n                      <li  *ngFor="let cate of categorie" (click)="goToLista(cate)" class="list-group-item">\n\n                        <div class="item">\n\n                            <i [ngClass]="icon" [ngStyle]="{\'color\' : color }"></i>\n\n                        </div>\n\n                        <div class="brief">\n\n                          <h5 class="name">{{cate.tab_categoria_documento_desc}} {{cate.num_documenti}}</h5>\n\n                        </div>\n\n                      </li>\n\n                  </ul>\n\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n  \n\n        </div>\n\n  \n\n  <!-- /.container-fluid-->\n\n  <!-- /.content-wrapper-->\n\n  <footer class="sticky-footer">\n\n    <div class="container">\n\n      <div class="text-center">\n\n        <small>Copyright AllinApp 2018</small>\n\n      </div>\n\n    </div>\n\n  </footer>\n\n  <!-- Scroll to Top Button-->\n\n  <a class="scroll-to-top rounded" href="#page-top">\n\n    <i class="fa fa-angle-up"></i>\n\n  </a>'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\documentale-categorie\documentale-categorie.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_5__services_store_store_service__["a" /* StoreService */],
            __WEBPACK_IMPORTED_MODULE_4__services_shared_error_service__["a" /* ErrorService */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */]])
    ], DocumentaleCategoriePage);
    return DocumentaleCategoriePage;
}());

//# sourceMappingURL=documentale-categorie.js.map

/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentalePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__documentale_categorie_documentale_categorie__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_shared_error_service__ = __webpack_require__(36);
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






var DocumentalePage = /** @class */ (function () {
    function DocumentalePage(navCtrl, http, store, err) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.store = store;
        this.err = err;
    }
    DocumentalePage.prototype.ngOnInit = function () {
        var _this = this;
        this.http.getModules().then(function (modules) {
            console.log(modules);
            for (var i = 0; i < modules.length; i++) {
                if (modules[i].tab_moduli_cod == 7) {
                    _this.color = modules[i].tab_moduli_colore;
                    _this.icon = modules[i].tab_moduli_icona;
                }
            }
        }, function (error) {
            console.log(error);
        });
        /**let s = this.store.userData$.subscribe(
          (val)=>{
            let s1 = this.http.getElencoTipoDocumenti(val.token_value).subscribe(
              (val1)=>{
                 this.tipi = val1.l_lista_tipo_documenti;
                 s1.unsubscribe();
              }
            )
            s.unsubscribe();
          }
        )
        this.store.getUserData();*/
        var s1 = this.http.getElencoTipoDocumenti().then(function (val1) {
            console.log(val1);
            _this.tipi = val1;
        }, function (error) {
            console.log(error);
        });
    };
    DocumentalePage.prototype.goToCategorie = function (val) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__documentale_categorie_documentale_categorie__["a" /* DocumentaleCategoriePage */], { "categoria": val.tab_tipo_documento_cod });
    };
    DocumentalePage.prototype.back = function () {
        this.navCtrl.pop();
    };
    DocumentalePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-documentale',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\documentale\documentale.html"*/'<!--<ion-header>\n\n  <ion-navbar hideBackButton>\n\n    <ion-buttons left>\n\n      <button (click)="back()" ion-button icon-left clear small>\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-buttons end>\n\n      <button><i [ngClass]="icon" [ngStyle]="{\'color\' : color }"></i></button>\n\n    </ion-buttons>\n\n    <ion-title >\n\n      <div class="text-default">Documentale</div>\n\n    </ion-title>\n\n    \n\n</ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div *ngFor="let tipo of tipi">\n\n    <ion-card   (click)="goToCategorie(tipo)">\n\n      <ion-card-content >\n\n        <h1 >\n\n          {{tipo.tab_tipo_documento_desc}}\n\n        </h1>\n\n        <p>\n\n        {{tipo.num_documenti}}\n\n        </p>\n\n      </ion-card-content>\n\n    </ion-card>\n\n</div>\n\n</ion-content>\n\n\n\n  -->\n\n<body class="fixed-nav sticky-footer bg-light sidenav-toggled" id="page-top">\n\n\n\n	<div class="content-wrapper">\n\n		<div class="container-fluid">\n\n\n\n			<div class="row">\n\n\n\n				<!-- CARDS DOCUMENTALE-->\n\n				<div class="col mb-4">\n\n							<div class="card no-border mb-3 ">\n\n								<div class="card-header " [ngStyle]="{\'color\' : color }"><i [ngClass]="icon"></i>Documentale\n\n									<a (click)="back()" class="float-right">\n\n										<i class="fa fa-fw fa-chevron-left"></i>\n\n									</a>\n\n								</div>\n\n								<ul class="list-group list-group-flush docs addBook">\n\n                    <li  *ngFor="let tipo of tipi" (click)="goToCategorie(tipo)" class="list-group-item">\n\n                      <div class="item">\n\n                          <i [ngClass]="icon" [ngStyle]="{\'color\' : color }"></i>\n\n                      </div>\n\n                      <div class="brief">\n\n                        <h5 class="name">{{tipo.tab_tipo_documento_desc}}  {{tipo.num_documenti}}</h5>\n\n                      </div>\n\n                    </li>\n\n								</ul>\n\n							</div>\n\n						</div>\n\n					</div>\n\n				</div>\n\n\n\n			</div>\n\n\n\n		<!-- /.container-fluid-->\n\n		<!-- /.content-wrapper-->\n\n		<footer class="sticky-footer">\n\n			<div class="container">\n\n				<div class="text-center">\n\n					<small>Copyright AllinApp 2018</small>\n\n				</div>\n\n			</div>\n\n		</footer>\n\n		<!-- Scroll to Top Button-->\n\n		<a class="scroll-to-top rounded" href="#page-top">\n\n			<i class="fa fa-angle-up"></i>\n\n		</a>\n\n		\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\documentale\documentale.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_5__services_store_store_service__["a" /* StoreService */],
            __WEBPACK_IMPORTED_MODULE_4__services_shared_error_service__["a" /* ErrorService */]])
    ], DocumentalePage);
    return DocumentalePage;
}());

//# sourceMappingURL=documentale.js.map

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiUscitaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__messaggi_details_messaggi_details__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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
        this.http.getModules().then(function (modules) {
            console.log(modules);
            for (var i = 0; i < modules.length; i++) {
                if (modules[i].tab_moduli_cod == 7) {
                    _this.color = modules[i].tab_moduli_colore;
                    _this.icon = modules[i].tab_moduli_icona;
                }
            }
        }, function (error) {
            console.log(error);
        });
        /**let s= this.store.userData$.subscribe(
          (val)=>{
            let s1= this.http.getMessaggeList(val.token_value,'0','0','O').subscribe(
              (val1)=>{
                this.messFull = val1.l_lista_messaggi;
                s1.unsubscribe();
              }
            );
            s.unsubscribe();
          }
        )
        this.store.getUserData();*/
        this.http.getMessaggeList("0", "0", "O").then(function (res) {
            _this.messFull = res;
        }, function (error) {
            console.log(error);
        });
    };
    MessaggiUscitaPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    MessaggiUscitaPage.prototype.goToDetails = function (mess) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__messaggi_details_messaggi_details__["a" /* MessaggiDetailsPage */], { mess: mess });
    };
    MessaggiUscitaPage.prototype.setStar = function (mess, stato) {
        /**let s = this.store.userData$.subscribe(
          (val: Login.Token)=>{
            let s1 = this.http.setStarMessage(val.token_value,mess.messaggi_key,stato).subscribe(
              (r)=>{
                console.log(r);
                if (r.ErrorMessage.msg_code == 0){
                  mess.preferito = stato;
                }
                s1.unsubscribe();
              }
            );
            s.unsubscribe();
          }
        );
        this.store.getUserData();*/
        this.http.setStarMessage(mess.messaggi_key, stato).then(function (r) {
            mess.preferito = stato;
        }, function (error) {
            console.log(error);
        });
    };
    MessaggiUscitaPage.prototype.setDelete = function (mess) {
        /**let s = this.store.userData$.subscribe(
          (val: Login.Token)=>{
            let s1 = this.http.setDeleteMessage(val.token_value, mess.messaggi_key).subscribe(
              (r)=>{
                console.log(r);
                s1.unsubscribe();
              }
            );
            s.unsubscribe();
          }
        );
        this.store.getUserData();*/
        this.http.setDeleteMessage(mess.messaggi_key).then(function (r) {
            console.log(r);
        }, function (error) {
            console.log(error);
        });
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
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiCestinoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__messaggi_details_messaggi_details__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_shared_http_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_messaggi_messaggi_namespace__ = __webpack_require__(233);
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
        this.http.getModules().then(function (modules) {
            console.log(modules);
            for (var i = 0; i < modules.length; i++) {
                if (modules[i].tab_moduli_cod == 7) {
                    _this.color = modules[i].tab_moduli_colore;
                    _this.icon = modules[i].tab_moduli_icona;
                }
            }
        }, function (error) {
            console.log(error);
        });
        /**let s= this.store.userData$.subscribe(
          (val)=>{
            let s1 = this.http.getMessaggeList(val.token_value,'0','0','D').subscribe(
              (val1)=>{
                this.messFull = val1.l_lista_messaggi;
                s1.unsubscribe();
              }
            );
            s.unsubscribe();
          }
        )
        this.store.getUserData();*/
        this.http.getMessaggeList("0", "0", "D").then(function (res) {
            _this.messFull = res;
        }, function (error) {
            console.log(error);
        });
    };
    MessaggiCestinoPage.prototype.goToDetails = function (mess) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__messaggi_details_messaggi_details__["a" /* MessaggiDetailsPage */], { mess: mess });
    };
    MessaggiCestinoPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    MessaggiCestinoPage.prototype.delete = function (mess) {
        var _this = this;
        /**let s = this.store.userData$.subscribe(
          (val)=>{
            let busta = new Messaggi.BustaMessaggio();
            busta.messaggio = mess;
            busta.token = val.token_value;
          let s1 = this.http.deleteMessage(busta).subscribe(
            (val1)=>{
              console.log (busta);
              console.log(val1);
              let canc = null;
              if (val.ErrorMessage.msg_code == 0){
                for (let i ; i < this.messFull.length ; i++){
                  if (this.messFull[i].messaggi_key == mess.messaggi_key){
                    canc = i;
                  }
                };
                if (canc != null)this.messFull.slice(canc,1);
                alert ("messaggio eliminato");
              }else{
                alert ("errore cancellazione");
              }
              s1.unsubscribe();
            })
            s.unsubscribe();
          }
        )
        this.store.getUserData();*/
        this.store.getUserDataPromise().then(function (val) {
            (function (val) {
                var busta = new __WEBPACK_IMPORTED_MODULE_5__models_messaggi_messaggi_namespace__["a" /* Messaggi */].BustaMessaggio();
                busta.messaggio = mess;
                busta.token = val.token_value;
                _this.http.deleteMessage(busta).then(function (val1) {
                    console.log(busta);
                    console.log(val1);
                    var canc = null;
                    for (var i = void 0; i < _this.messFull.length; i++) {
                        if (_this.messFull[i].messaggi_key == mess.messaggi_key) {
                            canc = i;
                        }
                    }
                    ;
                    if (canc != null)
                        _this.messFull.slice(canc, 1);
                    alert("messaggio eliminato");
                }, function (error) {
                    console.log(error);
                });
            });
        });
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
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiImportantiPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__messaggi_details_messaggi_details__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(1);
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
        this.http.getModules().then(function (modules) {
            console.log(modules);
            for (var i = 0; i < modules.length; i++) {
                if (modules[i].tab_moduli_cod == 7) {
                    _this.color = modules[i].tab_moduli_colore;
                    _this.icon = modules[i].tab_moduli_icona;
                }
            }
        }, function (error) {
            console.log(error);
        });
        /**let s= this.store.userData$.subscribe(
          (val)=>{
            let s1 =this.http.getMessaggeList(val.token_value,'0','0','P').subscribe(
              (val1)=>{
                this.messFull = val1.l_lista_messaggi;
              }
            );
            s.unsubscribe();
          }
        )
        this.store.getUserData();*/
        this.http.getMessaggeList("0", "0", "P").then(function (res) {
            _this.messFull = res;
        }, function (error) {
            console.log(error);
        });
    };
    MessaggiImportantiPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    MessaggiImportantiPage.prototype.setStar = function (mess, stato) {
        /**let s = this.store.userData$.subscribe(
          (val: Login.Token)=>{
            let s1 = this.http.setStarMessage(val.token_value,mess.messaggi_key,stato).subscribe(
              (r)=>{
                console.log(r);
                if (r.ErrorMessage.msg_code == 0){
                  mess.preferito = stato;
                }
                s1.unsubscribe();
              }
            );
            s.unsubscribe();
          }
        );
        this.store.getUserData();*/
        this.http.setStarMessage(mess.messaggi_key, stato).then(function (r) {
            mess.preferito = stato;
        }, function (error) {
            console.log(error);
        });
    };
    MessaggiImportantiPage.prototype.setDelete = function (mess) {
        /**let s = this.store.userData$.subscribe(
          (val: Login.Token)=>{
            let s1 = this.http.setDeleteMessage(val.token_value, mess.messaggi_key).subscribe(
              (r)=>{
                console.log(r);
                s1.unsubscribe();
              }
            );
            s.unsubscribe();
          }
        );
        this.store.getUserData();*/
        this.http.setDeleteMessage(mess.messaggi_key).then(function (r) {
            console.log(r);
        }, function (error) {
            console.log(error);
        });
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
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__messaggi_uscita_messaggi_uscita__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__messaggi_cestino_messaggi_cestino__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_shared_http_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__messaggi_nuovo_messaggi_nuovo__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__messaggi_details_messaggi_details__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__messaggi_importanti_messaggi_importanti__ = __webpack_require__(128);
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
        this.http.getModules().then(function (modules) {
            console.log(modules);
            for (var i = 0; i < modules.length; i++) {
                if (modules[i].tab_moduli_cod == 7) {
                    _this.color = modules[i].tab_moduli_colore;
                    _this.icon = modules[i].tab_moduli_icona;
                }
            }
        }, function (error) {
            console.log(error);
        });
        this.messFull = this.navParams.get('messFull');
        console.log(this.messFull);
        this.menuCtrl.enable(true, 'messaggi');
        /**let s = this.store.userData$.subscribe((val)=>{
          let s1 = this.http.getMessaggeList(val.token_value,"0","0","I").subscribe(
              (res)=>{
                console.log(res);
                if (res.ErrorMessage.msg_code == 0){
                  this.messFull = res.l_lista_messaggi;
                }else{
                  console.log("errore ricezione News");
                }
                s1.unsubscribe();
              }
            );
            s.unsubscribe();
           }
        );
        this.store.getUserData();*/
        this.http.getMessaggeList("0", "0", "I").then(function (res) {
            _this.messFull = res;
        }, function (error) {
            console.log(error);
        });
    };
    MessaggiPage.prototype.back = function () {
        this.menuCtrl.enable(false, 'messaggi');
        this.menuCtrl.enable(true, 'home');
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
        /**let s = this.store.userData$.subscribe(
          (val: Login.Token)=>{
            let s1 = this.http.setStarMessage(val.token_value,mess.messaggi_key,stato).subscribe(
              (r)=>{
                console.log(r);
                if (r.ErrorMessage.msg_code == 0){
                  mess.preferito = stato;
                }
                s1.unsubscribe();
              }
            );
            s.unsubscribe();
          }
        );
        this.store.getUserData();*/
        this.http.setStarMessage(mess.messaggi_key, stato).then(function (r) {
            mess.preferito = stato;
        }, function (error) {
            console.log(error);
        });
    };
    MessaggiPage.prototype.setDelete = function (mess) {
        /**let s = this.store.userData$.subscribe(
          (val: Login.Token)=>{
            let s1 = this.http.setDeleteMessage(val.token_value, mess.messaggi_key).subscribe(
              (r)=>{
                console.log(r);
                s1.unsubscribe();
              }
            );
            s.unsubscribe();
          }
        );
        this.store.getUserData();*/
        this.http.setDeleteMessage(mess.messaggi_key).then(function (r) {
            console.log(r);
        }, function (error) {
            console.log(error);
        });
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
            selector: 'messaggi',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\messaggi\messaggi.html"*/'<ion-header>\n\n    <ion-navbar hideBackButton>\n\n        <ion-buttons left>\n\n            <button ion-button menuToggle><i [ngClass]="icon"></i></button>\n\n          </ion-buttons>\n\n      <ion-buttons right>\n\n        <button (click)="back()" ion-button icon-left clear small>\n\n          <ion-icon name="arrow-back"></ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n      \n\n      <ion-title >\n\n        <div class="text-default">MESSAGGI</div>\n\n      </ion-title>\n\n      \n\n    </ion-navbar>\n\n\n\n  </ion-header>\n\n  \n\n  <ion-menu type="overlay" id="messaggi" [content]="mycontent1">\n\n      <ion-content>\n\n        <ion-list>\n\n        <ion-item (click)="goTonuovoMessaggio()"> Nuovo </ion-item>\n\n        <ion-item (click)="goToUscitaMessaggi()"> Uscita </ion-item>\n\n        <ion-item (click)="goToImportantiMessaggi()">Importanti</ion-item>\n\n        <ion-item (click)="goToCestinoMessaggio()" >Cestino</ion-item>\n\n        <ion-item menuClose detail-none>Chiudi menu</ion-item>\n\n        </ion-list>\n\n      </ion-content>\n\n      </ion-menu>\n\n    <ion-nav #mycontent1 [root]="rootPage" ></ion-nav>\n\n\n\n  <ion-content>\n\n      <button ion-button menuToggle>Toggle Menu</button>\n\n      <!--<button ion-button (click)="goTonuovoMessaggio()">Nuovo</button>\n\n      <button ion-button (click)="goToUscitaMessaggi()">Uscita</button>\n\n      <button ion-button (click)="goToImportantiMessaggi()">Importanti</button>\n\n      <button ion-button (click)="goToCestinoMessaggio()">Cestino</button>-->\n\n       <!--<div *ngFor="let mess of messFull">\n\n         <ion-card   (click)="goToDetails(mess)">\n\n            <ion-card-content >\n\n              <h1 >\n\n                {{mess.cognome_mit}}\n\n              </h1>\n\n              <p>\n\n              {{mess.soggetto}}\n\n              </p>\n\n            </ion-card-content>\n\n          </ion-card>-->\n\n\n\n          <ion-list >\n\n              \n\n              <ion-item class="list-group-item" *ngFor="let mess of messFull"  >\n\n                  \n\n                  <div class=" box item" >\n\n                      <ion-icon name="eye" (click)="goToDetails(mess)"></ion-icon>\n\n                      <ion-icon name="checkbox"></ion-icon>\n\n                      <ion-icon name="star-outline" *ngIf="mess.preferito==\'\'" (click)="setStar(mess,\'S\')"></ion-icon>\n\n                      <ion-icon name="star-outline" *ngIf="mess.preferito==\'N\'" (click)="setStar(mess,\'S\')"></ion-icon>\n\n                      <ion-icon name="star" *ngIf="mess.preferito==\'S\'" (click)="setStar(mess,\'N\')"></ion-icon>\n\n                      <ion-icon name="trash" (click)="deleteConfirm(mess)"></ion-icon>\n\n                      <!--<div  class="user-small contact-small">\n\n                        <img  src="{{mess.url_avatar}}">\n\n                      </div>-->\n\n                    </div>\n\n                    <div class=" box brief contact-small ">\n\n                      <h5 class="name ">{{mess.cognome_mit}} {{mess.nome_mit}}</h5>\n\n                      <p class="text ">{{mess.soggetto}}</p>\n\n                      <i class="fa fa-mobile device"></i>\n\n                    </div>\n\n                    <div class="box data">\n\n                      {{mess.data}}\n\n                    </div>\n\n                </ion-item>\n\n        </ion-list>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\messaggi\messaggi.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__services_store_store_service__["a" /* StoreService */], __WEBPACK_IMPORTED_MODULE_3__services_shared_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["b" /* AlertController */]])
    ], MessaggiPage);
    return MessaggiPage;
}());

//# sourceMappingURL=messaggi.js.map

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_shared_http_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_contact_contact_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_contact_contact_namespace__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_call_number__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_email_composer__ = __webpack_require__(244);
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
    function ContactDetailsPage(navCtrl, conService, navParams, callNumber, emailComposer, alertCtrl, platform, http) {
        this.navCtrl = navCtrl;
        this.conService = conService;
        this.navParams = navParams;
        this.callNumber = callNumber;
        this.emailComposer = emailComposer;
        this.alertCtrl = alertCtrl;
        this.http = http;
    }
    ContactDetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.http.getModules().then(function (modules) {
            console.log(modules);
            for (var i = 0; i < modules.length; i++) {
                if (modules[i].tab_moduli_cod == 6) {
                    _this.color = modules[i].tab_moduli_colore;
                    _this.icon = modules[i].tab_moduli_icona;
                }
            }
        }, function (error) {
            console.log(error);
        });
        this.contact = new __WEBPACK_IMPORTED_MODULE_2__models_contact_contact_namespace__["a" /* Contact */].Dipendente();
        this.contactMin = this.navParams.get('contact');
        if (this.contactMin) {
            this.message = 'utente trovato ' + this.contactMin.nome;
            /**this.conService.contactsFull$.subscribe((val)=>{
              console.log(val);
                if (val != null){
                  this.contact = val;
                }else{
                  alert("errore recupero risorsa");
                }
              })
            this.conService.GetContactDetails(this.contactMin.dipendenti_key);**/
            this.conService.GetContactDetails(this.contactMin.dipendenti_key).then(function (val) {
                _this.contact = val;
            });
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
        this.callNumber.callNumber(this.contact.telefono, true)
            .then(function (res) { return console.log('Launched dialer!', res); })
            .catch(function (err) { return console.log('Error launching dialer', err); });
    };
    ContactDetailsPage.prototype.email = function () {
        var email = {
            to: this.contact.email,
        };
        this.emailComposer.open(email);
    };
    ContactDetailsPage.prototype.presentConfirmEmail = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Conferma invio e-mail',
            message: 'Vuoi inviare un\'e-mail a ' + this.contact.nome
                + " " + this.contact.cognome + '?',
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
            message: 'Vuoi chiamare ' + this.contact.nome
                + " " + this.contact.cognome + '?',
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
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-contact-details',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\contact-details\contact-details.html"*/'<!--<ion-header>\n\n<ion-navbar hideBackButton>\n\n  <ion-buttons left>\n\n    <button (click)="back()" ion-button icon-left clear small>\n\n      <ion-icon name="arrow-back"></ion-icon>\n\n    </button>\n\n    </ion-buttons>\n\n    <ion-title>\n\n      Rubrica\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-item>\n\n        <img src={{contact.dipendente.url_avatar}} class="avatar-img">\n\n        <h1>{{contact.dipendente.nome}} {{contact.dipendente.cognome}}</h1>\n\n        <ion-grid>\n\n          <ion-row>\n\n          <ion-col class="propretyName">N° INTERNO </ion-col>\n\n          <ion-col class="proprety">{{contact.dipendente.matricola}}</ion-col>\n\n          </ion-row>\n\n          <ion-row>\n\n              <ion-col class="propretyName">RUOLO AZIENDALE  </ion-col>\n\n              <ion-col class="proprety">{{contact.dipendente.ruolo_aziendale}}</ion-col>\n\n          </ion-row>\n\n          <ion-row>\n\n              <ion-col class="propretyName">DIVISIONE </ion-col>\n\n              <ion-col class="proprety">{{contact.dipendente.divisione}}</ion-col>\n\n            </ion-row>\n\n        </ion-grid>\n\n        <div (click)="presentConfirmCall()" class="mailtel"><ion-icon name="call"></ion-icon>{{contact.dipendente.telefono}}</div>\n\n        <div (click)="presentConfirmEmail()" class="mailtel"><ion-icon name="mail"></ion-icon>{{contact.dipendente.email}}</div>\n\n  </ion-item>\n\n</ion-content>-->\n\n\n\n<ion-header>\n\n    <ion-navbar hideBackButton>\n\n      <ion-buttons left>\n\n        <button (click)="back()" ion-button icon-left clear small>\n\n          <ion-icon name="arrow-back"></ion-icon>\n\n        </button>\n\n        </ion-buttons>\n\n        <ion-title>\n\n          <div class="text-default" >RUBRICA</div>\n\n        </ion-title>\n\n        <ion-buttons end>\n\n            <button><i [ngStyle]="{\'color\' : color, \'font-size\': \'2em\' }" [ngClass]="icon"></i></button>\n\n          </ion-buttons>\n\n      </ion-navbar>\n\n    </ion-header>\n\n    <ion-content>\n\n\n\n      <div class="userData text-center">\n\n        <div class="user-bigger  mt-5 mb-3 addBook marginleftimm">\n\n          <img  src={{contact.url_avatar}}>\n\n        </div>\n\n        <h5 class="name">{{contact.nome}} {{contact.cognome}}</h5>\n\n        <p class="role">{{contact.ruolo_aziendale}}</p>\n\n      \n\n        <table class="roleInfo marginleftinfo">\n\n          <tr>\n\n            <td class="text-left">\n\n              N° interno\n\n            </td>\n\n            <td class="text-right">\n\n                {{contact.matricola}}\n\n            </td>\n\n          </tr>\n\n          <tr>\n\n            <td class="text-left">\n\n              Ruolo aziendale\n\n            </td>\n\n            <td class="text-right">\n\n                {{contact.ruolo_aziendale}}\n\n            </td>\n\n          </tr>\n\n          <tr>\n\n            <td class="text-left">\n\n              Mansione\n\n            </td>\n\n            <td class="text-right">\n\n                {{contact.ruolo_aziendale}}\n\n            </td>\n\n          </tr>\n\n        </table>\n\n        <table class="contacts mt-5 mb-5 align-middle marginleftcom">\n\n          <tr (click)="presentConfirmCall()">\n\n            <td class="text-left">\n\n                <ion-icon name="call"></ion-icon>\n\n            </td>\n\n            <td class="text-right">\n\n              <span>{{contact.telefono}}</span>\n\n            </td>\n\n          </tr>\n\n          <tr (click)="presentConfirmEmail()">\n\n            <td class="text-left">\n\n                <ion-icon name="mail"></ion-icon>\n\n      \n\n            </td>\n\n            <td class="text-right" >\n\n                {{contact.email}}\n\n            </td>\n\n          </tr>\n\n        </table>\n\n        <a href="#" class="btn btn-custom btn-sm">DIPENDENZA GERARCHICA</a>\n\n  </div>\n\n  \n\n\n\n\n\n    </ion-content>\n\n\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\contact-details\contact-details.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__services_contact_contact_service__["a" /* ContactService */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_email_composer__["a" /* EmailComposer */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_0__services_shared_http_service__["a" /* HttpService */]])
    ], ContactDetailsPage);
    return ContactDetailsPage;
}());

//# sourceMappingURL=contact-details.js.map

/***/ }),
/* 131 */,
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(71);
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
        /**this.subscrition = this.store.userData$.subscribe((val: Login.Token) =>{
          if (val != null){
            this.navCtrl.setRoot(HomePage);
          }else{
            this.navCtrl.setRoot(LoginPage);
          }
        })
        this.store.getUserData();**/
        this.store.getUserDataPromise().then(function (val) {
            if (val != null) {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
            }
            else {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
            }
        });
    };
    LoadingPage.prototype.ngOnDestroy = function () {
        //this.subscrition.unsubscribe();
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
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfiloPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_file_transfer__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_login_login_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_contact_contact_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_contact_contact_namespace__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(248);
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
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */
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
webpackEmptyAsyncContext.id = 144;

/***/ }),
/* 145 */,
/* 146 */,
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(24);
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
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */
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
webpackEmptyAsyncContext.id = 189;

/***/ }),
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
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CircolariCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__circolari_details_circolari_details__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__circolari_circolari__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_comunicazione_comunicazione_namespace__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_shared_http_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(1);
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
        if (this.modules != undefined) {
            for (var i = 0; i < this.modules.length; i++) {
                if (this.modules[i].tab_moduli_cod == 3) {
                    this.color = this.modules[i].tab_moduli_colore;
                    this.icon = this.modules[i].tab_moduli_icona;
                    this.colonne = this.modules[i].tab_moduli_colonne;
                }
            }
        }
        /**let s = this.store.userData$.subscribe(
          (val)=>{
            let s1 = this.http.getComunicazioniElenco(val.token_value,0,0,'X','R').subscribe(
              (val1)=>{
                this.comunicazioniFull = val1.l_lista_comunicazione;
                s1.unsubscribe();
                if (this.colonne == 2){
                  for (let i = 0; i < 3 ; i++){
                    this.comunicazioniMin[i]= new Comunicazione.ComunicazioneElencoElem();
                    if (this.comunicazioniFull[i] != null)this.comunicazioniMin[i] = this.comunicazioniFull[i];
                  }
                }else{
                  for (let i = 0; i < 4 ; i++){
                    this.comunicazioniMin[i]= new Comunicazione.ComunicazioneElencoElem();
                    if (this.comunicazioniFull[i] != null)this.comunicazioniMin[i] = this.comunicazioniFull[i];
                  }
                }
              }
            )
            s.unsubscribe();
          }
        )
        this.store.getUserData();*/
        this.http.getComunicazioniElenco(0, 0, 'X', 'R').then(function (val1) {
            _this.comunicazioniFull = val1;
            if (_this.colonne == 2) {
                for (var i = 0; i < 3; i++) {
                    _this.comunicazioniMin[i] = new __WEBPACK_IMPORTED_MODULE_2__models_comunicazione_comunicazione_namespace__["a" /* Comunicazione */].ComunicazioneElencoElem();
                    if (_this.comunicazioniFull[i] != null)
                        _this.comunicazioniMin[i] = _this.comunicazioniFull[i];
                }
            }
            else {
                for (var i = 0; i < 4; i++) {
                    _this.comunicazioniMin[i] = new __WEBPACK_IMPORTED_MODULE_2__models_comunicazione_comunicazione_namespace__["a" /* Comunicazione */].ComunicazioneElencoElem();
                    if (_this.comunicazioniFull[i] != null)
                        _this.comunicazioniMin[i] = _this.comunicazioniFull[i];
                }
            }
        }, function (error) {
            console.log(error);
        });
    };
    CircolariCardPage.prototype.goToCircolari = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__circolari_circolari__["a" /* CircolariPage */]);
    };
    CircolariCardPage.prototype.goToDetails = function (com) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__circolari_details_circolari_details__["a" /* CircolariDetailsPage */], { com: com });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], CircolariCardPage.prototype, "modules", void 0);
    CircolariCardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["m" /* Component */])({
            selector: 'circolari-card',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\circolari-card\circolari-card.html"*/'<div class="card card-large">\n\n    <div [ngStyle]="{\'background-color\' : color }" class="card-header bg-comm text-header text-white" (click)="goToCircolari()" >Circolari</div>\n\n    <div class="card-body">\n\n        \n\n        <ul *ngIf="colonne==2" class="list-group list-group-flush comm " >\n\n            <home-com  *ngFor="let data of comunicazioniMin" [color]="color" [date]="data.cm_data" [titolo]="data.cm_titolo" [descrizione]="data.cm_descrizione" (click)="goToDetails(data)" >\n\n            </home-com>\n\n        </ul>\n\n\n\n        <ul *ngIf="colonne==1" class="list-group list-group-flush priority " >\n\n            <home-mess  *ngFor="let data of comunicazioniMin" [color]="color" [icon]="icon" [titolo]="data.cm_titolo" [descrizione]="data.cm_descrizione" (click)="goToDetails(data)" >\n\n            </home-mess>\n\n        </ul>\n\n\n\n    </div>\n\n</div>'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\circolari-card\circolari-card.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__services_shared_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_6__services_store_store_service__["a" /* StoreService */]])
    ], CircolariCardPage);
    return CircolariCardPage;
}());

//# sourceMappingURL=circolari-card.js.map

/***/ }),
/* 230 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CircolariCardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_mess_home_mess_module__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_circolari_card_circolari_card__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_com_home_com_module__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(1);
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
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__pages_circolari_card_circolari_card__["a" /* CircolariCardPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* IonicModule */], __WEBPACK_IMPORTED_MODULE_2__home_com_home_com_module__["a" /* HomeComModule */], __WEBPACK_IMPORTED_MODULE_0__home_mess_home_mess_module__["a" /* HomeMessModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__pages_circolari_card_circolari_card__["a" /* CircolariCardPage */]]
        })
    ], CircolariCardModule);
    return CircolariCardModule;
}());

//# sourceMappingURL=circolari-card.module.js.map

/***/ }),
/* 231 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeMessPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('color'),
        __metadata("design:type", String)
    ], HomeMessPage.prototype, "color", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('icon'),
        __metadata("design:type", String)
    ], HomeMessPage.prototype, "icon", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('titolo'),
        __metadata("design:type", String)
    ], HomeMessPage.prototype, "titolo", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('descrizione'),
        __metadata("design:type", String)
    ], HomeMessPage.prototype, "descrizione", void 0);
    HomeMessPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'home-mess',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\home-mess\home-mess.html"*/'\n\n<li class="list-group-item" >\n\n	<div class="item">\n\n		<i [ngClass]="icon" [ngStyle]="{\'color\' : color }"></i>\n\n	</div>\n\n	<div class="brief">\n\n		<h5>{{titolo}}</h5>\n\n		<p [ngStyle]="{\'color\' : color }" >{{descrizione}}</p>\n\n	</div>\n\n</li>\n\n			'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\home-mess\home-mess.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], HomeMessPage);
    return HomeMessPage;
}());

//# sourceMappingURL=home-mess.js.map

/***/ }),
/* 232 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
        if (this.date != null)
            this.mese = this.date.charAt(5) + this.date.charAt(6);
        if (this.date != null)
            this.giorno = this.date.charAt(8) + this.date.charAt(9);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('color'),
        __metadata("design:type", String)
    ], HomeComPage.prototype, "color", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('date'),
        __metadata("design:type", String)
    ], HomeComPage.prototype, "date", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('titolo'),
        __metadata("design:type", String)
    ], HomeComPage.prototype, "titolo", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('descrizione'),
        __metadata("design:type", String)
    ], HomeComPage.prototype, "descrizione", void 0);
    HomeComPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'home-com',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\home-com\home-com.html"*/'<li class="list-group-item" >\n\n	<div class="item" >\n\n		<span class="day">{{giorno}}</span>\n\n		<span [ngStyle]="{\'color\' : color }" class="mounth">{{mese}}</span>\n\n	</div>\n\n	<div class="brief" >\n\n		<h5 class="title">{{titolo}}</h5>\n\n		<p  [ngStyle]="{\'color\' : color }" class="text">{{descrizione}}</p>\n\n	</div>\n\n</li>'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\home-com\home-com.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], HomeComPage);
    return HomeComPage;
}());

//# sourceMappingURL=home-com.js.map

/***/ }),
/* 233 */
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
/* 234 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__messaggi_details_messaggi_details__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__messaggi_messaggi__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_shared_http_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(1);
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
    function MessaggiCardPage(navCtrl, http, store, menuCtrl) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.store = store;
        this.menuCtrl = menuCtrl;
        this.messFull = [];
        this.messMin = [];
    }
    MessaggiCardPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.modules != undefined) {
            for (var i = 0; i < this.modules.length; i++) {
                if (this.modules[i].tab_moduli_cod == 5) {
                    this.color = this.modules[i].tab_moduli_colore;
                    this.icon = this.modules[i].tab_moduli_icona;
                    this.colonne = this.modules[i].tab_moduli_colonne;
                }
            }
        }
        /**let s = this.store.userData$.subscribe((val)=>{
            let s1 = this.http.getMessaggeList(val.token_value,"0","0","I").subscribe(
                (res)=>{
                  console.log(res);
                  if (res.ErrorMessage.msg_code == 0){
                    this.messFull = res.l_lista_messaggi;
                    if (this.colonne==1){
                      for (let i = 0 ; i < 4 ; i++){
                        if (this.messFull[i] != null){
                          this.messMin[i]=  this.messFull[i];
                        }
                      }
                    }else{
                      for (let i = 0 ; i < 3 ; i++){
                        if (this.messFull[i] != null){
                          this.messMin[i]=  this.messFull[i];
                        }
                      }
                    }
                    
                  }else{
                    console.log("errore ricezione News");
                  }
                  s1.unsubscribe();
                }
              );
              s.unsubscribe();
             }
          );
          this.store.getUserData();*/
        this.http.getMessaggeList("0", "0", "I").then(function (res) {
            console.log(res);
            _this.messFull = res;
            if (_this.colonne == 1) {
                for (var i = 0; i < 4; i++) {
                    if (_this.messFull[i] != null) {
                        _this.messMin[i] = _this.messFull[i];
                    }
                }
            }
            else {
                for (var i = 0; i < 3; i++) {
                    if (_this.messFull[i] != null) {
                        _this.messMin[i] = _this.messFull[i];
                    }
                }
            }
        }, function (error) {
            console.log(error);
        });
    };
    MessaggiCardPage.prototype.goToMessaggi = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__messaggi_messaggi__["a" /* MessaggiPage */], { messFull: this.messFull });
        //this.navCtrl.setRoot(MessaggiPage);
        this.menuCtrl.enable(false, 'home');
    };
    MessaggiCardPage.prototype.goToDetails = function (mess) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__messaggi_details_messaggi_details__["a" /* MessaggiDetailsPage */], { mess: mess });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], MessaggiCardPage.prototype, "modules", void 0);
    MessaggiCardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'messaggi-card',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\messaggi-card\messaggi-card.html"*/'<div class="card" >\n\n    <div  [ngStyle]="{\'background-color\' : color }" class="card-header  text-header text-white" (click)="goToMessaggi()">Messaggi</div>\n\n    <div class="card-body">\n\n        <ul *ngIf="colonne==1" class="list-group list-group-flush priority" >\n\n            <home-mess *ngFor="let data of messMin" [titolo]="data.cognome_mit" [descrizione]="data.soggetto" [color]="color" [icon]="icon"  (click)="goToDetails(data)" >\n\n            </home-mess>\n\n        </ul>\n\n        <ul *ngIf="colonne==2" class="list-group list-group-flush comm" >\n\n            <home-com *ngFor="let data of messMin" [titolo]="data.cognome_mit" [descrizione]="data.soggetto" [color]="color" [date]="data.data"  (click)="goToDetails(data)" >\n\n            </home-com>\n\n        </ul>\n\n    </div>\n\n</div>'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\messaggi-card\messaggi-card.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_shared_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_5__services_store_store_service__["a" /* StoreService */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* MenuController */]])
    ], MessaggiCardPage);
    return MessaggiCardPage;
}());

//# sourceMappingURL=messaggi-card.js.map

/***/ }),
/* 235 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiCardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_com_home_com_module__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_mess_home_mess_module__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_messaggi_card_messaggi_card__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(1);
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
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_2__pages_messaggi_card_messaggi_card__["a" /* MessaggiCardPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* IonicModule */], __WEBPACK_IMPORTED_MODULE_1__home_mess_home_mess_module__["a" /* HomeMessModule */], __WEBPACK_IMPORTED_MODULE_0__home_com_home_com_module__["a" /* HomeComModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__pages_messaggi_card_messaggi_card__["a" /* MessaggiCardPage */]]
        })
    ], MessaggiCardModule);
    return MessaggiCardModule;
}());

//# sourceMappingURL=messaggi-card.module.js.map

/***/ }),
/* 236 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComunicazioniCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__comunicazioni_details_comunicazioni_details__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__comunicazioni_comunicazioni__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_comunicazione_comunicazione_namespace__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_shared_http_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(1);
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
        if (this.modules != undefined) {
            for (var i = 0; i < this.modules.length; i++) {
                if (this.modules[i].tab_moduli_cod == 1) {
                    this.color = this.modules[i].tab_moduli_colore;
                    this.icon = this.modules[i].tab_moduli_icona;
                    this.colonne = this.modules[i].tab_moduli_colonne;
                }
            }
        }
        //this.colonne = 1;
        /**let s = this.store.userData$.subscribe(
          (val)=>{
            let s1 = this.http.getComunicazioniElenco(val.token_value,0,0,'X','C').subscribe(
              (val1)=>{
                this.comunicazioniFull = val1.l_lista_comunicazione;
                s1.unsubscribe();
                if (this.colonne == 2){
                  for (let i = 0; i < 3 ; i++){
                    this.comunicazioniMin[i]= new Comunicazione.ComunicazioneElencoElem();
                    if (this.comunicazioniFull[i] != null)this.comunicazioniMin[i] = this.comunicazioniFull[i];
                  }
                }else{
                  for (let i = 0; i < 4 ; i++){
                    this.comunicazioniMin[i]= new Comunicazione.ComunicazioneElencoElem();
                    if (this.comunicazioniFull[i] != null)this.comunicazioniMin[i] = this.comunicazioniFull[i];
                  }
                }
              }
            )
            s.unsubscribe();
          }
        )
        this.store.getUserData();*/
        this.http.getComunicazioniElenco(0, 0, 'X', 'C').then(function (val1) {
            _this.comunicazioniFull = val1;
            if (_this.colonne == 2) {
                for (var i = 0; i < 3; i++) {
                    _this.comunicazioniMin[i] = new __WEBPACK_IMPORTED_MODULE_2__models_comunicazione_comunicazione_namespace__["a" /* Comunicazione */].ComunicazioneElencoElem();
                    if (_this.comunicazioniFull[i] != null)
                        _this.comunicazioniMin[i] = _this.comunicazioniFull[i];
                }
            }
            else {
                for (var i = 0; i < 4; i++) {
                    _this.comunicazioniMin[i] = new __WEBPACK_IMPORTED_MODULE_2__models_comunicazione_comunicazione_namespace__["a" /* Comunicazione */].ComunicazioneElencoElem();
                    if (_this.comunicazioniFull[i] != null)
                        _this.comunicazioniMin[i] = _this.comunicazioniFull[i];
                }
            }
        }, function (error) {
            console.log(error);
        });
    };
    ComunicazioniCardPage.prototype.goToComunicazioni = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__comunicazioni_comunicazioni__["a" /* ComunicazioniPage */]);
    };
    ComunicazioniCardPage.prototype.goToDetails = function (com) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__comunicazioni_details_comunicazioni_details__["a" /* ComunicazioniDetailsPage */], { com: com });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], ComunicazioniCardPage.prototype, "modules", void 0);
    ComunicazioniCardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["m" /* Component */])({
            selector: 'comunicazioni-card',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\comunicazioni-card\comunicazioni-card.html"*/'<div class="card card-large">\n\n    <div [ngStyle]="{\'background-color\' : color }" class="card-header text-header text-white"  (click)="goToComunicazioni()" >Comunicazioni</div>\n\n    <div class="card-body">\n\n        \n\n        <ul *ngIf="colonne==2" class="list-group list-group-flush comm  " >\n\n            <home-com  *ngFor="let data of comunicazioniMin" [color]="color" [date]="data.cm_data" [titolo]="data.cm_titolo" [descrizione]="data.cm_descrizione" (click)="goToDetails(data)" >\n\n            </home-com>\n\n        </ul>\n\n        \n\n        <ul *ngIf="colonne==1" class="list-group list-group-flush priority  " >\n\n            <home-mess  *ngFor="let data of comunicazioniMin" [color]="color" [icon]="icon" [titolo]="data.cm_titolo" [descrizione]="data.cm_descrizione" (click)="goToDetails(data)">\n\n            </home-mess>\n\n        </ul>\n\n        \n\n    </div>\n\n</div>'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\comunicazioni-card\comunicazioni-card.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__services_shared_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_6__services_store_store_service__["a" /* StoreService */]])
    ], ComunicazioniCardPage);
    return ComunicazioniCardPage;
}());

//# sourceMappingURL=comunicazioni-card.js.map

/***/ }),
/* 237 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__news_details_news_details__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__news_news__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_shared_http_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(1);
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
        if (this.modules != undefined) {
            for (var i = 0; i < this.modules.length; i++) {
                if (this.modules[i].tab_moduli_cod == 2) {
                    this.color = this.modules[i].tab_moduli_colore;
                    this.icon = this.modules[i].tab_moduli_icona;
                    this.colonne = this.modules[i].tab_moduli_colonne;
                }
            }
        }
        /**let s = this.store.userData$.subscribe((val)=>{
            let s1 = this.http.getNewsList(val.token_value,"0","0","X").subscribe(
                (res)=>{
                  console.log(res);
                  if (res.ErrorMessage.msg_code == 0){
                    this.newsFull = res.l_lista_news;
                    if (this.colonne == 1){
                      for (let i = 0 ; i < 4 ; i++){
                        if (this.newsFull[i] != null){
                          this.newsMin[i]=  this.newsFull[i];
                        }
                      }
                    }else{
                      for (let i = 0 ; i < 3 ; i++){
                        if (this.newsFull[i] != null){
                          this.newsMin[i]=  this.newsFull[i];
                        }
                      }
                    }
                    
                  }else{
                    console.log("errore ricezione News");
                  }
                  s1.unsubscribe();
                }
              );
              s.unsubscribe();
             }
          );
          this.store.getUserData();**/
        this.http.getNewsList("0", "0", "X").then(function (res) {
            _this.newsFull = res;
            if (_this.colonne == 1) {
                for (var i = 0; i < 4; i++) {
                    if (_this.newsFull[i] != null) {
                        _this.newsMin[i] = _this.newsFull[i];
                    }
                }
            }
            else {
                for (var i = 0; i < 3; i++) {
                    if (_this.newsFull[i] != null) {
                        _this.newsMin[i] = _this.newsFull[i];
                    }
                }
            }
        }, function (error) {
            console.log("errore ricezione News");
            console.log(error);
        });
    };
    NewsCardPage.prototype.goToNews = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__news_news__["a" /* NewsPage */], { news: this.newsFull });
    };
    NewsCardPage.prototype.goToDetails = function (news) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__news_details_news_details__["a" /* NewsDetailsPage */], { news: news });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], NewsCardPage.prototype, "modules", void 0);
    NewsCardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'news-card',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\news-card\news-card.html"*/'<div class="card" >\n\n    <div [ngStyle]="{\'background-color\' : color }" class="card-header bg-comm text-header text-white" (click)="goToNews()">News</div>\n\n    <div class="card-body">\n\n        <ul *ngIf="colonne==1"  class="list-group list-group-flush priority" >\n\n            <home-mess *ngFor="let data of newsMin" [titolo]="data.nw_titolo" [descrizione]="data.nw_descrizione" [color]="color" [icon]="icon"(click)="goToDetails(data)" >\n\n            </home-mess>\n\n        </ul>\n\n        <ul *ngIf="colonne==2"  class="list-group list-group-flush comm" >\n\n            <home-com *ngFor="let data of newsMin" [titolo]="data.nw_titolo" [descrizione]="data.nw_descrizione" [color]="color" [date]="data.nw_data" (click)="goToDetails(data)" >\n\n            </home-com>\n\n        </ul>\n\n    </div>\n\n</div>'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\news-card\news-card.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_shared_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_5__services_store_store_service__["a" /* StoreService */]])
    ], NewsCardPage);
    return NewsCardPage;
}());

//# sourceMappingURL=news-card.js.map

/***/ }),
/* 238 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsCardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_com_home_com_module__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_news_card_news_card__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_mess_home_mess_module__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(1);
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
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__pages_news_card_news_card__["a" /* NewsCardPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* IonicModule */], __WEBPACK_IMPORTED_MODULE_2__home_mess_home_mess_module__["a" /* HomeMessModule */], __WEBPACK_IMPORTED_MODULE_0__home_com_home_com_module__["a" /* HomeComModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__pages_news_card_news_card__["a" /* NewsCardPage */]]
        })
    ], NewsCardModule);
    return NewsCardModule;
}());

//# sourceMappingURL=news-card.module.js.map

/***/ }),
/* 239 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactCardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_contact_card_contact_card__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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
/* 240 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__contacts_contacts__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
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
        if (this.modules != undefined) {
            for (var i = 0; i < this.modules.length; i++) {
                if (this.modules[i].tab_moduli_cod == 6) {
                    this.color = this.modules[i].tab_moduli_colore;
                    this.icon = this.modules[i].tab_moduli_icona;
                    this.colonne = this.modules[i].tab_moduli_colonne;
                }
            }
        }
    };
    ContactCardPage.prototype.goToContact = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__contacts_contacts__["a" /* ContactsPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], ContactCardPage.prototype, "modules", void 0);
    ContactCardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'contact-card',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\contact-card\contact-card.html"*/'<div class="card" (click)="goToContact()">\n\n    <div [ngStyle]="{\'background-color\' : color }" class="card-header bg-comm text-header text-white" >Rubrica</div>\n\n    <div class="card-body">\n\n        <ul class="list-group list-group-flush priority" >\n\n                <i [ngClass]="icon" [ngStyle]="{\'color\' : color }" style="font-size: 5em"></i>\n\n        </ul>\n\n    </div>\n\n</div>\n\n'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\contact-card\contact-card.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
    ], ContactCardPage);
    return ContactCardPage;
}());

//# sourceMappingURL=contact-card.js.map

/***/ }),
/* 241 */
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
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComunicazioniCardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_mess_home_mess_module__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_com_home_com_module__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_comunicazioni_card_comunicazioni_card__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(1);
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
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_2__pages_comunicazioni_card_comunicazioni_card__["a" /* ComunicazioniCardPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* IonicModule */], __WEBPACK_IMPORTED_MODULE_1__home_com_home_com_module__["a" /* HomeComModule */], __WEBPACK_IMPORTED_MODULE_0__home_mess_home_mess_module__["a" /* HomeMessModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__pages_comunicazioni_card_comunicazioni_card__["a" /* ComunicazioniCardPage */]]
        })
    ], ComunicazioniCardModule);
    return ComunicazioniCardModule;
}());

//# sourceMappingURL=comunicazioni-card.module.js.map

/***/ }),
/* 250 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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
/* 251 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(272);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),
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
/* 271 */,
/* 272 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_documentale_lista_documentale_lista__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_documentale_lista_documentale_lista_module__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_documentale_details_documentale_details__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_documentale_details_documentale_details_module__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_documentale_categorie_documentale_categorie__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_documentale_documentale__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_documentale_documentale_module__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_comunicazioni_details_comunicazioni_details__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_circolari_details_circolari_details_module__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_circolari_details_circolari_details__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_circolari_card_circolari_card__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_circolari_circolari__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__modules_circolari_card_circolari_card_module__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__modules_circolari_circolari_module__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__modules_comunicazioni_details_comunicazioni_details_module__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__modules_comunicazioni_comunicazioni_module__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_messaggi_uscita_messaggi_uscita__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_messaggi_cestino_messaggi_cestino__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_messaggi_importanti_messaggi_importanti__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__modules_messaggi_uscita_messaggi_uscita_module__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__modules_messaggi_cestino_messaggi_cestino_module__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__modules_messaggi_importanti_messaggi_importanti_module__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_messaggi_nuovo_messaggi_nuovo__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__modules_messaggi_nuovo_messaggi_nuovo_module__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_home_mess_home_mess__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_messaggi_card_messaggi_card__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_messaggi_details_messaggi_details__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_messaggi_messaggi__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__modules_home_mess_home_mess_module__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__modules_messaggi_card_messaggi_card_module__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_comunicazioni_card_comunicazioni_card__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_news_details_news_details__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__modules_news_details_news_details_module__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_news_card_news_card__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__modules_news_news_module__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__modules_news_card_news_card_module__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__modules_contact_card_contact_card_module__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_contact_card_contact_card__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_home_com_home_com__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__modules_home_com_home_com_module__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__ionic_native_base64__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__ionic_native_email_composer__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__ionic_native_call_number__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__services_shared_error_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__angular_platform_browser__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__angular_common_http__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__ionic_native_status_bar__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__ionic_native_splash_screen__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__app_component__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__ionic_native_file_transfer__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__ionic_native_file__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__ionic_native_camera__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__modules_login_login_module__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__modules_home_home_module__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__modules_loading_loading_module__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__modules_chat_chat_module__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__modules_mychat_mychat_module__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__modules_profilo_profilo_module__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__pages_home_home__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__pages_login_login__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__pages_loading_loading__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__pages_chat_chat__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__pages_mychat_mychat__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__pages_contacts_contacts__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__pages_contact_details_contact_details__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__pages_profilo_profilo__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__services_comunicazione_service__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__services_shared_http_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70__services_login_login_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71__ionic_storage__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_73__services_contact_contact_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_74__modules_contacts_contacts_module__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_75__modules_contact_details_contact_details_module__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_76__services_shared_check_service__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_77__pages_news_news__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_78__modules_comunicazioni_card_comunicazioni_card_module__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_79__modules_messaggi_messaggi_module__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_80__modules_messaggi_details_messaggi_details_module__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_81__pages_comunicazioni_comunicazioni__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_82__modules_documentale_categorie_documentale_categorie_module__ = __webpack_require__(361);
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
        Object(__WEBPACK_IMPORTED_MODULE_44__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_50__app_component__["a" /* MyApp */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_46_ionic_angular__["e" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_45__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_54__modules_login_login_module__["a" /* LoginModule */],
                __WEBPACK_IMPORTED_MODULE_47__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_55__modules_home_home_module__["a" /* HomeModule */],
                __WEBPACK_IMPORTED_MODULE_78__modules_comunicazioni_card_comunicazioni_card_module__["a" /* ComunicazioniCardModule */],
                __WEBPACK_IMPORTED_MODULE_15__modules_comunicazioni_comunicazioni_module__["a" /* ComunicazioniPageModule */],
                __WEBPACK_IMPORTED_MODULE_14__modules_comunicazioni_details_comunicazioni_details_module__["a" /* ComunicazioniDetailsModule */],
                __WEBPACK_IMPORTED_MODULE_39__modules_home_com_home_com_module__["a" /* HomeComModule */],
                __WEBPACK_IMPORTED_MODULE_56__modules_loading_loading_module__["a" /* LoadingModule */],
                __WEBPACK_IMPORTED_MODULE_57__modules_chat_chat_module__["a" /* ChatModule */],
                __WEBPACK_IMPORTED_MODULE_58__modules_mychat_mychat_module__["a" /* MyChatModule */],
                __WEBPACK_IMPORTED_MODULE_74__modules_contacts_contacts_module__["a" /* ContactsModule */],
                __WEBPACK_IMPORTED_MODULE_75__modules_contact_details_contact_details_module__["a" /* ContactDetailsModule */],
                __WEBPACK_IMPORTED_MODULE_59__modules_profilo_profilo_module__["a" /* ProfiloModule */],
                __WEBPACK_IMPORTED_MODULE_36__modules_contact_card_contact_card_module__["a" /* ContactCardModule */],
                __WEBPACK_IMPORTED_MODULE_35__modules_news_card_news_card_module__["a" /* NewsCardModule */],
                __WEBPACK_IMPORTED_MODULE_34__modules_news_news_module__["a" /* NewsModule */],
                __WEBPACK_IMPORTED_MODULE_32__modules_news_details_news_details_module__["a" /* NewsDetailsModule */],
                __WEBPACK_IMPORTED_MODULE_79__modules_messaggi_messaggi_module__["a" /* MessaggiModule */],
                __WEBPACK_IMPORTED_MODULE_80__modules_messaggi_details_messaggi_details_module__["a" /* MessaggiDetailsModule */],
                __WEBPACK_IMPORTED_MODULE_29__modules_messaggi_card_messaggi_card_module__["a" /* MessaggiCardModule */],
                __WEBPACK_IMPORTED_MODULE_28__modules_home_mess_home_mess_module__["a" /* HomeMessModule */],
                __WEBPACK_IMPORTED_MODULE_23__modules_messaggi_nuovo_messaggi_nuovo_module__["a" /* MessaggiNuovoModule */],
                __WEBPACK_IMPORTED_MODULE_21__modules_messaggi_importanti_messaggi_importanti_module__["a" /* MessaggiImportantiModule */],
                __WEBPACK_IMPORTED_MODULE_19__modules_messaggi_uscita_messaggi_uscita_module__["a" /* MessaggiUscitaModule */],
                __WEBPACK_IMPORTED_MODULE_20__modules_messaggi_cestino_messaggi_cestino_module__["a" /* MessaggiCestinoModule */],
                __WEBPACK_IMPORTED_MODULE_13__modules_circolari_circolari_module__["a" /* CircolariPageModule */],
                __WEBPACK_IMPORTED_MODULE_12__modules_circolari_card_circolari_card_module__["a" /* CircolariCardModule */],
                __WEBPACK_IMPORTED_MODULE_8__modules_circolari_details_circolari_details_module__["a" /* CircolariDetailsModule */],
                __WEBPACK_IMPORTED_MODULE_6__modules_documentale_documentale_module__["a" /* DocumentaleModule */],
                __WEBPACK_IMPORTED_MODULE_82__modules_documentale_categorie_documentale_categorie_module__["a" /* DocumentaleCategorieModule */],
                __WEBPACK_IMPORTED_MODULE_3__modules_documentale_details_documentale_details_module__["a" /* DocumentaleDetailsModule */],
                __WEBPACK_IMPORTED_MODULE_1__modules_documentale_lista_documentale_lista_module__["a" /* DocumentaleListaModule */],
                __WEBPACK_IMPORTED_MODULE_46_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_50__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_71__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_46_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_50__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_60__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_comunicazioni_card_comunicazioni_card__["a" /* ComunicazioniCardPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_home_com_home_com__["a" /* HomeComPage */],
                __WEBPACK_IMPORTED_MODULE_65__pages_contacts_contacts__["a" /* ContactsPage */],
                // TabsPage,
                __WEBPACK_IMPORTED_MODULE_81__pages_comunicazioni_comunicazioni__["a" /* ComunicazioniPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_comunicazioni_details_comunicazioni_details__["a" /* ComunicazioniDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_61__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_62__pages_loading_loading__["a" /* LoadingPage */],
                __WEBPACK_IMPORTED_MODULE_63__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_64__pages_mychat_mychat__["a" /* MyChatPage */],
                __WEBPACK_IMPORTED_MODULE_67__pages_profilo_profilo__["a" /* ProfiloPage */],
                __WEBPACK_IMPORTED_MODULE_66__pages_contact_details_contact_details__["a" /* ContactDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_contact_card_contact_card__["a" /* ContactCardPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_news_card_news_card__["a" /* NewsCardPage */],
                __WEBPACK_IMPORTED_MODULE_77__pages_news_news__["a" /* NewsPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_news_details_news_details__["a" /* NewsDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_messaggi_messaggi__["a" /* MessaggiPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_messaggi_details_messaggi_details__["a" /* MessaggiDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_messaggi_card_messaggi_card__["a" /* MessaggiCardPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_home_mess_home_mess__["a" /* HomeMessPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_messaggi_nuovo_messaggi_nuovo__["a" /* MessaggiNuovoPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_messaggi_importanti_messaggi_importanti__["a" /* MessaggiImportantiPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_messaggi_uscita_messaggi_uscita__["a" /* MessaggiUscitaPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_messaggi_cestino_messaggi_cestino__["a" /* MessaggiCestinoPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_circolari_circolari__["a" /* CircolariPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_circolari_card_circolari_card__["a" /* CircolariCardPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_circolari_details_circolari_details__["a" /* CircolariDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_documentale_documentale__["a" /* DocumentalePage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_documentale_categorie_documentale_categorie__["a" /* DocumentaleCategoriePage */],
                __WEBPACK_IMPORTED_MODULE_2__pages_documentale_details_documentale_details__["a" /* DocumentaleDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_documentale_lista_documentale_lista__["a" /* DocumentaleListaPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_48__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_49__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_72__services_store_store_service__["a" /* StoreService */],
                __WEBPACK_IMPORTED_MODULE_68__services_comunicazione_service__["a" /* ComunicazioneService */],
                __WEBPACK_IMPORTED_MODULE_69__services_shared_http_service__["a" /* HttpService */],
                __WEBPACK_IMPORTED_MODULE_70__services_login_login_service__["a" /* LoginService */],
                __WEBPACK_IMPORTED_MODULE_43__services_shared_error_service__["a" /* ErrorService */],
                __WEBPACK_IMPORTED_MODULE_73__services_contact_contact_service__["a" /* ContactService */],
                __WEBPACK_IMPORTED_MODULE_76__services_shared_check_service__["a" /* CheckService */],
                __WEBPACK_IMPORTED_MODULE_42__ionic_native_call_number__["a" /* CallNumber */],
                __WEBPACK_IMPORTED_MODULE_41__ionic_native_email_composer__["a" /* EmailComposer */],
                __WEBPACK_IMPORTED_MODULE_51__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_52__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_53__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_40__ionic_native_base64__["a" /* Base64 */],
                { provide: __WEBPACK_IMPORTED_MODULE_44__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_46_ionic_angular__["d" /* IonicErrorHandler */] },
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),
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
/* 320 */,
/* 321 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentaleListaModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_documentale_lista_documentale_lista__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DocumentaleListaModule = /** @class */ (function () {
    function DocumentaleListaModule() {
    }
    DocumentaleListaModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_0__pages_documentale_lista_documentale_lista__["a" /* DocumentaleListaPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_0__pages_documentale_lista_documentale_lista__["a" /* DocumentaleListaPage */]]
        })
    ], DocumentaleListaModule);
    return DocumentaleListaModule;
}());

//# sourceMappingURL=documentale-lista.module.js.map

/***/ }),
/* 322 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentaleDetailsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_documentale_details_documentale_details__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DocumentaleDetailsModule = /** @class */ (function () {
    function DocumentaleDetailsModule() {
    }
    DocumentaleDetailsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_0__pages_documentale_details_documentale_details__["a" /* DocumentaleDetailsPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_0__pages_documentale_details_documentale_details__["a" /* DocumentaleDetailsPage */]]
        })
    ], DocumentaleDetailsModule);
    return DocumentaleDetailsModule;
}());

//# sourceMappingURL=documentale-details.module.js.map

/***/ }),
/* 323 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentaleModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_documentale_documentale__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DocumentaleModule = /** @class */ (function () {
    function DocumentaleModule() {
    }
    DocumentaleModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_0__pages_documentale_documentale__["a" /* DocumentalePage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_0__pages_documentale_documentale__["a" /* DocumentalePage */]]
        })
    ], DocumentaleModule);
    return DocumentaleModule;
}());

//# sourceMappingURL=documentale.module.js.map

/***/ }),
/* 324 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CircolariDetailsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_circolari_details_circolari_details__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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
/* 325 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CircolariPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_circolari_circolari__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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
/* 326 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComunicazioniDetailsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_comunicazioni_details_comunicazioni_details__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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
/* 327 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComunicazioniPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_comunicazioni_comunicazioni__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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
/* 328 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiUscitaModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_messaggi_uscita_messaggi_uscita__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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
/* 329 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiCestinoModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_messaggi_cestino_messaggi_cestino__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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
/* 330 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiImportantiModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_messaggi_importanti_messaggi_importanti__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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
/* 331 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiNuovoModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_messaggi_nuovo_messaggi_nuovo__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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
/* 332 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsDetailsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_news_details_news_details__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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
/* 333 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_news_news__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_loading_loading__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_store_store_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(246);
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
/* 344 */
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
/* 345 */,
/* 346 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_login_login__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_login_login_service__ = __webpack_require__(40);
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
/* 347 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__circolari_card_circolari_card_module__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__messaggi_card_messaggi_card_module__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__news_card_news_card_module__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chat_card_contact_card_module__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__documentale_card_documentale_card_module__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__contact_card_contact_card_module__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_com_home_com_module__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__comunicazioni_card_comunicazioni_card_module__ = __webpack_require__(249);
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
        Object(__WEBPACK_IMPORTED_MODULE_7__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_9_ionic_angular__["e" /* IonicModule */], __WEBPACK_IMPORTED_MODULE_6__home_com_home_com_module__["a" /* HomeComModule */], __WEBPACK_IMPORTED_MODULE_5__contact_card_contact_card_module__["a" /* ContactCardModule */],
                __WEBPACK_IMPORTED_MODULE_4__documentale_card_documentale_card_module__["a" /* DocumentaleCardModule */], __WEBPACK_IMPORTED_MODULE_3__chat_card_contact_card_module__["a" /* ChatCardModule */], __WEBPACK_IMPORTED_MODULE_1__messaggi_card_messaggi_card_module__["a" /* MessaggiCardModule */],
                __WEBPACK_IMPORTED_MODULE_2__news_card_news_card_module__["a" /* NewsCardModule */], __WEBPACK_IMPORTED_MODULE_10__comunicazioni_card_comunicazioni_card_module__["a" /* ComunicazioniCardModule */], __WEBPACK_IMPORTED_MODULE_0__circolari_card_circolari_card_module__["a" /* CircolariCardModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */]]
        })
    ], HomeModule);
    return HomeModule;
}());

//# sourceMappingURL=home.module.js.map

/***/ }),
/* 348 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatCardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_chat_card_chat_card__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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
/* 349 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chat_chat__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
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
        console.log(this.modules);
        if (this.modules != undefined) {
            for (var i = 0; i < this.modules.length; i++) {
                if (this.modules[i].tab_moduli_cod == 4) {
                    this.color = this.modules[i].tab_moduli_colore;
                    console.log("A" + this.color);
                    this.icon = this.modules[i].tab_moduli_icona;
                    this.colonne = this.modules[i].tab_moduli_colonne;
                }
            }
        }
    };
    ChatCardPage.prototype.goToChat = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__chat_chat__["a" /* ChatPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], ChatCardPage.prototype, "modules", void 0);
    ChatCardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'chat-card',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\chat-card\chat-card.html"*/'<div class="card" (click)="goToChat()">\n\n    <div [ngStyle]="{\'background-color\' : color }" class="card-header bg-comm text-header text-white" >Chat</div>\n\n    <div class="card-body">\n\n        <ul class="list-group list-group-flush priority" >\n\n                <i [ngClass]="icon" [ngStyle]="{\'color\' : color }" style="font-size: 5em"></i>\n\n        </ul>\n\n    </div>\n\n</div>'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\chat-card\chat-card.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
    ], ChatCardPage);
    return ChatCardPage;
}());

//# sourceMappingURL=chat-card.js.map

/***/ }),
/* 350 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentaleCardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_documentale_card_documentale_card__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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
/* 351 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentaleCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__documentale_documentale__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
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



var DocumentaleCardPage = /** @class */ (function () {
    function DocumentaleCardPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    DocumentaleCardPage.prototype.ngOnInit = function () {
        if (this.modules != undefined) {
            for (var i = 0; i < this.modules.length; i++) {
                if (this.modules[i].tab_moduli_cod == 7) {
                    this.color = this.modules[i].tab_moduli_colore;
                    this.icon = this.modules[i].tab_moduli_icona;
                    this.colonne = this.modules[i].tab_moduli_colonne;
                }
            }
        }
    };
    DocumentaleCardPage.prototype.goToDocumentale = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__documentale_documentale__["a" /* DocumentalePage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], DocumentaleCardPage.prototype, "modules", void 0);
    DocumentaleCardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'documentale-card',template:/*ion-inline-start:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\documentale-card\documentale-card.html"*/'<div class="card" (click)="goToDocumentale()">\n\n    <div [ngStyle]="{\'background-color\' : color }" class="card-header bg-comm text-header text-white" >Documentale</div>\n\n    <div class="card-body">\n\n        <ul class="list-group list-group-flush priority" >\n\n                <i [ngClass]="icon" [ngStyle]="{\'color\' : color }" style="font-size: 5em"></i>\n\n        </ul>\n\n    </div>\n\n</div>'/*ion-inline-end:"C:\Users\osiris\Documents\GitHub\AllinApp\AllInApp_App\src\app\pages\documentale-card\documentale-card.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
    ], DocumentaleCardPage);
    return DocumentaleCardPage;
}());

//# sourceMappingURL=documentale-card.js.map

/***/ }),
/* 352 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_loading_loading__ = __webpack_require__(132);
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
/* 353 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_chat_chat__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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
/* 354 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyChatModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_mychat_mychat__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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
/* 355 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfiloModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_profilo_profilo__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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
/* 356 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComunicazioneService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_shared_http_service__ = __webpack_require__(8);
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
/* 357 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_contacts_contacts__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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
/* 358 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactDetailsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_contact_details_contact_details__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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
/* 359 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_messaggi_messaggi__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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
/* 360 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessaggiDetailsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_messaggi_details_messaggi_details__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
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

/***/ }),
/* 361 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentaleCategorieModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_documentale_categorie_documentale_categorie__ = __webpack_require__(124);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DocumentaleCategorieModule = /** @class */ (function () {
    function DocumentaleCategorieModule() {
    }
    DocumentaleCategorieModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_2__pages_documentale_categorie_documentale_categorie__["a" /* DocumentaleCategoriePage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__pages_documentale_categorie_documentale_categorie__["a" /* DocumentaleCategoriePage */]]
        })
    ], DocumentaleCategorieModule);
    return DocumentaleCategorieModule;
}());

//# sourceMappingURL=documentale-categorie.module.js.map

/***/ })
],[251]);
//# sourceMappingURL=main.js.map