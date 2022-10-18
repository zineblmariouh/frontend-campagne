import {KeyWordVo} from './KeyWord.model';
import {DisciplineScientifiqueErcVo} from './DisciplineScientifiqueErc.model';



export class KeyWordDisciplineScientifiqueErcVo {

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
      public keyWordVo: KeyWordVo ;
      public disciplineScientifiqueErcVo: DisciplineScientifiqueErcVo ;

}
