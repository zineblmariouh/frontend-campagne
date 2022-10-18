import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {DisciplineScientifiqueExpertiseScientifiqueVo} from './DisciplineScientifiqueExpertiseScientifique.model';
import {TypeExpertiseVo} from './TypeExpertise.model';
import {CommunauteSavoirExpertiseScientifiqueVo} from './CommunauteSavoirExpertiseScientifique.model';
import {EtablissementVo} from './Etablissement.model';
import {CampagneVo} from './Campagne.model';
import {PaysVo} from './Pays.model';
import {ChercheurVo} from './Chercheur.model';



export class ExpertiseScientifiqueVo {

    public id: number;

     public annee: number;
    public intitule: string;
     public nombreJourConsacrePourCetteAnnee: number;
     public periodeRemiseRapportMois: number;
     public periodeRemiseRapportAnnee: number;
    public commentairesEventuels: string;
                public anneeMax: string ;
                public anneeMin: string ;
                public nombreJourConsacrePourCetteAnneeMax: string ;
                public nombreJourConsacrePourCetteAnneeMin: string ;
                public periodeRemiseRapportMoisMax: string ;
                public periodeRemiseRapportMoisMin: string ;
                public periodeRemiseRapportAnneeMax: string ;
                public periodeRemiseRapportAnneeMin: string ;
      public typeExpertiseVo: TypeExpertiseVo ;
      public paysVo: PaysVo ;
      public etablissementVo: EtablissementVo ;
      public etatEtapeCampagneVo: EtatEtapeCampagneVo ;
      public chercheurVo: ChercheurVo ;
      public campagneVo: CampagneVo ;
      public communauteSavoirExpertiseScientifiquesVo: Array<CommunauteSavoirExpertiseScientifiqueVo>;
      public disciplineScientifiqueExpertiseScientifiquesVo: Array<DisciplineScientifiqueExpertiseScientifiqueVo>;

}
