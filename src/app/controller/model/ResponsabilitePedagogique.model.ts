import {EnseignementEtFormationVo} from './EnseignementEtFormation.model';
import {StatusCursusVo} from './StatusCursus.model';
import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {NiveauResponsabilitePedagogiqueVo} from './NiveauResponsabilitePedagogique.model';
import {ResponsabilitePedagogiqueEtablissementVo} from './ResponsabilitePedagogiqueEtablissement.model';
import {ResponsabilitePedagogiqueEnjeuxIrdVo} from './ResponsabilitePedagogiqueEnjeuxIrd.model';
import {ResponsabilitePedagogiquePaysVo} from './ResponsabilitePedagogiquePays.model';



export class ResponsabilitePedagogiqueVo {

    public id: number;

    public intituleCursus: string;
    public serviceRenforcementCapacite: null | boolean;
    public cursusConstruitAvecEtablissements: null | boolean;
      public niveauResponsabilitePedagogiqueVo: NiveauResponsabilitePedagogiqueVo ;
      public statusCursusVo: StatusCursusVo ;
      public etatEtapeCampagneVo: EtatEtapeCampagneVo ;
      public enseignementEtFormationVo: EnseignementEtFormationVo ;
      public responsabilitePedagogiqueEnjeuxIrdsVo: Array<ResponsabilitePedagogiqueEnjeuxIrdVo>;
      public responsabilitePedagogiqueEtablissementsVo: Array<ResponsabilitePedagogiqueEtablissementVo>;
      public responsabilitePedagogiquePayssVo: Array<ResponsabilitePedagogiquePaysVo>;

}
