import {CampagneRelanceChercheurVo} from './CampagneRelanceChercheur.model';
import {TemplateRelanceVo} from './TemplateRelance.model';
import {CampagneVo} from './Campagne.model';



export class CampagneRelanceVo {

    public id: number;

    public dateRelance: Date;
    public objetRelance: string;
    public messageRelance: string;
                public dateRelanceMax: string ;
                public dateRelanceMin: string ;
      public campagneVo: CampagneVo ;
      public templateRelanceVo: TemplateRelanceVo ;
      public campagneRelanceChercheursVo: Array<CampagneRelanceChercheurVo>;

}
