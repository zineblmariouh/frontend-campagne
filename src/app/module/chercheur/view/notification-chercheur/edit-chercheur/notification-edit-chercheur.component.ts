import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../../../../controller/service/Notification.service';
import {NotificationVo} from '../../../../../controller/model/Notification.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {CategorieNotificationVo} from '../../../../../controller/model/CategorieNotification.model';
import {CategorieNotificationService} from '../../../../../controller/service/CategorieNotification.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';

@Component({
  selector: 'app-notification-edit-chercheur',
  templateUrl: './notification-edit-chercheur.component.html',
  styleUrls: ['./notification-edit-chercheur.component.css']
})
export class NotificationEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private notificationService: NotificationService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private categorieNotificationService: CategorieNotificationService
 ,       private chercheurService: ChercheurService
) {
}

// methods
ngOnInit(): void {
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCategorieNotification = new CategorieNotificationVo();
    this.categorieNotificationService.findAll().subscribe((data) => this.categorieNotifications = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedNotification.dateNotification = DateUtils.toDate(this.selectedNotification.dateNotification);
            this.selectedNotification.dateLecture = DateUtils.toDate(this.selectedNotification.dateLecture);
    this.notificationService.edit().subscribe(notification=>{
    const myIndex = this.notifications.findIndex(e => e.id === this.selectedNotification.id);
    this.notifications[myIndex] = this.selectedNotification;
    this.editNotificationDialog = false;
    this.selectedNotification = new NotificationVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatecategorieNotification(categorieNotification: string) {
                      const isPermistted = await this.roleService.isPermitted('CategorieNotification', 'add');
                       if(isPermistted){
         this.selectedCategorieNotification = new CategorieNotificationVo();
        this.createCategorieNotificationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatechercheur(chercheur: string) {
                      const isPermistted = await this.roleService.isPermitted('Chercheur', 'add');
                       if(isPermistted){
         this.selectedChercheur = new ChercheurVo();
        this.createChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editNotificationDialog  = false;
}

// getters and setters

get notifications(): Array<NotificationVo> {
    return this.notificationService.notifications;
       }
set notifications(value: Array<NotificationVo>) {
        this.notificationService.notifications = value;
       }

 get selectedNotification(): NotificationVo {
           return this.notificationService.selectedNotification;
       }
    set selectedNotification(value: NotificationVo) {
        this.notificationService.selectedNotification = value;
       }

   get editNotificationDialog(): boolean {
           return this.notificationService.editNotificationDialog;

       }
    set editNotificationDialog(value: boolean) {
        this.notificationService.editNotificationDialog = value;
       }

       get selectedCategorieNotification(): CategorieNotificationVo {
           return this.categorieNotificationService.selectedCategorieNotification;
       }
      set selectedCategorieNotification(value: CategorieNotificationVo) {
        this.categorieNotificationService.selectedCategorieNotification = value;
       }
       get categorieNotifications(): Array<CategorieNotificationVo> {
           return this.categorieNotificationService.categorieNotifications;
       }
       set categorieNotifications(value: Array<CategorieNotificationVo>) {
        this.categorieNotificationService.categorieNotifications = value;
       }
       get createCategorieNotificationDialog(): boolean {
           return this.categorieNotificationService.createCategorieNotificationDialog;
       }
      set createCategorieNotificationDialog(value: boolean) {
        this.categorieNotificationService.createCategorieNotificationDialog= value;
       }
       get selectedChercheur(): ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
      set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }
       get chercheurs(): Array<ChercheurVo> {
           return this.chercheurService.chercheurs;
       }
       set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }
       get createChercheurDialog(): boolean {
           return this.chercheurService.createChercheurDialog;
       }
      set createChercheurDialog(value: boolean) {
        this.chercheurService.createChercheurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
