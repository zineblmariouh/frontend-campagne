import {OutilPedagogiqueTypeInstrumentIrdVo} from './OutilPedagogiqueTypeInstrumentIrd.model';
import {OutilPedagogiqueLangueVo} from './OutilPedagogiqueLangue.model';
import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {OutilPedagogiqueEnjeuxIrdVo} from './OutilPedagogiqueEnjeuxIrd.model';
import {OutilPedagogiquePaysDiffusionVo} from './OutilPedagogiquePaysDiffusion.model';
import {OutilPedagogiquePubliqueCibleVo} from './OutilPedagogiquePubliqueCible.model';
import {TypeOutilPedagogiqueVo} from './TypeOutilPedagogique.model';
import {OutilPedagogiquePaysConceptionVo} from './OutilPedagogiquePaysConception.model';
import {OutilPedagogiqueInstrumentIrdVo} from './OutilPedagogiqueInstrumentIrd.model';
import {CultureScientifiqueVo} from './CultureScientifique.model';
import {OutilPedagogiqueDisciplineScientifiqueVo} from './OutilPedagogiqueDisciplineScientifique.model';



export class OutilPedagogiqueVo {

    public id: number;

    public nom: string;
    public roleOutilPedagogique: string;
    public dateDiffusion: Date;
    public disponnibleNumerique: null | boolean;
    public lienWeb: string;
    public lienInstrumentIrd: null | boolean;
    public partenaireEventuel: string;
    public remarque: string;
                public dateDiffusionMax: string ;
                public dateDiffusionMin: string ;
      public cultureScientifiqueVo: CultureScientifiqueVo ;
      public etatEtapeCampagneVo: EtatEtapeCampagneVo ;
      public outilPedagogiqueEnjeuxIrdsVo: Array<OutilPedagogiqueEnjeuxIrdVo>;
      public outilPedagogiqueDisciplineScientifiquesVo: Array<OutilPedagogiqueDisciplineScientifiqueVo>;
      public outilPedagogiquePubliqueCiblesVo: Array<OutilPedagogiquePubliqueCibleVo>;
      public typeOutilPedagogiquesVo: Array<TypeOutilPedagogiqueVo>;
      public outilPedagogiqueLanguesVo: Array<OutilPedagogiqueLangueVo>;
      public outilPedagogiquePaysConceptionsVo: Array<OutilPedagogiquePaysConceptionVo>;
      public outilPedagogiquePaysDiffusionsVo: Array<OutilPedagogiquePaysDiffusionVo>;
      public outilPedagogiqueInstrumentIrdsVo: Array<OutilPedagogiqueInstrumentIrdVo>;
      public outilPedagogiqueTypeInstrumentIrdsVo: Array<OutilPedagogiqueTypeInstrumentIrdVo>;

}
