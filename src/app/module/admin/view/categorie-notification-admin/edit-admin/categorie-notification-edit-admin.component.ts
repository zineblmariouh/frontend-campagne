import {Component, OnInit} from '@angular/core';
import {CategorieNotificationService} from '../../../../../controller/service/CategorieNotification.service';
import {CategorieNotificationVo} from '../../../../../controller/model/CategorieNotification.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-categorie-notification-edit-admin',
  templateUrl: './categorie-notification-edit-admin.component.html',
  styleUrls: ['./categorie-notification-edit-admin.component.css']
})
export class CategorieNotificationEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private categorieNotificationService: CategorieNotificationService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
) {
}

// methods
ngOnInit(): void {
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.categorieNotificationService.edit().subscribe(categorieNotification=>{
    const myIndex = this.categorieNotifications.findIndex(e => e.id === this.selectedCategorieNotification.id);
    this.categorieNotifications[myIndex] = this.selectedCategorieNotification;
    this.editCategorieNotificationDialog = false;
    this.selectedCategorieNotification = new CategorieNotificationVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editCategorieNotificationDialog  = false;
}

// getters and setters

get categorieNotifications(): Array<CategorieNotificationVo> {
    return this.categorieNotificationService.categorieNotifications;
       }
set categorieNotifications(value: Array<CategorieNotificationVo>) {
        this.categorieNotificationService.categorieNotifications = value;
       }

 get selectedCategorieNotification(): CategorieNotificationVo {
           return this.categorieNotificationService.selectedCategorieNotification;
       }
    set selectedCategorieNotification(value: CategorieNotificationVo) {
        this.categorieNotificationService.selectedCategorieNotification = value;
       }

   get editCategorieNotificationDialog(): boolean {
           return this.categorieNotificationService.editCategorieNotificationDialog;

       }
    set editCategorieNotificationDialog(value: boolean) {
        this.categorieNotificationService.editCategorieNotificationDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
