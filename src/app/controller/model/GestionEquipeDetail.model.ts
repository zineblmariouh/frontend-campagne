import {GestionEquipeVo} from './GestionEquipe.model';



export class GestionEquipeDetailVo {

    public id: number;

     public nombrePersonneEncadre: number;
     public nombrePersonneHorsIrd: number;
     public nombrePersonneSousConventions: number;
    public formationManagement: null | boolean;
                public nombrePersonneEncadreMax: string ;
                public nombrePersonneEncadreMin: string ;
                public nombrePersonneHorsIrdMax: string ;
                public nombrePersonneHorsIrdMin: string ;
                public nombrePersonneSousConventionsMax: string ;
                public nombrePersonneSousConventionsMin: string ;
      public gestionEquipeVo: GestionEquipeVo ;

}
