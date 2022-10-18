import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {EnjeuxIrdConseilsScientifiqueVo} from './EnjeuxIrdConseilsScientifique.model';
import {NatureExpertiseVo} from './NatureExpertise.model';
import {TypeExpertiseVo} from './TypeExpertise.model';
import {EtablissementConseilsScientifiqueVo} from './EtablissementConseilsScientifique.model';
import {DisciplineScientifiqueConseilsScientifiqueVo} from './DisciplineScientifiqueConseilsScientifique.model';
import {ZoneGeographiqueConseilsScientifiqueVo} from './ZoneGeographiqueConseilsScientifique.model';
import {ExpertiseVo} from './Expertise.model';



export class ConseilsScientifiqueVo {

    public id: number;

    public intitule: string;
     public nombreJoursConsacres: number;
                public nombreJoursConsacresMax: string ;
                public nombreJoursConsacresMin: string ;
      public natureExpertiseVo: NatureExpertiseVo ;
      public typeExpertiseVo: TypeExpertiseVo ;
      public expertiseVo: ExpertiseVo ;
      public etatEtapeCampagneVo: EtatEtapeCampagneVo ;
      public etablissementConseilsScientifiquesVo: Array<EtablissementConseilsScientifiqueVo>;
      public zoneGeographiqueConseilsScientifiquesVo: Array<ZoneGeographiqueConseilsScientifiqueVo>;
      public enjeuxIrdConseilsScientifiquesVo: Array<EnjeuxIrdConseilsScientifiqueVo>;
      public disciplineScientifiqueConseilsScientifiquesVo: Array<DisciplineScientifiqueConseilsScientifiqueVo>;

}
