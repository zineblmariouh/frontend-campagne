import {TypeReclamationVo} from './TypeReclamation.model';
import {EtatReclamationVo} from './EtatReclamation.model';
import {ChercheurVo} from './Chercheur.model';



export class ReclamationVo {

    public id: number;

    public objet: string;
    public message: string;
    public dateReclamation: Date;
    public dateTraitement: Date;
                public dateReclamationMax: string ;
                public dateReclamationMin: string ;
                public dateTraitementMax: string ;
                public dateTraitementMin: string ;
      public etatReclamationVo: EtatReclamationVo ;
      public typeReclamationVo: TypeReclamationVo ;
      public chercheurVo: ChercheurVo ;

}
