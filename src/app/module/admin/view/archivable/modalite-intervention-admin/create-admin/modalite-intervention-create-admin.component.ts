import {Component, OnInit, Input} from '@angular/core';
import {ModaliteInterventionService} from '../../../../../controller/service/ModaliteIntervention.service';
import {ModaliteInterventionVo} from '../../../../../controller/model/ModaliteIntervention.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-modalite-intervention-create-admin',
  templateUrl: './modalite-intervention-create-admin.component.html',
  styleUrls: ['./modalite-intervention-create-admin.component.css']
})
export class ModaliteInterventionCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validModaliteInterventionLibelle = true;
   _validModaliteInterventionCode = true;




constructor(private datePipe: DatePipe, private modaliteInterventionService: ModaliteInterventionService
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
    this.validModaliteInterventionLibelle = value;
    this.validModaliteInterventionCode = value;
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
     this.modaliteInterventionService.save().subscribe(modaliteIntervention=>{
       this.modaliteInterventions.push({...modaliteIntervention});
       this.createModaliteInterventionDialog = false;
       this.submitted = false;
       this.selectedModaliteIntervention = new ModaliteInterventionVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateModaliteInterventionLibelle();
this.validateModaliteInterventionCode();

    }

private validateModaliteInterventionLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedModaliteIntervention.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validModaliteInterventionLibelle = false;
        } else {
            this.validModaliteInterventionLibelle = true;
        }
    }
private validateModaliteInterventionCode(){
        if (this.stringUtilService.isEmpty(this.selectedModaliteIntervention.code)) {
            this.errorMessages.push('Code non valide');
            this.validModaliteInterventionCode = false;
        } else {
            this.validModaliteInterventionCode = true;
        }
    }













//openPopup
// methods

hideCreateDialog(){
    this.createModaliteInterventionDialog  = false;
    this.setValidation(true);
}

// getters and setters

get modaliteInterventions(): Array<ModaliteInterventionVo> {
    return this.modaliteInterventionService.modaliteInterventions;
       }
set modaliteInterventions(value: Array<ModaliteInterventionVo>) {
        this.modaliteInterventionService.modaliteInterventions = value;
       }

 get selectedModaliteIntervention():ModaliteInterventionVo {
           return this.modaliteInterventionService.selectedModaliteIntervention;
       }
    set selectedModaliteIntervention(value: ModaliteInterventionVo) {
        this.modaliteInterventionService.selectedModaliteIntervention = value;
       }

   get createModaliteInterventionDialog(): boolean {
           return this.modaliteInterventionService.createModaliteInterventionDialog;

       }
    set createModaliteInterventionDialog(value: boolean) {
        this.modaliteInterventionService.createModaliteInterventionDialog= value;
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

    get validModaliteInterventionLibelle(): boolean {
    return this._validModaliteInterventionLibelle;
    }

    set validModaliteInterventionLibelle(value: boolean) {
    this._validModaliteInterventionLibelle = value;
    }
    get validModaliteInterventionCode(): boolean {
    return this._validModaliteInterventionCode;
    }

    set validModaliteInterventionCode(value: boolean) {
    this._validModaliteInterventionCode = value;
    }


}
