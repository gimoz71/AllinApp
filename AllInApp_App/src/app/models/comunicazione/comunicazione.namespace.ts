export namespace Comunicazione {

    export class ComunicazioneElencoElem{
        comunicazione_key : number;
        cm_data : string;
        cm_titolo : string;
        cm_descrizione : string;
        cm_immagine :string;
        cm_allegato: string;
        tab_tipo_comunicazione_desc : string;
        tab_tipo_comunicazione_ricevuta : string;
        dc_dipendenti_key : number;
        dc_letta : string;
    }

    export class ComunicazioniElenco{
        ErrorMessage: {
            msg_tipo: string;
            msg_code : number;
            msg_testo : string;
            msg_method : string;
            msg_techdata : string;
        };
        l_lista_comunicazione : ComunicazioneElencoElem[];
        totale_comunicazione : number;
        token : string;
        result : string;
        }
    
    export class ComunicazioneResult {
        ErrorMessage: {
            msg_tipo: string,
            msg_code: number,
            msg_testo: string,
            msg_method: string,
            msg_techdata : string,
        };
        result : string;
        comunicazione : Comunicazione.Comunicazione;
        token : string;
    }

    export class Comunicazione {
        url_cm_immagine : string;
        url_cm_allegato : string;
        comunicazione_key : number;
        cm_tipo_comunicazione_cod : number;
        cm_data_pubbblicazione : string;
        cm_data : string;
        cm_titolo: string;
        cm_descrizione: string;
        cm_attiva: string;
        cm_immagine: string;
        cm_allegato: string;
        inserito_da : string;
        inserito_il : string;
        modificato_da : string;
        modificato_il : string;
        cancellato_da : string;
        cancellato_il : string;
    }

    export class Result {
        ErrorMessage: {
            msg_tipo : string,
            msg_code : number,
            msg_testo : string,
            msg_method : string,
            msg_techdata : string
        };
        result : string;
        result_key : number;
    }
}