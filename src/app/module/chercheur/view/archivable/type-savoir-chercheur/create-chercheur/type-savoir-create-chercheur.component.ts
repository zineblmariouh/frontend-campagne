import {Component, OnInit, Input} from '@angular/core';
import {TypeSavoirService} from '../../../../../controller/service/TypeSavoir.service';
import {TypeSavoirVo} from '../../../../../controller/model/TypeSavoir.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-type-savoir-create-chercheur',
  templateUrl: './type-savoir-create-chercheur.component.html',
  styleUrls: ['./type-savoir-create-chercheur.component.css']
})
export class TypeSavoirCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeSavoirLibelle = true;
   _validTypeSavoirCode = true;




constructor(private datePipe: DatePipe, private typeSavoirService: TypeSavoirService
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
    this.validTypeSavoirLibelle = value;
    this.validTypeSavoirCode = value;
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
     this.typeSavoirService.save().subscribe(typeSavoir=>{
       this.typeSavoirs.push({...typeSavoir});
       this.createTypeSavoirDialog = false;
       this.submitted = false;
       this.selectedTypeSavoir = new TypeSavoirVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeSavoirLibelle();
this.validateTypeSavoirCode();

    }

private validateTypeSavoirLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeSavoir.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeSavoirLibelle = false;
        } else {
            this.validTypeSavoirLibelle = true;
        }
    }
private validateTypeSavoirCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeSavoir.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeSavoirCode = false;
        } else {
            this.validTypeSavoirCode = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createTypeSavoirDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeSavoirs(): Array<TypeSavoirVo> {
    return this.typeSavoirService.typeSavoirs;
       }
set typeSavoirs(value: Array<TypeSavoirVo>) {
        this.typeSavoirService.typeSavoirs = value;
       }

 get selectedTypeSavoir():TypeSavoirVo {
           return this.typeSavoirService.selectedTypeSavoir;
       }
    set selectedTypeSavoir(value: TypeSavoirVo) {
        this.typeSavoirService.selectedTypeSavoir = value;
       }

   get createTypeSavoirDialog(): boolean {
           return this.typeSavoirService.createTypeSavoirDialog;

       }
    set createTypeSavoirDialog(value: boolean) {
        this.typeSavoirService.createTypeSavoirDialog= value;
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

    get validTypeSavoirLibelle(): boolean {
    return this._validTypeSavoirLibelle;
    }

    set validTypeSavoirLibelle(value: boolean) {
    this._validTypeSavoirLibelle = value;
    }
    get validTypeSavoirCode(): boolean {
    return this._validTypeSavoirCode;
    }

    set validTypeSavoirCode(value: boolean) {
    this._validTypeSavoirCode = value;
    }


}
