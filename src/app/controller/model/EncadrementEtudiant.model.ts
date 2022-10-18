import {EtatEtapeCampagneVo} from './EtatEtapeCampagne.model';
import {EtudiantVo} from './Etudiant.model';
import {ResponsabiliteDirectionEncadrementEtudiantVo} from './ResponsabiliteDirectionEncadrementEtudiant.model';
import {EncadrementVo} from './Encadrement.model';
import {EncadrementEtudiantEnjeuxIrdVo} from './EncadrementEtudiantEnjeuxIrd.model';
import {NiveauFormationPostBacVo} from './NiveauFormationPostBac.model';
import {EtablissementVo} from './Etablissement.model';
import {EncadrementEtudiantDisciplineScientifiqueVo} from './EncadrementEtudiantDisciplineScientifique.model';
import {PaysVo} from './Pays.model';



export class EncadrementEtudiantVo {

    public id: number;

    public sujetEtude: string;
    public cursus: string;
      public niveauFormationPostBacVo: NiveauFormationPostBacVo ;
      public responsabiliteDirectionEncadrementEtudiantVo: ResponsabiliteDirectionEncadrementEtudiantVo ;
      public etudiantVo: EtudiantVo ;
      public etablissementVo: EtablissementVo ;
      public paysVo: PaysVo ;
      public encadrementVo: EncadrementVo ;
      public etatEtapeCampagneVo: EtatEtapeCampagneVo ;
      public encadrementEtudiantEnjeuxIrdsVo: Array<EncadrementEtudiantEnjeuxIrdVo>;
      public encadrementEtudiantDisciplineScientifiquesVo: Array<EncadrementEtudiantDisciplineScientifiqueVo>;

}
