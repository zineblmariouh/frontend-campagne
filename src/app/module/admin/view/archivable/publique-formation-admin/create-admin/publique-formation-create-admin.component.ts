import {Component, OnInit, Input} from '@angular/core';
import {PubliqueFormationService} from '../../../../../controller/service/PubliqueFormation.service';
import {PubliqueFormationVo} from '../../../../../controller/model/PubliqueFormation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-publique-formation-create-admin',
  templateUrl: './publique-formation-create-admin.component.html',
  styleUrls: ['./publique-formation-create-admin.component.css']
})
export class PubliqueFormationCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validPubliqueFormationLibelle = true;
   _validPubliqueFormationCode = true;




constructor(private datePipe: DatePipe, private publiqueFormationService: PubliqueFormationService
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
    this.validPubliqueFormationLibelle = value;
    this.validPubliqueFormationCode = value;
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
     this.publiqueFormationService.save().subscribe(publiqueFormation=>{
       this.publiqueFormations.push({...publiqueFormation});
       this.createPubliqueFormationDialog = false;
       this.submitted = false;
       this.selectedPubliqueFormation = new PubliqueFormationVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validatePubliqueFormationLibelle();
this.validatePubliqueFormationCode();

    }

private validatePubliqueFormationLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedPubliqueFormation.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validPubliqueFormationLibelle = false;
        } else {
            this.validPubliqueFormationLibelle = true;
        }
    }
private validatePubliqueFormationCode(){
        if (this.stringUtilService.isEmpty(this.selectedPubliqueFormation.code)) {
            this.errorMessages.push('Code non valide');
            this.validPubliqueFormationCode = false;
        } else {
            this.validPubliqueFormationCode = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createPubliqueFormationDialog  = false;
    this.setValidation(true);
}

// getters and setters

get publiqueFormations(): Array<PubliqueFormationVo> {
    return this.publiqueFormationService.publiqueFormations;
       }
set publiqueFormations(value: Array<PubliqueFormationVo>) {
        this.publiqueFormationService.publiqueFormations = value;
       }

 get selectedPubliqueFormation():PubliqueFormationVo {
           return this.publiqueFormationService.selectedPubliqueFormation;
       }
    set selectedPubliqueFormation(value: PubliqueFormationVo) {
        this.publiqueFormationService.selectedPubliqueFormation = value;
       }

   get createPubliqueFormationDialog(): boolean {
           return this.publiqueFormationService.createPubliqueFormationDialog;

       }
    set createPubliqueFormationDialog(value: boolean) {
        this.publiqueFormationService.createPubliqueFormationDialog= value;
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

    get validPubliqueFormationLibelle(): boolean {
    return this._validPubliqueFormationLibelle;
    }

    set validPubliqueFormationLibelle(value: boolean) {
    this._validPubliqueFormationLibelle = value;
    }
    get validPubliqueFormationCode(): boolean {
    return this._validPubliqueFormationCode;
    }

    set validPubliqueFormationCode(value: boolean) {
    this._validPubliqueFormationCode = value;
    }


}
