import {CampagneRappelVo} from './CampagneRappel.model';
import {ChercheurVo} from './Chercheur.model';



export class CampagneRappelChercheurVo {

    public id: number;

    public objet: string;
    public message: string;
    public envoye: null | boolean;
    public dateEnvoi: Date;
                public dateEnvoiMax: string ;
                public dateEnvoiMin: string ;
      public chercheurVo: ChercheurVo ;
      public campagneRappelVo: CampagneRappelVo ;

}
