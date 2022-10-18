import {Component, OnInit, Input} from '@angular/core';
import {TypeParticipationService} from '../../../../../controller/service/TypeParticipation.service';
import {TypeParticipationVo} from '../../../../../controller/model/TypeParticipation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-type-participation-create-admin',
  templateUrl: './type-participation-create-admin.component.html',
  styleUrls: ['./type-participation-create-admin.component.css']
})
export class TypeParticipationCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeParticipationLibelle = true;




constructor(private datePipe: DatePipe, private typeParticipationService: TypeParticipationService
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
    this.validTypeParticipationLibelle = value;
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
     this.typeParticipationService.save().subscribe(typeParticipation=>{
       this.typeParticipations.push({...typeParticipation});
       this.createTypeParticipationDialog = false;
       this.submitted = false;
       this.selectedTypeParticipation = new TypeParticipationVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeParticipationLibelle();

    }

private validateTypeParticipationLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeParticipation.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeParticipationLibelle = false;
        } else {
            this.validTypeParticipationLibelle = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createTypeParticipationDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeParticipations(): Array<TypeParticipationVo> {
    return this.typeParticipationService.typeParticipations;
       }
set typeParticipations(value: Array<TypeParticipationVo>) {
        this.typeParticipationService.typeParticipations = value;
       }

 get selectedTypeParticipation():TypeParticipationVo {
           return this.typeParticipationService.selectedTypeParticipation;
       }
    set selectedTypeParticipation(value: TypeParticipationVo) {
        this.typeParticipationService.selectedTypeParticipation = value;
       }

   get createTypeParticipationDialog(): boolean {
           return this.typeParticipationService.createTypeParticipationDialog;

       }
    set createTypeParticipationDialog(value: boolean) {
        this.typeParticipationService.createTypeParticipationDialog= value;
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

    get validTypeParticipationLibelle(): boolean {
    return this._validTypeParticipationLibelle;
    }

    set validTypeParticipationLibelle(value: boolean) {
    this._validTypeParticipationLibelle = value;
    }


}
