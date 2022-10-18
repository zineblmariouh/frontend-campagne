import {RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo} from './RencontreGrandPubliqueJeunePubliqueEnjeuxIrd.model';
import {RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo} from './RencontreGrandPubliqueJeunePubliqueInstrumentIrd.model';
import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo} from './RencontreGrandPubliqueJeunePubliqueDisciplineScientifique.model';
import {FormatRencontreVo} from './FormatRencontre.model';
import {PaysRencontreGrandPubliqueJeunePubliqueVo} from './PaysRencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo} from './RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.model';
import {PaysVo} from './Pays.model';
import {CultureScientifiqueVo} from './CultureScientifique.model';
import {RencontreGrandPubliqueJeunePubliquePeriodeVo} from './RencontreGrandPubliqueJeunePubliquePeriode.model';
import {PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo} from './PaysOrganisateurRencontreGrandPubliqueJeunePublique.model';
import {TypePubliqueRencontreGrandPubliqueJeunePubliqueVo} from './TypePubliqueRencontreGrandPubliqueJeunePublique.model';
import {StructureOganisatriceVo} from './StructureOganisatrice.model';
import {ContexteVo} from './Contexte.model';



export class RencontreGrandPubliqueJeunePubliqueVo {

    public id: number;

    public intituleSujet: string;
     public nombrePersonneEstime: number;
    public lienInstrumentIrd: null | boolean;
    public lienWeb: string;
    public remarque: string;
                public nombrePersonneEstimeMax: string ;
                public nombrePersonneEstimeMin: string ;
      public formatRencontreVo: FormatRencontreVo ;
      public contexteVo: ContexteVo ;
      public paysVo: PaysVo ;
      public cultureScientifiqueVo: CultureScientifiqueVo ;
      public etatEtapeCampagneVo: EtatEtapeCampagneVo ;
      public typePubliqueRencontreGrandPubliqueJeunePubliquesVo: Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo>;
      public rencontreGrandPubliqueJeunePubliqueEnjeuxIrdsVo: Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo>;
      public rencontreGrandPubliqueJeunePubliqueDisciplineScientifiquesVo: Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo>;
      public rencontreGrandPubliqueJeunePubliquePeriodesVo: Array<RencontreGrandPubliqueJeunePubliquePeriodeVo>;
      public structureOganisatricesVo: Array<StructureOganisatriceVo>;
      public paysRencontreGrandPubliqueJeunePubliquesVo: Array<PaysRencontreGrandPubliqueJeunePubliqueVo>;
      public paysOrganisateurRencontreGrandPubliqueJeunePubliquesVo: Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo>;
      public rencontreGrandPubliqueJeunePubliqueInstrumentIrdsVo: Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo>;
      public rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdsVo: Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo>;

}
