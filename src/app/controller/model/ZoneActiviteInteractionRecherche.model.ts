import {ZoneGeographiqueVo} from './ZoneGeographique.model';
import {PaysVo} from './Pays.model';
import {ChercheurVo} from './Chercheur.model';



export class ZoneActiviteInteractionRechercheVo {

    public id: number;

    public libelle: string;
      public paysVo: PaysVo ;
      public zoneGeographiqueVo: ZoneGeographiqueVo ;
      public chercheurVo: ChercheurVo ;

}
