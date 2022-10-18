import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../../../../controller/service/Notification.service';
import {NotificationVo} from '../../../../../controller/model/Notification.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {CategorieNotificationVo} from '../../../../../controller/model/CategorieNotification.model';
import {CategorieNotificationService} from '../../../../../controller/service/CategorieNotification.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';

@Component({
  selector: 'app-notification-view-admin',
  templateUrl: './notification-view-admin.component.html',
  styleUrls: ['./notification-view-admin.component.css']
})
export class NotificationViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private notificationService: NotificationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private categorieNotificationService :CategorieNotificationService
    ,private chercheurService :ChercheurService
) {
}

// methods
ngOnInit(): void {
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCategorieNotification = new CategorieNotificationVo();
    this.categorieNotificationService.findAll().subscribe((data) => this.categorieNotifications = data);
}

hideViewDialog(){
    this.viewNotificationDialog  = false;
}

// getters and setters

get notifications(): Array<NotificationVo> {
    return this.notificationService.notifications;
       }
set notifications(value: Array<NotificationVo>) {
        this.notificationService.notifications = value;
       }

 get selectedNotification():NotificationVo {
           return this.notificationService.selectedNotification;
       }
    set selectedNotification(value: NotificationVo) {
        this.notificationService.selectedNotification = value;
       }

   get viewNotificationDialog():boolean {
           return this.notificationService.viewNotificationDialog;

       }
    set viewNotificationDialog(value: boolean) {
        this.notificationService.viewNotificationDialog= value;
       }

       get selectedCategorieNotification():CategorieNotificationVo {
           return this.categorieNotificationService.selectedCategorieNotification;
       }
      set selectedCategorieNotification(value: CategorieNotificationVo) {
        this.categorieNotificationService.selectedCategorieNotification = value;
       }
       get categorieNotifications():Array<CategorieNotificationVo> {
           return this.categorieNotificationService.categorieNotifications;
       }
       set categorieNotifications(value: Array<CategorieNotificationVo>) {
        this.categorieNotificationService.categorieNotifications = value;
       }
       get editCategorieNotificationDialog():boolean {
           return this.categorieNotificationService.editCategorieNotificationDialog;
       }
      set editCategorieNotificationDialog(value: boolean) {
        this.categorieNotificationService.editCategorieNotificationDialog= value;
       }
       get selectedChercheur():ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
      set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }
       get chercheurs():Array<ChercheurVo> {
           return this.chercheurService.chercheurs;
       }
       set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }
       get editChercheurDialog():boolean {
           return this.chercheurService.editChercheurDialog;
       }
      set editChercheurDialog(value: boolean) {
        this.chercheurService.editChercheurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
