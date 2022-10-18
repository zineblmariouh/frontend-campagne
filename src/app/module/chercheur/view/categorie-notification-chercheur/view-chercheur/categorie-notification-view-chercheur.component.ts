import {Component, OnInit} from '@angular/core';
import {CategorieNotificationService} from '../../../../../controller/service/CategorieNotification.service';
import {CategorieNotificationVo} from '../../../../../controller/model/CategorieNotification.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-categorie-notification-view-chercheur',
  templateUrl: './categorie-notification-view-chercheur.component.html',
  styleUrls: ['./categorie-notification-view-chercheur.component.css']
})
export class CategorieNotificationViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private categorieNotificationService: CategorieNotificationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewCategorieNotificationDialog  = false;
}

// getters and setters

get categorieNotifications(): Array<CategorieNotificationVo> {
    return this.categorieNotificationService.categorieNotifications;
       }
set categorieNotifications(value: Array<CategorieNotificationVo>) {
        this.categorieNotificationService.categorieNotifications = value;
       }

 get selectedCategorieNotification():CategorieNotificationVo {
           return this.categorieNotificationService.selectedCategorieNotification;
       }
    set selectedCategorieNotification(value: CategorieNotificationVo) {
        this.categorieNotificationService.selectedCategorieNotification = value;
       }

   get viewCategorieNotificationDialog():boolean {
           return this.categorieNotificationService.viewCategorieNotificationDialog;

       }
    set viewCategorieNotificationDialog(value: boolean) {
        this.categorieNotificationService.viewCategorieNotificationDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
