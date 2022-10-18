import {Component, OnInit, Input} from '@angular/core';
import {InstitutionService} from '../../../../../controller/service/Institution.service';
import {InstitutionVo} from '../../../../../controller/model/Institution.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-institution-create-admin',
  templateUrl: './institution-create-admin.component.html',
  styleUrls: ['./institution-create-admin.component.css']
})
export class InstitutionCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validInstitutionLibelle = true;
   _validInstitutionCode = true;




constructor(private datePipe: DatePipe, private institutionService: InstitutionService
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
    this.validInstitutionLibelle = value;
    this.validInstitutionCode = value;
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
     this.institutionService.save().subscribe(institution=>{
       this.institutions.push({...institution});
       this.createInstitutionDialog = false;
       this.submitted = false;
       this.selectedInstitution = new InstitutionVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateInstitutionLibelle();
this.validateInstitutionCode();

    }

private validateInstitutionLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedInstitution.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validInstitutionLibelle = false;
        } else {
            this.validInstitutionLibelle = true;
        }
    }
private validateInstitutionCode(){
        if (this.stringUtilService.isEmpty(this.selectedInstitution.code)) {
            this.errorMessages.push('Code non valide');
            this.validInstitutionCode = false;
        } else {
            this.validInstitutionCode = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createInstitutionDialog  = false;
    this.setValidation(true);
}

// getters and setters

get institutions(): Array<InstitutionVo> {
    return this.institutionService.institutions;
       }
set institutions(value: Array<InstitutionVo>) {
        this.institutionService.institutions = value;
       }

 get selectedInstitution():InstitutionVo {
           return this.institutionService.selectedInstitution;
       }
    set selectedInstitution(value: InstitutionVo) {
        this.institutionService.selectedInstitution = value;
       }

   get createInstitutionDialog(): boolean {
           return this.institutionService.createInstitutionDialog;

       }
    set createInstitutionDialog(value: boolean) {
        this.institutionService.createInstitutionDialog= value;
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

    get validInstitutionLibelle(): boolean {
    return this._validInstitutionLibelle;
    }

    set validInstitutionLibelle(value: boolean) {
    this._validInstitutionLibelle = value;
    }
    get validInstitutionCode(): boolean {
    return this._validInstitutionCode;
    }

    set validInstitutionCode(value: boolean) {
    this._validInstitutionCode = value;
    }


}
