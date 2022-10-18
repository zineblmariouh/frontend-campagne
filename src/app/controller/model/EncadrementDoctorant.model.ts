import {FinancementDoctorantVo} from './FinancementDoctorant.model';
import {EnjeuxIrdEncadrementDoctorantVo} from './EnjeuxIrdEncadrementDoctorant.model';
import {DisciplineScientifiqueEncadrementDoctorantVo} from './DisciplineScientifiqueEncadrementDoctorant.model';
import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {CommunauteSavoirEncadrementDoctorantVo} from './CommunauteSavoirEncadrementDoctorant.model';
import {EncadrementVo} from './Encadrement.model';
import {DoctorantVo} from './Doctorant.model';
import {ResponsabiliteEncadrementDoctorantVo} from './ResponsabiliteEncadrementDoctorant.model';
import {EtablissementVo} from './Etablissement.model';
import {PaysVo} from './Pays.model';



export class EncadrementDoctorantVo {

    public id: number;

    public codirectionInternationale: null | boolean;
    public cursus: null | boolean;
    public sujetThese: string;
    public dateDebutThese: Date;
    public datePrevuSoutenanceThese: Date;
    public intituleEcoleDoctorale: string;
                public dateDebutTheseMax: string ;
                public dateDebutTheseMin: string ;
                public datePrevuSoutenanceTheseMax: string ;
                public datePrevuSoutenanceTheseMin: string ;
      public responsabiliteEncadrementDoctorantVo: ResponsabiliteEncadrementDoctorantVo ;
      public financementDoctorantVo: FinancementDoctorantVo ;
      public etablissementVo: EtablissementVo ;
      public paysVo: PaysVo ;
      public doctorantVo: DoctorantVo ;
      public encadrementVo: EncadrementVo ;
      public etatEtapeCampagneVo: EtatEtapeCampagneVo ;
      public enjeuxIrdEncadrementDoctorantsVo: Array<EnjeuxIrdEncadrementDoctorantVo>;
      public disciplineScientifiqueEncadrementDoctorantsVo: Array<DisciplineScientifiqueEncadrementDoctorantVo>;
      public communauteSavoirEncadrementDoctorantsVo: Array<CommunauteSavoirEncadrementDoctorantVo>;

}
