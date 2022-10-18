import {EtablissementVo} from './Etablissement.model';
import {ResponsabilitePedagogiqueVo} from './ResponsabilitePedagogique.model';
import {PaysVo} from './Pays.model';



export class ResponsabilitePedagogiqueEtablissementVo {

    public id: number;

      public etablissementVo: EtablissementVo ;
      public responsabilitePedagogiqueVo: ResponsabilitePedagogiqueVo ;
      public paysVo: PaysVo ;

}
