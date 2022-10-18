import {CategorieFaqVo} from './CategorieFaq.model';



export class FaqVo {

    public id: number;

    public question: string;
    public reponse: string;
    public contact: string;
     public ordre: number;
    public archive: null | boolean;
    public lien: string;
    public dernierMisAJour: Date;
                public ordreMax: string ;
                public ordreMin: string ;
                public dernierMisAJourMax: string ;
                public dernierMisAJourMin: string ;
      public categorieFaqVo: CategorieFaqVo ;

}
