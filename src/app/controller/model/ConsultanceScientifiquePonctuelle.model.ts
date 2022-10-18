import {TypeInstrumentIrdConsultanceScientifiquePonctuelleVo} from './TypeInstrumentIrdConsultanceScientifiquePonctuelle.model';
import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {EtablissementConsultanceScientifiquePonctuelleVo} from './EtablissementConsultanceScientifiquePonctuelle.model';
import {InstrumentIrdConsultanceScientifiquePonctuelleVo} from './InstrumentIrdConsultanceScientifiquePonctuelle.model';
import {PaysCommanditaireVo} from './PaysCommanditaire.model';
import {DisciplineScientifiqueConsultanceScientifiquePonctuelleVo} from './DisciplineScientifiqueConsultanceScientifiquePonctuelle.model';
import {TypeExpertiseVo} from './TypeExpertise.model';
import {NatureExpertiseVo} from './NatureExpertise.model';
import {EnjeuxIrdConsultanceScientifiquePonctuelleVo} from './EnjeuxIrdConsultanceScientifiquePonctuelle.model';
import {ZoneGeographiqueConsultanceScientifiquePonctuelleVo} from './ZoneGeographiqueConsultanceScientifiquePonctuelle.model';
import {ExpertiseVo} from './Expertise.model';



export class ConsultanceScientifiquePonctuelleVo {

    public id: number;

    public sujetExpertise: string;
     public nombreJourDedie: number;
    public dateFin: Date;
    public relieeInstrumentsIrd: null | boolean;
    public commentaire: string;
                public nombreJourDedieMax: string ;
                public nombreJourDedieMin: string ;
                public dateFinMax: string ;
                public dateFinMin: string ;
      public typeExpertiseVo: TypeExpertiseVo ;
      public natureExpertiseVo: NatureExpertiseVo ;
      public expertiseVo: ExpertiseVo ;
      public etatEtapeCampagneVo: EtatEtapeCampagneVo ;
      public zoneGeographiqueConsultanceScientifiquePonctuellesVo: Array<ZoneGeographiqueConsultanceScientifiquePonctuelleVo>;
      public paysCommanditairesVo: Array<PaysCommanditaireVo>;
      public etablissementConsultanceScientifiquePonctuellesVo: Array<EtablissementConsultanceScientifiquePonctuelleVo>;
      public disciplineScientifiqueConsultanceScientifiquePonctuellesVo: Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo>;
      public enjeuxIrdConsultanceScientifiquePonctuellesVo: Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo>;
      public instrumentIrdConsultanceScientifiquePonctuellesVo: Array<InstrumentIrdConsultanceScientifiquePonctuelleVo>;
      public typeInstrumentIrdConsultanceScientifiquePonctuellesVo: Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo>;

}
