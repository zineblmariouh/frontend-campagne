import {RencontreMediaPeriodeVo} from './RencontreMediaPeriode.model';
import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {PaysRencontreMediaVo} from './PaysRencontreMedia.model';
import {RencontreMediaDisciplineScientifiqueVo} from './RencontreMediaDisciplineScientifique.model';
import {RencontreMediaEnjeuxIrdVo} from './RencontreMediaEnjeuxIrd.model';
import {TypePubliqueRencontreMediaVo} from './TypePubliqueRencontreMedia.model';
import {FormatRencontreVo} from './FormatRencontre.model';
import {CultureScientifiqueVo} from './CultureScientifique.model';



export class RencontreMediaVo {

    public id: number;

    public intituleSujet: string;
    public lienWeb: string;
    public remarque: string;
      public formatRencontreVo: FormatRencontreVo ;
      public cultureScientifiqueVo: CultureScientifiqueVo ;
      public etatEtapeCampagneVo: EtatEtapeCampagneVo ;
      public typePubliqueRencontreMediasVo: Array<TypePubliqueRencontreMediaVo>;
      public rencontreMediaEnjeuxIrdsVo: Array<RencontreMediaEnjeuxIrdVo>;
      public rencontreMediaDisciplineScientifiquesVo: Array<RencontreMediaDisciplineScientifiqueVo>;
      public rencontreMediaPeriodesVo: Array<RencontreMediaPeriodeVo>;
      public paysRencontreMediasVo: Array<PaysRencontreMediaVo>;

}
