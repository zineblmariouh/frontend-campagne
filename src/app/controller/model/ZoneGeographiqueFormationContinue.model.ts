import {FormationContinueVo} from './FormationContinue.model';
import {ZoneGeographiqueVo} from './ZoneGeographique.model';
import {PaysVo} from './Pays.model';



export class ZoneGeographiqueFormationContinueVo {

    public id: number;

    public libelle: string;
      public formationContinueVo: FormationContinueVo ;
      public zoneGeographiqueVo: ZoneGeographiqueVo ;
      public paysVo: PaysVo ;

}
