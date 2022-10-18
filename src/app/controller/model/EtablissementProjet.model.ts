import {VilleVo} from './Ville.model';
import {PaysVo} from './Pays.model';



export class EtablissementProjetVo {

    public id: number;

    public libelle: string;
    public code: string;
    public description: string;
    public sigleOfficiel: string;
    public nomEnFrancais: string;
    public sigleEnFrancais: string;
    public anciensNom: string;
    public champIntervention: string;
    public valide: null | boolean;
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
      public villeVo: VilleVo ;
      public paysVo: PaysVo ;

}
