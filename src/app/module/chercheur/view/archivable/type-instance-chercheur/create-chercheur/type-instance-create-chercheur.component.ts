import {Component, OnInit, Input} from '@angular/core';
import {TypeInstanceService} from '../../../../../controller/service/TypeInstance.service';
import {TypeInstanceVo} from '../../../../../controller/model/TypeInstance.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-type-instance-create-chercheur',
  templateUrl: './type-instance-create-chercheur.component.html',
  styleUrls: ['./type-instance-create-chercheur.component.css']
})
export class TypeInstanceCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeInstanceCode = true;
   _validTypeInstanceLibelle = true;




constructor(private datePipe: DatePipe, private typeInstanceService: TypeInstanceService
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
    this.validTypeInstanceCode = value;
    this.validTypeInstanceLibelle = value;
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
     this.typeInstanceService.save().subscribe(typeInstance=>{
       this.typeInstances.push({...typeInstance});
       this.createTypeInstanceDialog = false;
       this.submitted = false;
       this.selectedTypeInstance = new TypeInstanceVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeInstanceCode();
this.validateTypeInstanceLibelle();

    }

private validateTypeInstanceCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeInstance.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeInstanceCode = false;
        } else {
            this.validTypeInstanceCode = true;
        }
    }
private validateTypeInstanceLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeInstance.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeInstanceLibelle = false;
        } else {
            this.validTypeInstanceLibelle = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createTypeInstanceDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeInstances(): Array<TypeInstanceVo> {
    return this.typeInstanceService.typeInstances;
       }
set typeInstances(value: Array<TypeInstanceVo>) {
        this.typeInstanceService.typeInstances = value;
       }

 get selectedTypeInstance():TypeInstanceVo {
           return this.typeInstanceService.selectedTypeInstance;
       }
    set selectedTypeInstance(value: TypeInstanceVo) {
        this.typeInstanceService.selectedTypeInstance = value;
       }

   get createTypeInstanceDialog(): boolean {
           return this.typeInstanceService.createTypeInstanceDialog;

       }
    set createTypeInstanceDialog(value: boolean) {
        this.typeInstanceService.createTypeInstanceDialog= value;
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

    get validTypeInstanceCode(): boolean {
    return this._validTypeInstanceCode;
    }

    set validTypeInstanceCode(value: boolean) {
    this._validTypeInstanceCode = value;
    }
    get validTypeInstanceLibelle(): boolean {
    return this._validTypeInstanceLibelle;
    }

    set validTypeInstanceLibelle(value: boolean) {
    this._validTypeInstanceLibelle = value;
    }


}
