import {EncadrementEtudiantVo} from './EncadrementEtudiant.model';
import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {EncadrementDoctorantVo} from './EncadrementDoctorant.model';
import {CampagneVo} from './Campagne.model';
import {ChercheurVo} from './Chercheur.model';



export class EncadrementVo {

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
      public encadrementEtudiantsVo: Array<EncadrementEtudiantVo>;
      public encadrementDoctorantsVo: Array<EncadrementDoctorantVo>;

}
