import {ZoneGeographiqueVo} from './ZoneGeographique.model';
import {ConseilsScientifiqueVo} from './ConseilsScientifique.model';
import {PaysVo} from './Pays.model';



export class ZoneGeographiqueConseilsScientifiqueVo {

    public id: number;

    public libelle: string;
      public conseilsScientifiqueVo: ConseilsScientifiqueVo ;
      public zoneGeographiqueVo: ZoneGeographiqueVo ;
      public paysVo: PaysVo ;

}
