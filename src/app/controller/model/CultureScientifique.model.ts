import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {OutilPedagogiqueVo} from './OutilPedagogique.model';
import {RencontreGrandPubliqueJeunePubliqueVo} from './RencontreGrandPubliqueJeunePublique.model';
import {RencontreMediaVo} from './RencontreMedia.model';
import {NatureActiviteGrandPubliqueVo} from './NatureActiviteGrandPublique.model';
import {CampagneVo} from './Campagne.model';
import {ChercheurVo} from './Chercheur.model';



export class CultureScientifiqueVo {

    public id: number;

     public annee: number;
     public tempsEstimePourCetteAnnne: number;
                public anneeMax: string ;
                public anneeMin: string ;
                public tempsEstimePourCetteAnnneMax: string ;
                public tempsEstimePourCetteAnnneMin: string ;
      public campagneVo: CampagneVo ;
      public chercheurVo: ChercheurVo ;
      public etatEtapeCampagneVo: EtatEtapeCampagneVo ;
      public natureActiviteGrandPubliqueVo: NatureActiviteGrandPubliqueVo ;
      public rencontreGrandPubliqueJeunePubliquesVo: Array<RencontreGrandPubliqueJeunePubliqueVo>;
      public rencontreMediasVo: Array<RencontreMediaVo>;
      public outilPedagogiquesVo: Array<OutilPedagogiqueVo>;

}
