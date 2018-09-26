
export namespace Login {

    export class MessaggioErrore {
        public msg_tipo: string;
        public msg_code: number;
        public msg_testo: string;
        public msg_method: string;
        public msg_techdata: string;
    }

    export class Token {
        public token_value: string;
        public token_permesso_key: number;
        public token_user: string;
        public token_password: string;
        public token_dipendente_key : number;
        public result: string;
        public flag_richiesta_lettura : boolean;
        public ErrorMessage: MessaggioErrore;
    }

    export class Result{
        public ErrorMessage : MessaggioErrore;
        public result : string;
        result_key : number;
    }
}