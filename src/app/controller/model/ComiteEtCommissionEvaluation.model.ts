import {DisciplineScientifiqueComiteEtCommissionEvaluationVo} from './DisciplineScientifiqueComiteEtCommissionEvaluation.model';
import {InstrumentIrdComiteEtCommissionEvaluationVo} from './InstrumentIrdComiteEtCommissionEvaluation.model';
import {TypeExpertiseEvaluationComiteEtCommissionEvaluationVo} from './TypeExpertiseEvaluationComiteEtCommissionEvaluation.model';
import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {NatureExpertiseVo} from './NatureExpertise.model';
import {RoleComiteEtCommissionEvaluationVo} from './RoleComiteEtCommissionEvaluation.model';
import {ExpertiseVo} from './Expertise.model';
import {EtablissementComiteEtCommissionEvaluationVo} from './EtablissementComiteEtCommissionEvaluation.model';
import {EnjeuxIrdComiteEtCommissionEvaluationVo} from './EnjeuxIrdComiteEtCommissionEvaluation.model';



export class ComiteEtCommissionEvaluationVo {

    public id: number;

    public nom: string;
    public nomRevueOuEditeur: string;
    public role: string;
     public nombreJourDedie: number;
    public relieeInstrumentsIrd: null | boolean;
    public commentaire: string;
                public nombreJourDedieMax: string ;
                public nombreJourDedieMin: string ;
      public natureExpertiseVo: NatureExpertiseVo ;
      public expertiseVo: ExpertiseVo ;
      public etatEtapeCampagneVo: EtatEtapeCampagneVo ;
      public typeExpertiseEvaluationComiteEtCommissionEvaluationsVo: Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo>;
      public etablissementComiteEtCommissionEvaluationsVo: Array<EtablissementComiteEtCommissionEvaluationVo>;
      public roleComiteEtCommissionEvaluationsVo: Array<RoleComiteEtCommissionEvaluationVo>;
      public disciplineScientifiqueComiteEtCommissionEvaluationsVo: Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo>;
      public enjeuxIrdComiteEtCommissionEvaluationsVo: Array<EnjeuxIrdComiteEtCommissionEvaluationVo>;
      public instrumentIrdComiteEtCommissionEvaluationsVo: Array<InstrumentIrdComiteEtCommissionEvaluationVo>;

}
