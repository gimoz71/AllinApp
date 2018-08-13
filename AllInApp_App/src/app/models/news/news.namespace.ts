

export namespace News {

    export class MessaggioErrore {
        public msg_tipo: string;
        public msg_code: number;
        public msg_testo: string;
        public msg_method: string;
        public msg_techdata: string;
    }

    export class NewsElem {
        news_key : number;
        nw_data : Date;
        nw_titolo : string;
        nw_descrizione: string;
        nw_immagine : string;
        nw_link : string;
        tab_tipo_news_desc : string;
        dn_dipendenti_key : number;
        dn_letta : string;
    }

    export class NewsList{
        public ErrorMessage : MessaggioErrore;
        public result : string;
        l_lista_news : NewsElem[];
        public token : string;
    }


    export class NewsResult
    {
        public errorMessage : MessaggioErrore;
        public result : string;
        public result_key : number;
        }

}