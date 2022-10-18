import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {DisciplineScientifiqueConseilEtComiteScientifiqueVo} from './DisciplineScientifiqueConseilEtComiteScientifique.model';
import {CommunauteSavoirConseilEtComiteScientifiqueVo} from './CommunauteSavoirConseilEtComiteScientifique.model';
import {EtablissementVo} from './Etablissement.model';
import {CampagneVo} from './Campagne.model';
import {PaysVo} from './Pays.model';
import {ChercheurVo} from './Chercheur.model';



export class ConseilEtComiteScientifiqueVo {

    public id: number;

     public tempsEstimePourCetteAnnne: number;
    public intitule: string;
     public nombreJoursParAnnee: number;
                public tempsEstimePourCetteAnnneMax: string ;
                public tempsEstimePourCetteAnnneMin: string ;
                public nombreJoursParAnneeMax: string ;
                public nombreJoursParAnneeMin: string ;
      public paysVo: PaysVo ;
      public etablissementVo: EtablissementVo ;
      public chercheurVo: ChercheurVo ;
      public campagneVo: CampagneVo ;
      public etatEtapeCampagneVo: EtatEtapeCampagneVo ;
      public communauteSavoirConseilEtComiteScientifiquesVo: Array<CommunauteSavoirConseilEtComiteScientifiqueVo>;
      public disciplineScientifiqueConseilEtComiteScientifiquesVo: Array<DisciplineScientifiqueConseilEtComiteScientifiqueVo>;

}
