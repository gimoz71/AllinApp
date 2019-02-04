

export namespace Bacheca {

    export class MessaggioErrore {
        public msg_tipo: string;
        public msg_code: number;
        public msg_testo: string;
        public msg_method: string;
        public msg_techdata: string;
    }

    export class BachecaElem {
        public annuncio_key	: number;
        public an_data : string;
        public an_titolo : string;
        public an_descrizione : string;	
        public an_immagine	: string;
        public an_localita	: string;
        public an_richiesta	: number;
        public an_telefono	: string;
        public an_email	: string;
        public dipendenti_key : number;
        public dp_cognome : string;
        public dp_nome : string;
        public tab_categoria_annuncio_cod : number;
        public tab_categoria_annuncio_desc : string;
        public da_dipendenti_key : number;
        public da_preferito	: string;
    }

    export class BachecaList{
        public ErrorMessage : MessaggioErrore;
        public result : string;
        l_lista_annunci  : BachecaElem[];
        public token : string;
    }


    export class BachecaResult
    {
        public ErrorMessage : MessaggioErrore;
        public result : string;
        public result_key : number;
    }

    export class BachecaSingleResult
    {
        ErrorMessage: {
            msg_tipo: string,
            msg_code: 0,
            msg_testo : string,
            msg_method : string,
            msg_techdata : string
        };
        annunci : BachecaElem;
        token : string;
        result : string;
    }

    export class BachecaCategoriaElem{
        tab_categoria_annuncio_cod	: number;
        tab_categoria_annuncio_desc : string;
        tab_categoria_annuncio_attivo : string;
        inserito_da	: string;
        inserito_il	: string;
        modificato_da : string;
        modificato_il : string;
        cancellato_da : string;
        cancellato_il : string;
    }

    export class BachecaCategoriaResult {       	
        ErrorMessage: {
            msg_tipo: string,
            msg_code: 0,
            msg_testo : string,
            msg_method : string,
            msg_techdata : string
        };
        l_tab_categorie_annuncio : BachecaCategoriaElem[];
        
        token : string;
        result : string;
    }

    export class BachecaRichiestaPut {
            annunci : Bacheca.BachecaPutElem;
            token : string;
          }

    export class BachecaPutElem{
        url_an_immagine : string;
        annuncio_key : number;
        an_dipendenti_key : number;
        an_categoria_annuncio_cod : number;
        an_data : string;
        an_titolo : string;
        an_descrizione : string;
        an_attiva : string;
        an_immagine: string;
        an_localita: string;
        an_telefono: string;
        an_email: string;
        an_richiesta: number;
        inserito_da: string;
        inserito_il: string;
        modificato_da: string;
        modificato_il: string;
        cancellato_da: string;
        cancellato_il: string
    }
}

