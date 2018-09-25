export namespace Module {

    export class ModuleErrore {
        public msg_tipo: string;
        public msg_code: number;
        public msg_testo: string;
        public msg_method: string;
        public msg_techdata: string;
    }
     
    export class ModuleElem {
        public tab_moduli_cod : number;
        public tab_moduli_desc : string;
        public tab_moduli_attivo : string;
        public tab_moduli_colore : string;
        public tab_moduli_icona : string;
        public tab_moduli_colonne : number;
    }

    export class ModuleResult{
        public ErrorMessage : ModuleErrore;
        public l_moduli : ModuleElem[];
        public token : string;
        public result : string;
    }

    
}