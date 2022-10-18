import {Component, OnInit, Input} from '@angular/core';
import {TypeExpertiseService} from '../../../../../controller/service/TypeExpertise.service';
import {TypeExpertiseVo} from '../../../../../controller/model/TypeExpertise.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-type-expertise-create-chercheur',
  templateUrl: './type-expertise-create-chercheur.component.html',
  styleUrls: ['./type-expertise-create-chercheur.component.css']
})
export class TypeExpertiseCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeExpertiseLibelle = true;
   _validTypeExpertiseCode = true;




constructor(private datePipe: DatePipe, private typeExpertiseService: TypeExpertiseService
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
    this.validTypeExpertiseLibelle = value;
    this.validTypeExpertiseCode = value;
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
     this.typeExpertiseService.save().subscribe(typeExpertise=>{
       this.typeExpertises.push({...typeExpertise});
       this.createTypeExpertiseDialog = false;
       this.submitted = false;
       this.selectedTypeExpertise = new TypeExpertiseVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeExpertiseLibelle();
this.validateTypeExpertiseCode();

    }

private validateTypeExpertiseLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeExpertise.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeExpertiseLibelle = false;
        } else {
            this.validTypeExpertiseLibelle = true;
        }
    }
private validateTypeExpertiseCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeExpertise.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeExpertiseCode = false;
        } else {
            this.validTypeExpertiseCode = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createTypeExpertiseDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeExpertises(): Array<TypeExpertiseVo> {
    return this.typeExpertiseService.typeExpertises;
       }
set typeExpertises(value: Array<TypeExpertiseVo>) {
        this.typeExpertiseService.typeExpertises = value;
       }

 get selectedTypeExpertise():TypeExpertiseVo {
           return this.typeExpertiseService.selectedTypeExpertise;
       }
    set selectedTypeExpertise(value: TypeExpertiseVo) {
        this.typeExpertiseService.selectedTypeExpertise = value;
       }

   get createTypeExpertiseDialog(): boolean {
           return this.typeExpertiseService.createTypeExpertiseDialog;

       }
    set createTypeExpertiseDialog(value: boolean) {
        this.typeExpertiseService.createTypeExpertiseDialog= value;
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

    get validTypeExpertiseLibelle(): boolean {
    return this._validTypeExpertiseLibelle;
    }

    set validTypeExpertiseLibelle(value: boolean) {
    this._validTypeExpertiseLibelle = value;
    }
    get validTypeExpertiseCode(): boolean {
    return this._validTypeExpertiseCode;
    }

    set validTypeExpertiseCode(value: boolean) {
    this._validTypeExpertiseCode = value;
    }


}
