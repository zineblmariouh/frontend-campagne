import {DisciplineScientifiqueVo} from './DisciplineScientifique.model';
import {SemanticRelationshipVo} from './SemanticRelationship.model';
import {DisciplineScientifiqueErcVo} from './DisciplineScientifiqueErc.model';



export class DisciplineScientifiqueErcAssociationVo {

    public id: number;

    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
    public username: string;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public disciplineScientifiqueErcVo: DisciplineScientifiqueErcVo ;
      public disciplineScientifiqueVo: DisciplineScientifiqueVo ;
      public semanticRelationshipVo: SemanticRelationshipVo ;

}
