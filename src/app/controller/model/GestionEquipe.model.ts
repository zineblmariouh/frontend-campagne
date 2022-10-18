import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {GestionEquipeDetailVo} from './GestionEquipeDetail.model';
import {CampagneVo} from './Campagne.model';
import {ChercheurVo} from './Chercheur.model';



export class GestionEquipeVo {

    public id: number;

     public tempsEstimePourCetteAnnne: number;
                public tempsEstimePourCetteAnnneMax: string ;
                public tempsEstimePourCetteAnnneMin: string ;
      public chercheurVo: ChercheurVo ;
      public campagneVo: CampagneVo ;
      public etatEtapeCampagneVo: EtatEtapeCampagneVo ;
      public gestionEquipeDetailsVo: Array<GestionEquipeDetailVo>;

}
