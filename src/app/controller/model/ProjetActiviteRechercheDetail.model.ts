import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {ProjetActiviteRechercheDetailPaysVo} from './ProjetActiviteRechercheDetailPays.model';
import {ProjetActiviteRechercheVo} from './ProjetActiviteRecherche.model';
import {RoleProjetVo} from './RoleProjet.model';
import {ProjetActiviteRechercheDetailEtablissementLanceurVo} from './ProjetActiviteRechercheDetailEtablissementLanceur.model';
import {StatusProjetVo} from './StatusProjet.model';
import {EtablissementVo} from './Etablissement.model';
import {ProjetActiviteRechercheDetailInstitutionCoContractantVo} from './ProjetActiviteRechercheDetailInstitutionCoContractant.model';
import {PaysVo} from './Pays.model';
import {ProjetActiviteRechercheDetailEnjeuxIrdVo} from './ProjetActiviteRechercheDetailEnjeuxIrd.model';
import {ProjetActiviteRechercheDetailInstrumentIrdVo} from './ProjetActiviteRechercheDetailInstrumentIrd.model';



export class ProjetActiviteRechercheDetailVo {

    public id: number;

    public sujetIntituleReponse: string;
     public dureePrevuEnMois: number;
    public financementSpecifique: null | boolean;
     public montantFinancementPrevu: number;
                public dureePrevuEnMoisMax: string ;
                public dureePrevuEnMoisMin: string ;
                public montantFinancementPrevuMax: string ;
                public montantFinancementPrevuMin: string ;
      public statusProjetVo: StatusProjetVo ;
      public roleProjetVo: RoleProjetVo ;
      public etablissementVo: EtablissementVo ;
      public paysVo: PaysVo ;
      public projetActiviteRechercheVo: ProjetActiviteRechercheVo ;
      public etatEtapeCampagneVo: EtatEtapeCampagneVo ;
      public projetActiviteRechercheDetailEnjeuxIrdsVo: Array<ProjetActiviteRechercheDetailEnjeuxIrdVo>;
      public projetActiviteRechercheDetailInstrumentIrdsVo: Array<ProjetActiviteRechercheDetailInstrumentIrdVo>;
      public projetActiviteRechercheDetailPayssVo: Array<ProjetActiviteRechercheDetailPaysVo>;
      public projetActiviteRechercheDetailInstitutionCoContractantsVo: Array<ProjetActiviteRechercheDetailInstitutionCoContractantVo>;
      public projetActiviteRechercheDetailEtablissementLanceursVo: Array<ProjetActiviteRechercheDetailEtablissementLanceurVo>;

}
