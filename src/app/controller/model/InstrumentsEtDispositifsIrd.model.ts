import {CampagneVo} from './Campagne.model';
import {ChercheurVo} from './Chercheur.model';



export class InstrumentsEtDispositifsIrdVo {

    public id: number;

    public libelle: string;
    public code: string;
    public description: string;
    public numerique: null | boolean;
      public campagneVo: CampagneVo ;
      public chercheurVo: ChercheurVo ;

}
