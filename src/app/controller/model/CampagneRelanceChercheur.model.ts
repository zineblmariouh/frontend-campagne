import {CampagneRelanceVo} from './CampagneRelance.model';
import {ChercheurVo} from './Chercheur.model';



export class CampagneRelanceChercheurVo {

    public id: number;

    public objet: string;
    public message: string;
    public envoye: null | boolean;
    public dateEnvoi: Date;
                public dateEnvoiMax: string ;
                public dateEnvoiMin: string ;
      public chercheurVo: ChercheurVo ;
      public campagneRelanceVo: CampagneRelanceVo ;

}
