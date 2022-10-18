import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {ProjetActiviteRechercheDetailVo} from './ProjetActiviteRechercheDetail.model';
import {CampagneVo} from './Campagne.model';
import {ChercheurVo} from './Chercheur.model';



export class ProjetActiviteRechercheVo {

    public id: number;

     public tempsEstimePourCetteAnnne: number;
     public annee: number;
                public tempsEstimePourCetteAnnneMax: string ;
                public tempsEstimePourCetteAnnneMin: string ;
                public anneeMax: string ;
                public anneeMin: string ;
      public etatEtapeCampagneVo: EtatEtapeCampagneVo ;
      public chercheurVo: ChercheurVo ;
      public campagneVo: CampagneVo ;
      public projetActiviteRechercheDetailsVo: Array<ProjetActiviteRechercheDetailVo>;

}
