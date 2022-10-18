import {Component, OnInit, Input} from '@angular/core';
import {ChercheurEmailService} from '../../../../../controller/service/ChercheurEmail.service';
import {ChercheurEmailVo} from '../../../../../controller/model/ChercheurEmail.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';
@Component({
  selector: 'app-chercheur-email-create-admin',
  templateUrl: './chercheur-email-create-admin.component.html',
  styleUrls: ['./chercheur-email-create-admin.component.css']
})
export class ChercheurEmailCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private chercheurEmailService: ChercheurEmailService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private chercheurService :ChercheurService
) {

}


// methods
ngOnInit(): void {

    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
}




private setValidation(value : boolean){
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
     this.chercheurEmailService.save().subscribe(chercheurEmail=>{
       this.chercheurEmails.push({...chercheurEmail});
       this.createChercheurEmailDialog = false;
       this.submitted = false;
       this.selectedChercheurEmail = new ChercheurEmailVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }








//openPopup
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
    this.createChercheurEmailDialog  = false;
    this.setValidation(true);
}

// getters and setters

get chercheurEmails(): Array<ChercheurEmailVo> {
    return this.chercheurEmailService.chercheurEmails;
       }
set chercheurEmails(value: Array<ChercheurEmailVo>) {
        this.chercheurEmailService.chercheurEmails = value;
       }

 get selectedChercheurEmail():ChercheurEmailVo {
           return this.chercheurEmailService.selectedChercheurEmail;
       }
    set selectedChercheurEmail(value: ChercheurEmailVo) {
        this.chercheurEmailService.selectedChercheurEmail = value;
       }

   get createChercheurEmailDialog(): boolean {
           return this.chercheurEmailService.createChercheurEmailDialog;

       }
    set createChercheurEmailDialog(value: boolean) {
        this.chercheurEmailService.createChercheurEmailDialog= value;
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



}
