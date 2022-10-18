import {SexeVo} from './Sexe.model';
import {PaysVo} from './Pays.model';



export class EtudiantVo {

    public id: number;

    public nom: string;
    public prenom: string;
     public anneeNaissance: number;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
    public username: string;
                public anneeNaissanceMax: string ;
                public anneeNaissanceMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public sexeVo: SexeVo ;
      public paysVo: PaysVo ;

}
