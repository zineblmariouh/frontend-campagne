import {Component, OnInit, Input} from '@angular/core';
import {CategorieNotificationService} from '../../../../../controller/service/CategorieNotification.service';
import {CategorieNotificationVo} from '../../../../../controller/model/CategorieNotification.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-categorie-notification-create-chercheur',
  templateUrl: './categorie-notification-create-chercheur.component.html',
  styleUrls: ['./categorie-notification-create-chercheur.component.css']
})
export class CategorieNotificationCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validCategorieNotificationLibelle = true;




constructor(private datePipe: DatePipe, private categorieNotificationService: CategorieNotificationService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}


// methods
ngOnInit(): void {

}




private setValidation(value : boolean){
    this.validCategorieNotificationLibelle = value;
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
     this.categorieNotificationService.save().subscribe(categorieNotification=>{
       this.categorieNotifications.push({...categorieNotification});
       this.createCategorieNotificationDialog = false;
       this.submitted = false;
       this.selectedCategorieNotification = new CategorieNotificationVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateCategorieNotificationLibelle();

    }

private validateCategorieNotificationLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedCategorieNotification.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validCategorieNotificationLibelle = false;
        } else {
            this.validCategorieNotificationLibelle = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createCategorieNotificationDialog  = false;
    this.setValidation(true);
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

   get createCategorieNotificationDialog(): boolean {
           return this.categorieNotificationService.createCategorieNotificationDialog;

       }
    set createCategorieNotificationDialog(value: boolean) {
        this.categorieNotificationService.createCategorieNotificationDialog= value;
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

    get validCategorieNotificationLibelle(): boolean {
    return this._validCategorieNotificationLibelle;
    }

    set validCategorieNotificationLibelle(value: boolean) {
    this._validCategorieNotificationLibelle = value;
    }


}
