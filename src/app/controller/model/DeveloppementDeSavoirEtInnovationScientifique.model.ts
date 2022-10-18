import {SavoirEtInnovationVo} from './SavoirEtInnovation.model';
import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {DeveloppementDeSavoirEtInnovationScientifiquePaysVo} from './DeveloppementDeSavoirEtInnovationScientifiquePays.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo} from './DeveloppementDeSavoirEtInnovationScientifiqueEtablissement.model';
import {RoleDeveloppementDeSavoirVo} from './RoleDeveloppementDeSavoir.model';
import {TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo} from './TypeSavoirDeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo} from './DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir.model';
import {TypeUtilisateurSavoirConcuVo} from './TypeUtilisateurSavoirConcu.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo} from './DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo} from './DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo} from './DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.model';



export class DeveloppementDeSavoirEtInnovationScientifiqueVo {

    public id: number;

    public titreInstrument: string;
     public anneeMiseEnOeuvre: number;
    public lienWeb: string;
                public anneeMiseEnOeuvreMax: string ;
                public anneeMiseEnOeuvreMin: string ;
      public roleDeveloppementDeSavoirVo: RoleDeveloppementDeSavoirVo ;
      public savoirEtInnovationVo: SavoirEtInnovationVo ;
      public etatEtapeCampagneVo: EtatEtapeCampagneVo ;
      public typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo: Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo>;
      public typeUtilisateurSavoirConcusVo: Array<TypeUtilisateurSavoirConcuVo>;
      public developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo: Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo>;
      public developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo: Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo>;
      public developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo: Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo>;
      public developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo: Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo>;
      public developpementDeSavoirEtInnovationScientifiquePayssVo: Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo>;
      public developpementDeSavoirEtInnovationScientifiqueEtablissementsVo: Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo>;

}
