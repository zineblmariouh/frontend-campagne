import {Component, OnInit, Input} from '@angular/core';
import {TypeEnseignementService} from '../../../../../controller/service/TypeEnseignement.service';
import {TypeEnseignementVo} from '../../../../../controller/model/TypeEnseignement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-type-enseignement-create-admin',
  templateUrl: './type-enseignement-create-admin.component.html',
  styleUrls: ['./type-enseignement-create-admin.component.css']
})
export class TypeEnseignementCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeEnseignementLibelle = true;
   _validTypeEnseignementCode = true;




constructor(private datePipe: DatePipe, private typeEnseignementService: TypeEnseignementService
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
    this.validTypeEnseignementLibelle = value;
    this.validTypeEnseignementCode = value;
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
     this.typeEnseignementService.save().subscribe(typeEnseignement=>{
       this.typeEnseignements.push({...typeEnseignement});
       this.createTypeEnseignementDialog = false;
       this.submitted = false;
       this.selectedTypeEnseignement = new TypeEnseignementVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeEnseignementLibelle();
this.validateTypeEnseignementCode();

    }

private validateTypeEnseignementLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeEnseignement.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeEnseignementLibelle = false;
        } else {
            this.validTypeEnseignementLibelle = true;
        }
    }
private validateTypeEnseignementCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeEnseignement.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeEnseignementCode = false;
        } else {
            this.validTypeEnseignementCode = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createTypeEnseignementDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeEnseignements(): Array<TypeEnseignementVo> {
    return this.typeEnseignementService.typeEnseignements;
       }
set typeEnseignements(value: Array<TypeEnseignementVo>) {
        this.typeEnseignementService.typeEnseignements = value;
       }

 get selectedTypeEnseignement():TypeEnseignementVo {
           return this.typeEnseignementService.selectedTypeEnseignement;
       }
    set selectedTypeEnseignement(value: TypeEnseignementVo) {
        this.typeEnseignementService.selectedTypeEnseignement = value;
       }

   get createTypeEnseignementDialog(): boolean {
           return this.typeEnseignementService.createTypeEnseignementDialog;

       }
    set createTypeEnseignementDialog(value: boolean) {
        this.typeEnseignementService.createTypeEnseignementDialog= value;
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

    get validTypeEnseignementLibelle(): boolean {
    return this._validTypeEnseignementLibelle;
    }

    set validTypeEnseignementLibelle(value: boolean) {
    this._validTypeEnseignementLibelle = value;
    }
    get validTypeEnseignementCode(): boolean {
    return this._validTypeEnseignementCode;
    }

    set validTypeEnseignementCode(value: boolean) {
    this._validTypeEnseignementCode = value;
    }


}
