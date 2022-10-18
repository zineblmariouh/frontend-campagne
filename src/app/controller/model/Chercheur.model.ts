import {CommunauteSavoirChercheurVo} from './CommunauteSavoirChercheur.model';
import {TypeEntiteAdministrativeVo} from './TypeEntiteAdministrative.model';
import {DepartementScientifiqueVo} from './DepartementScientifique.model';
import {ZoneActiviteInteractionRechercheVo} from './ZoneActiviteInteractionRecherche.model';
import {GradeVo} from './Grade.model';
import {CorpsVo} from './Corps.model';
import {CommissionScientifiqueVo} from './CommissionScientifique.model';
import {PaysVo} from './Pays.model';
import {ChercheurEmailVo} from './ChercheurEmail.model';
import {IdentifiantAuteurExpertVo} from './IdentifiantAuteurExpert.model';
import {EnjeuxIrdChercheurVo} from './EnjeuxIrdChercheur.model';
import {EntiteAdministrativeVo} from './EntiteAdministrative.model';
import {SexeVo} from './Sexe.model';
import {DisciplineScientifiqueChercheurVo} from './DisciplineScientifiqueChercheur.model';
import {VilleVo} from './Ville.model';
import {TypeInstrumentIrdChercheurVo} from './TypeInstrumentIrdChercheur.model';
import {AffectationStructurelleVo} from './AffectationStructurelle.model';
import {InstrumentIrdChercheurVo} from './InstrumentIrdChercheur.model';
import {User} from './User.model';



export class ChercheurVo  extends User{


    public consentementRgpd: null | boolean;
    public numeroMatricule: string;
    public emailPrincipale: string;
    public resume: string;
    public natureImplication: string;
    public formationEnManagement: null | boolean;
    public credentialsNonExpired: null | boolean;
    public enabled: null | boolean;
    public accountNonExpired: null | boolean;
    public accountNonLocked: null | boolean;
    public passwordChanged: null | boolean;
    public createdAt: Date;
    public updatedAt: Date;
    public username: string;
    public password: string;
    public prenom: string;
    public nom: string;
    public baseHorizon: string;
    public role: string;
                public createdAtMax: string ;
                public createdAtMin: string ;
                public updatedAtMax: string ;
                public updatedAtMin: string ;
      public affectationStructurelleVo: AffectationStructurelleVo ;
      public entiteAdministrativeVo: EntiteAdministrativeVo ;
      public typeEntiteAdministrativeVo: TypeEntiteAdministrativeVo ;
      public paysVo: PaysVo ;
      public villeVo: VilleVo ;
      public departementScientifiqueVo: DepartementScientifiqueVo ;
      public commissionScientifiqueVo: CommissionScientifiqueVo ;
      public gradeVo: GradeVo ;
      public corpsVo: CorpsVo ;
      public sexeVo: SexeVo ;
      public chercheurEmailsVo: Array<ChercheurEmailVo>;
      public disciplineScientifiqueChercheursVo: Array<DisciplineScientifiqueChercheurVo>;
      public zoneActiviteInteractionRecherchesVo: Array<ZoneActiviteInteractionRechercheVo>;
      public enjeuxIrdChercheursVo: Array<EnjeuxIrdChercheurVo>;
      public communauteSavoirChercheursVo: Array<CommunauteSavoirChercheurVo>;
      public instrumentIrdChercheursVo: Array<InstrumentIrdChercheurVo>;
      public typeInstrumentIrdChercheursVo: Array<TypeInstrumentIrdChercheurVo>;
      public identifiantAuteurExpertsVo: Array<IdentifiantAuteurExpertVo>;

}
