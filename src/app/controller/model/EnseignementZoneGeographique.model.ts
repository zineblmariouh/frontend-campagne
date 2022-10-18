import {EnseignementVo} from './Enseignement.model';
import {ZoneGeographiqueVo} from './ZoneGeographique.model';
import {PaysVo} from './Pays.model';



export class EnseignementZoneGeographiqueVo {

    public id: number;

    public libelle: string;
      public enseignementVo: EnseignementVo ;
      public zoneGeographiqueVo: ZoneGeographiqueVo ;
      public paysVo: PaysVo ;

}
