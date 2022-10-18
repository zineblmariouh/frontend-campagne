import {CategorieNotificationVo} from './CategorieNotification.model';
import {ChercheurVo} from './Chercheur.model';



export class NotificationVo {

    public id: number;

    public libelle: string;
    public description: string;
    public vu: null | boolean;
    public dateNotification: Date;
    public dateLecture: Date;
                public dateNotificationMax: string ;
                public dateNotificationMin: string ;
                public dateLectureMax: string ;
                public dateLectureMin: string ;
      public chercheurVo: ChercheurVo ;
      public categorieNotificationVo: CategorieNotificationVo ;

}
