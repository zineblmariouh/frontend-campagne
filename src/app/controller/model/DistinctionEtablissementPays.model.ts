import {DistinctionVo} from './Distinction.model';
import {EtablissementVo} from './Etablissement.model';
import {PaysVo} from './Pays.model';



export class DistinctionEtablissementPaysVo {

    public id: number;

      public paysVo: PaysVo ;
      public etablissementVo: EtablissementVo ;
      public distinctionVo: DistinctionVo ;

}
