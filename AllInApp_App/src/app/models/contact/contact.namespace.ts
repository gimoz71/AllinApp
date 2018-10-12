export namespace Contact {
    export class ContactDataFull {
        public ErrorMessage : {
            msg_code: number;
            msg_method: string;
            msg_techdata: string;
            msg_testo: string;
            msg_tipo: string;
        };
        public dipendente : Dipendente;
        public ws_result : string;
        public ws_token: string;
    }

    export class ContactSede{
        cap: string;
        comune : string;
        dipendenti_key : number;
        email : string;
        indirizzo : string;
        localita : string;
        nome : string;
        provincia : string;
        sedi_key : number;
        telefono : string;
        tipo_sede: string;
    }

    export class Dipendente{
        attivo : string;
        cellulare: string;
        cogn_resp_divisione: string;
        cogn_resp_reparto: string;
        cogn_resp_ufficio: string;
        cognome: string;
        dipendenti_key: number;
        divisione: string;
        email: string;
        email_resp_divisione: string;
        email_resp_reparto: string;
        email_resp_ufficio: string;
        foto: string;
        matricola: string;
        nome: string;
        nome_resp_divisione: string;
        nome_resp_reparto: string;
        nome_resp_ufficio: string;
        reparto: string;
        ruolo_aziendale: string;
        telefono: string;
        ufficio: string;
        l_sedi : ContactSede[];
        url_avatar : string;
    }

    export class ContactDataMin{
        public attivo : string;
        public cellulare : string;
        public cognome : string;
        public dipendenti_key : number;
        public divisione : string;
        public email : string;
        public foto : string;
        public matricola : string;
        public nome : string;
        public reparto : string;
        public ruolo_aziendale : string;
        public telefono : string;
        public ufficio : string;
        public url_avatar : string;
        public nomeCognome : string;
    }

    export class ContactList {
        public ErrorMessage: {
            msg_tipo : string;
            msg_code : number;
            msg_testo : string;
            msg_method : string;
            msg_techdata : string;
        };
        public l_dipendenti : ContactDataMin[];
        public token : string;
        public result : string;
        }
}