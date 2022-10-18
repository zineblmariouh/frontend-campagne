import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {TypeParticipationVo} from './TypeParticipation.model';
import {DistinctionEtablissementPaysVo} from './DistinctionEtablissementPays.model';
import {CampagneVo} from './Campagne.model';
import {PaysVo} from './Pays.model';
import {ChercheurVo} from './Chercheur.model';



export class DistinctionVo {

    public id: number;

    public dateObtention: Date;
    public intitule: string;
                public dateObtentionMax: string ;
                public dateObtentionMin: string ;
      public typeParticipationVo: TypeParticipationVo ;
      public paysVo: PaysVo ;
      public etatEtapeCampagneVo: EtatEtapeCampagneVo ;
      public chercheurVo: ChercheurVo ;
      public campagneVo: CampagneVo ;
      public distinctionEtablissementPayssVo: Array<DistinctionEtablissementPaysVo>;

}
