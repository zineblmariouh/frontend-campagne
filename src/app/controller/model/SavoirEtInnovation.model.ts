import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {ContratEtConventionIrdVo} from './ContratEtConventionIrd.model';
import {EvenementColloqueScienntifiqueVo} from './EvenementColloqueScienntifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from './DeveloppementDeSavoirEtInnovationScientifique.model';
import {CampagneVo} from './Campagne.model';
import {ChercheurVo} from './Chercheur.model';



export class SavoirEtInnovationVo {

    public id: number;

     public annee: number;
     public tempsEstimePourCetteAnnne: number;
                public anneeMax: string ;
                public anneeMin: string ;
                public tempsEstimePourCetteAnnneMax: string ;
                public tempsEstimePourCetteAnnneMin: string ;
      public campagneVo: CampagneVo ;
      public chercheurVo: ChercheurVo ;
      public etatEtapeCampagneVo: EtatEtapeCampagneVo ;
      public contratEtConventionIrdsVo: Array<ContratEtConventionIrdVo>;
      public evenementColloqueScienntifiquesVo: Array<EvenementColloqueScienntifiqueVo>;
      public developpementDeSavoirEtInnovationScientifiquesVo: Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>;

}
