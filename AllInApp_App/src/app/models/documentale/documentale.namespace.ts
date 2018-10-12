export namespace Documentale {

    export class tipiElenco{
        ErrorMessage : {
            msg_tipo : string,
            msg_code : number,
            msg_testo : string,
            msg_method : string,
            msg_techdata : string
        };
        l_lista_tipo_documenti : Tipi[];
        token : string;
        result : string;
    }

    export class Tipi{
            categorie : string;
            tab_tipo_documento_cod : number;
            tab_tipo_documento_desc : string;
            num_documenti : number;
        }

    export class ListaCategorie{
        ErrorMessage : {
            msg_tipo : string,
            msg_code : number,
            msg_testo : string,
            msg_method : string,
            msg_techdata : string
        };
        l_lista_categoria_documenti : Categoria[];
        token : string;
        result : string;
    }

    export class Categoria{
        tab_tipo_documento_cod : number;
        tab_categoria_documento_cod : number;
        tab_categoria_documento_desc : string;
        num_documenti : number;
        }

    export class Documento{
        documenti_key : number;
        doc_data : string;
        doc_protocollo : string;
        doc_titolo : string;
        doc_pubblicato : string;
        doc_file : string;
        doc_url : string;
        doc_versione : number;
        doc_maggiore : number;
        doc_minore : number;
        tab_tipo_documento_cod : number;
        tab_categoria_documento_cod : number;
        tab_tipo_documento_desc : string;
        tab_categoria_documento_desc : string;
    }

    export class DocumentoResult{
        ErrorMessage : {
            msg_tipo : string;
            msg_code : number;
            msg_testo : string;
            msg_method : string;
            msg_techdata : string;
        };
        documento: Documento;
        token : string;
        result : string;
    }

    export class ListaDocumenti{
        ErrorMessage : {
            msg_tipo : string;
            msg_code : number;
            msg_testo : string;
            msg_method : string;
            msg_techdata : string;
        };
        l_lista_documenti : Documento[]; 
    }
}