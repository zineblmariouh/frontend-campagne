import {CampagneRappelChercheurVo} from './CampagneRappelChercheur.model';
import {TemplateRappelVo} from './TemplateRappel.model';
import {CampagneVo} from './Campagne.model';



export class CampagneRappelVo {

    public id: number;

    public dateRappel: Date;
    public objetRappel: string;
    public messageRappel: string;
                public dateRappelMax: string ;
                public dateRappelMin: string ;
      public campagneVo: CampagneVo ;
      public templateRappelVo: TemplateRappelVo ;
      public campagneRappelChercheursVo: Array<CampagneRappelChercheurVo>;

}
