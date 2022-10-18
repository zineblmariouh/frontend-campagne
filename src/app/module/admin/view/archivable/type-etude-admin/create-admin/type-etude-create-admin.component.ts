import {Component, OnInit, Input} from '@angular/core';
import {TypeEtudeService} from '../../../../../controller/service/TypeEtude.service';
import {TypeEtudeVo} from '../../../../../controller/model/TypeEtude.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-type-etude-create-admin',
  templateUrl: './type-etude-create-admin.component.html',
  styleUrls: ['./type-etude-create-admin.component.css']
})
export class TypeEtudeCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeEtudeLibelle = true;
   _validTypeEtudeCode = true;




constructor(private datePipe: DatePipe, private typeEtudeService: TypeEtudeService
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
    this.validTypeEtudeLibelle = value;
    this.validTypeEtudeCode = value;
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
     this.typeEtudeService.save().subscribe(typeEtude=>{
       this.typeEtudes.push({...typeEtude});
       this.createTypeEtudeDialog = false;
       this.submitted = false;
       this.selectedTypeEtude = new TypeEtudeVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeEtudeLibelle();
this.validateTypeEtudeCode();

    }

private validateTypeEtudeLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeEtude.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeEtudeLibelle = false;
        } else {
            this.validTypeEtudeLibelle = true;
        }
    }
private validateTypeEtudeCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeEtude.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeEtudeCode = false;
        } else {
            this.validTypeEtudeCode = true;
        }
    }













//openPopup
// methods

hideCreateDialog(){
    this.createTypeEtudeDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeEtudes(): Array<TypeEtudeVo> {
    return this.typeEtudeService.typeEtudes;
       }
set typeEtudes(value: Array<TypeEtudeVo>) {
        this.typeEtudeService.typeEtudes = value;
       }

 get selectedTypeEtude():TypeEtudeVo {
           return this.typeEtudeService.selectedTypeEtude;
       }
    set selectedTypeEtude(value: TypeEtudeVo) {
        this.typeEtudeService.selectedTypeEtude = value;
       }

   get createTypeEtudeDialog(): boolean {
           return this.typeEtudeService.createTypeEtudeDialog;

       }
    set createTypeEtudeDialog(value: boolean) {
        this.typeEtudeService.createTypeEtudeDialog= value;
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

    get validTypeEtudeLibelle(): boolean {
    return this._validTypeEtudeLibelle;
    }

    set validTypeEtudeLibelle(value: boolean) {
    this._validTypeEtudeLibelle = value;
    }
    get validTypeEtudeCode(): boolean {
    return this._validTypeEtudeCode;
    }

    set validTypeEtudeCode(value: boolean) {
    this._validTypeEtudeCode = value;
    }


}
