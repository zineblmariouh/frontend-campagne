import {EnseignementEtFormationVo} from './EnseignementEtFormation.model';
import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {FormationContinueDisciplineScientifiqueVo} from './FormationContinueDisciplineScientifique.model';
import {ModaliteFormationContinueVo} from './ModaliteFormationContinue.model';
import {FormationContinueObjetFormationGeneriqueVo} from './FormationContinueObjetFormationGenerique.model';
import {FormationContinueEnjeuxIrdVo} from './FormationContinueEnjeuxIrd.model';
import {ZoneGeographiqueFormationContinueVo} from './ZoneGeographiqueFormationContinue.model';
import {FormationContinueCommanditaireVo} from './FormationContinueCommanditaire.model';
import {FormationContinuePubliqueProfessionelVo} from './FormationContinuePubliqueProfessionel.model';
import {PaysFormationContinueVo} from './PaysFormationContinue.model';



export class FormationContinueVo {

    public id: number;

    public intitule: string;
     public nombreHeuresDispenseesDansAnnee: number;
                public nombreHeuresDispenseesDansAnneeMax: string ;
                public nombreHeuresDispenseesDansAnneeMin: string ;
      public modaliteFormationContinueVo: ModaliteFormationContinueVo ;
      public enseignementEtFormationVo: EnseignementEtFormationVo ;
      public etatEtapeCampagneVo: EtatEtapeCampagneVo ;
      public formationContinuePubliqueProfessionelsVo: Array<FormationContinuePubliqueProfessionelVo>;
      public formationContinueObjetFormationGeneriquesVo: Array<FormationContinueObjetFormationGeneriqueVo>;
      public formationContinueEnjeuxIrdsVo: Array<FormationContinueEnjeuxIrdVo>;
      public formationContinueDisciplineScientifiquesVo: Array<FormationContinueDisciplineScientifiqueVo>;
      public paysFormationContinueVo: Array<PaysFormationContinueVo>;
      public zoneGeographiqueFormationContinuesVo: Array<ZoneGeographiqueFormationContinueVo>;
      public formationContinueCommanditairesVo: Array<FormationContinueCommanditaireVo>;

}
