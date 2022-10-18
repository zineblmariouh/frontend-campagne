import {Component, OnInit, Input} from '@angular/core';
import {NotificationService} from '../../../../../controller/service/Notification.service';
import {NotificationVo} from '../../../../../controller/model/Notification.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';
import {CategorieNotificationVo} from '../../../../../controller/model/CategorieNotification.model';
import {CategorieNotificationService} from '../../../../../controller/service/CategorieNotification.service';
@Component({
  selector: 'app-notification-create-admin',
  templateUrl: './notification-create-admin.component.html',
  styleUrls: ['./notification-create-admin.component.css']
})
export class NotificationCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validNotificationLibelle = true;

    _validCategorieNotificationLibelle = true;



constructor(private datePipe: DatePipe, private notificationService: NotificationService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private chercheurService :ChercheurService
,       private categorieNotificationService :CategorieNotificationService
) {

}


// methods
ngOnInit(): void {

    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCategorieNotification = new CategorieNotificationVo();
    this.categorieNotificationService.findAll().subscribe((data) => this.categorieNotifications = data);
}




private setValidation(value : boolean){
    this.validNotificationLibelle = value;
    }


public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.notificationService.save().subscribe(notification=>{
       this.notifications.push({...notification});
       this.createNotificationDialog = false;
       this.submitted = false;
       this.selectedNotification = new NotificationVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateNotificationLibelle();

    }

private validateNotificationLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedNotification.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validNotificationLibelle = false;
        } else {
            this.validNotificationLibelle = true;
        }
    }











//openPopup
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

hideCreateDialog(){
    this.createNotificationDialog  = false;
    this.setValidation(true);
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

   get createNotificationDialog(): boolean {
           return this.notificationService.createNotificationDialog;

       }
    set createNotificationDialog(value: boolean) {
        this.notificationService.createNotificationDialog= value;
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
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }




    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }

    get validNotificationLibelle(): boolean {
    return this._validNotificationLibelle;
    }

    set validNotificationLibelle(value: boolean) {
    this._validNotificationLibelle = value;
    }

    get validCategorieNotificationLibelle(): boolean {
    return this._validCategorieNotificationLibelle;
    }

    set validCategorieNotificationLibelle(value: boolean) {
    this._validCategorieNotificationLibelle = value;
    }

}
