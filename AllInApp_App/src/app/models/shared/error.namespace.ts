export namespace Error {
    export class Result {
            public errorMessage : {
                msg_tipo : string;
                msg_code : number;
                msg_testo : string;
                msg_method : string;
                msg_techdata : string;
            };
            public result : string;
            public result_key: number;
    }

    export class LogErrore{
            public token : string;
            public log_stacktrace: string;
            public log_descrerr : string;
            public log_metodoerr : string;
            public log_link : string;
            public log_query : string;
            public username : string;
    }

    export class ErrorMessage{
            public msg_tipo : string; //Tipologia dell’errore, al momento solo “E”
            public msg_code : number; //Codifica interna dell’errore
            public msg_testo : string; //Descrizione dell’errore
            public msg_method : string; //Metodo che ha generato l’errore
            public msg_techdata : string; //Eventuali dati aggiuntivi (sessione ecc.)
    }
}