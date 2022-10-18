import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {ConsultanceScientifiquePonctuelleVo} from './ConsultanceScientifiquePonctuelle.model';
import {ComiteEtCommissionEvaluationVo} from './ComiteEtCommissionEvaluation.model';
import {ConseilsScientifiqueVo} from './ConseilsScientifique.model';
import {CampagneVo} from './Campagne.model';
import {ChercheurVo} from './Chercheur.model';



export class ExpertiseVo {

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
      public conseilsScientifiquesVo: Array<ConseilsScientifiqueVo>;
      public consultanceScientifiquePonctuellesVo: Array<ConsultanceScientifiquePonctuelleVo>;
      public comiteEtCommissionEvaluationsVo: Array<ComiteEtCommissionEvaluationVo>;

}
