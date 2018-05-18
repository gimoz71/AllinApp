export namespace Http {
    export class HttpResponse {
        public Success: boolean;        // Esito della chiamata
        public Data: any;               // Eventuali dati restituiti dal server: possono essere oggetti, array, ecc...
        public Message: string;         // Eventuale messaggio. In caso di Success=false, l'error message viene inserito qui
    }
}