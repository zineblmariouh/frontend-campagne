import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {FormationContinueVo} from './FormationContinue.model';
import {EnseignementVo} from './Enseignement.model';
import {CampagneVo} from './Campagne.model';
import {ResponsabilitePedagogiqueVo} from './ResponsabilitePedagogique.model';
import {ChercheurVo} from './Chercheur.model';



export class EnseignementEtFormationVo {

    public id: number;

     public annee: number;
     public tempsEstimePourCetteAnnne: number;
                public anneeMax: string ;
                public anneeMin: string ;
                public tempsEstimePourCetteAnnneMax: string ;
                public tempsEstimePourCetteAnnneMin: string ;
      public etatEtapeCampagneVo: EtatEtapeCampagneVo ;
      public chercheurVo: ChercheurVo ;
      public campagneVo: CampagneVo ;
      public enseignementsVo: Array<EnseignementVo>;
      public formationContinuesVo: Array<FormationContinueVo>;
      public responsabilitePedagogiquesVo: Array<ResponsabilitePedagogiqueVo>;

}
