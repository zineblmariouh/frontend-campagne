import {EtatCampagneChercheurVo} from './EtatCampagneChercheur.model';
import {CampagneVo} from './Campagne.model';
import {ChercheurVo} from './Chercheur.model';



export class CampagneChercheurOuvertureVo {

    public id: number;

    public objet: string;
    public message: string;
    public envoye: null | boolean;
    public dateEnvoi: Date;
     public avancement: number;
                public dateEnvoiMax: string ;
                public dateEnvoiMin: string ;
                public avancementMax: string ;
                public avancementMin: string ;
      public chercheurVo: ChercheurVo ;
      public campagneVo: CampagneVo ;
      public etatCampagneChercheurVo: EtatCampagneChercheurVo ;

}
