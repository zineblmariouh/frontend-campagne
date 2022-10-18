import {ModaliteVo} from './Modalite.model';
import {SavoirEtInnovationVo} from './SavoirEtInnovation.model';
import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {EvenementColloqueScienntifiqueEnjeuxIrdVo} from './EvenementColloqueScienntifiqueEnjeuxIrd.model';
import {ModaliteInterventionVo} from './ModaliteIntervention.model';
import {DisciplineScientifiqueEvenementColloqueScientifiqueVo} from './DisciplineScientifiqueEvenementColloqueScientifique.model';
import {EvenementColloqueScienntifiquePaysVo} from './EvenementColloqueScienntifiquePays.model';
import {CommunauteSavoirEvenementColloqueScientifiqueVo} from './CommunauteSavoirEvenementColloqueScientifique.model';



export class EvenementColloqueScienntifiqueVo {

    public id: number;

    public intitule: string;
    public typeDeParticipation: string;
    public dateEvenement: Date;
    public diplomatieStategique: null | boolean;
     public volumeParticipant: number;
                public dateEvenementMax: string ;
                public dateEvenementMin: string ;
                public volumeParticipantMax: string ;
                public volumeParticipantMin: string ;
      public modaliteVo: ModaliteVo ;
      public modaliteInterventionVo: ModaliteInterventionVo ;
      public savoirEtInnovationVo: SavoirEtInnovationVo ;
      public etatEtapeCampagneVo: EtatEtapeCampagneVo ;
      public evenementColloqueScienntifiqueEnjeuxIrdsVo: Array<EvenementColloqueScienntifiqueEnjeuxIrdVo>;
      public communauteSavoirEvenementColloqueScientifiquesVo: Array<CommunauteSavoirEvenementColloqueScientifiqueVo>;
      public disciplineScientifiqueEvenementColloqueScientifiquesVo: Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo>;
      public evenementColloqueScienntifiquePayssVo: Array<EvenementColloqueScienntifiquePaysVo>;

}
