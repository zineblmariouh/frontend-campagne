import {TypeInstrumentIrdVo} from './TypeInstrumentIrd.model';



export class InstrumentIrdVo {

    public id: number;

    public code: string;
    public libelle: string;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
    public username: string;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public typeInstrumentIrdVo: TypeInstrumentIrdVo ;

}
