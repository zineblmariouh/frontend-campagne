import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {VieInstitutionnelleDetailVo} from './VieInstitutionnelleDetail.model';
import {CampagneVo} from './Campagne.model';
import {ChercheurVo} from './Chercheur.model';



export class VieInstitutionnelleVo {

    public id: number;

     public tempsEstime: number;
     public annee: number;
                public tempsEstimeMax: string ;
                public tempsEstimeMin: string ;
                public anneeMax: string ;
                public anneeMin: string ;
      public campagneVo: CampagneVo ;
      public chercheurVo: ChercheurVo ;
      public etatEtapeCampagneVo: EtatEtapeCampagneVo ;
      public vieInstitutionnelleDetailsVo: Array<VieInstitutionnelleDetailVo>;

}
