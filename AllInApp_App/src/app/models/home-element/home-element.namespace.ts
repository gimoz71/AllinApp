export namespace HomeElement {
    export class ComunicazioniElement {
        public ErrorMessage : {
            msg_code: number;
            msg_method: string;
            msg_techdata: string;
            msg_testo: string;
            msg_tipo: string;
        };
        public titolo : string;
        public testo : string;
        public data : string;
        public mese: string;
        public giorno: string;
        public anno : string;
    }

    export class PrioritaElement{
        public ErrorMessage : {
            msg_code: number;
            msg_method: string;
            msg_techdata: string;
            msg_testo: string;
            msg_tipo: string;
        };
        public titolo : string;
        public testo : string;
    }
    
}