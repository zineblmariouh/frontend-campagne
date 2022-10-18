import {EnseignementEtFormationVo} from './EnseignementEtFormation.model';
import {EnseignementDisciplineScientifiqueVo} from './EnseignementDisciplineScientifique.model';
import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {EnseignementNatureVo} from './EnseignementNature.model';
import {EnseignementEnjeuxIrdVo} from './EnseignementEnjeuxIrd.model';
import {NiveauEtudeEnseignementVo} from './NiveauEtudeEnseignement.model';
import {EtablissementEnseignementVo} from './EtablissementEnseignement.model';
import {TypeEtudeEnseignementVo} from './TypeEtudeEnseignement.model';
import {ModaliteEtudeVo} from './ModaliteEtude.model';
import {EnseignementZoneGeographiqueVo} from './EnseignementZoneGeographique.model';



export class EnseignementVo {

    public id: number;

    public intitule: string;
     public nombreHeure: number;
    public etabilssementNonReconnu: null | boolean;
                public nombreHeureMax: string ;
                public nombreHeureMin: string ;
      public modaliteEtudeVo: ModaliteEtudeVo ;
      public etatEtapeCampagneVo: EtatEtapeCampagneVo ;
      public enseignementEtFormationVo: EnseignementEtFormationVo ;
      public typeEtudeEnseignementsVo: Array<TypeEtudeEnseignementVo>;
      public enseignementNaturesVo: Array<EnseignementNatureVo>;
      public niveauEtudeEnseignementsVo: Array<NiveauEtudeEnseignementVo>;
      public etablissementEnseignementsVo: Array<EtablissementEnseignementVo>;
      public enseignementZoneGeographiquesVo: Array<EnseignementZoneGeographiqueVo>;
      public enseignementEnjeuxIrdsVo: Array<EnseignementEnjeuxIrdVo>;
      public enseignementDisciplineScientifiquesVo: Array<EnseignementDisciplineScientifiqueVo>;

}
