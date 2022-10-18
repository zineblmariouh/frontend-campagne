import {SavoirEtInnovationVo} from './SavoirEtInnovation.model';
import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {StatusContratEtConventionVo} from './StatusContratEtConvention.model';



export class ContratEtConventionIrdVo {

    public id: number;

    public numero: string;
    public dateContrat: Date;
    public intitule: string;
    public description: string;
                public dateContratMax: string ;
                public dateContratMin: string ;
      public statusContratEtConventionVo: StatusContratEtConventionVo ;
      public savoirEtInnovationVo: SavoirEtInnovationVo ;
      public etatEtapeCampagneVo: EtatEtapeCampagneVo ;

}
