import {CampagneChercheurOuvertureVo} from './CampagneChercheurOuverture.model';
import {GestionEquipeVo} from './GestionEquipe.model';
import {EtatCampagneVo} from './EtatCampagne.model';
import {ProjetActiviteRechercheVo} from './ProjetActiviteRecherche.model';
import {TemplateClotureVo} from './TemplateCloture.model';
import {InstrumentsEtDispositifsIrdVo} from './InstrumentsEtDispositifsIrd.model';
import {TemplateOuvertureVo} from './TemplateOuverture.model';
import {CampagneRelanceVo} from './CampagneRelance.model';
import {DistinctionVo} from './Distinction.model';
import {CampagneRappelVo} from './CampagneRappel.model';
import {CampagneChercheurFermetureVo} from './CampagneChercheurFermeture.model';



export class CampagneVo {

    public id: number;

    public libelle: string;
    public code: string;
     public annee: number;
    public dateDepart: Date;
    public dateFin: Date;
    public objetOuverture: string;
    public messageOuverture: string;
    public objetCloture: string;
    public messageCloture: string;
                public anneeMax: string ;
                public anneeMin: string ;
                public dateDepartMax: string ;
                public dateDepartMin: string ;
                public dateFinMax: string ;
                public dateFinMin: string ;
      public etatCampagneVo: EtatCampagneVo ;
      public templateOuvertureVo: TemplateOuvertureVo ;
      public templateClotureVo: TemplateClotureVo ;
      public campagneChercheurOuverturesVo: Array<CampagneChercheurOuvertureVo>;
      public campagneChercheurFermeturesVo: Array<CampagneChercheurFermetureVo>;
      public campagneRelancesVo: Array<CampagneRelanceVo>;
      public campagneRappelsVo: Array<CampagneRappelVo>;
      public distinctionsVo: Array<DistinctionVo>;
      public projetActiviteRecherchesVo: Array<ProjetActiviteRechercheVo>;
      public instrumentsEtDispositifsIrdsVo: Array<InstrumentsEtDispositifsIrdVo>;
      public gestionEquipesVo: Array<GestionEquipeVo>;

}
