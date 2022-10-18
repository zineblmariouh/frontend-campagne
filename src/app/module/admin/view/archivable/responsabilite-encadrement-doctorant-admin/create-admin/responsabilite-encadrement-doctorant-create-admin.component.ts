import {Component, OnInit, Input} from '@angular/core';
import {ResponsabiliteEncadrementDoctorantService} from '../../../../../controller/service/ResponsabiliteEncadrementDoctorant.service';
import {ResponsabiliteEncadrementDoctorantVo} from '../../../../../controller/model/ResponsabiliteEncadrementDoctorant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-responsabilite-encadrement-doctorant-create-admin',
  templateUrl: './responsabilite-encadrement-doctorant-create-admin.component.html',
  styleUrls: ['./responsabilite-encadrement-doctorant-create-admin.component.css']
})
export class ResponsabiliteEncadrementDoctorantCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validResponsabiliteEncadrementDoctorantLibelle = true;
   _validResponsabiliteEncadrementDoctorantCode = true;




constructor(private datePipe: DatePipe, private responsabiliteEncadrementDoctorantService: ResponsabiliteEncadrementDoctorantService
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
    this.validResponsabiliteEncadrementDoctorantLibelle = value;
    this.validResponsabiliteEncadrementDoctorantCode = value;
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
     this.responsabiliteEncadrementDoctorantService.save().subscribe(responsabiliteEncadrementDoctorant=>{
       this.responsabiliteEncadrementDoctorants.push({...responsabiliteEncadrementDoctorant});
       this.createResponsabiliteEncadrementDoctorantDialog = false;
       this.submitted = false;
       this.selectedResponsabiliteEncadrementDoctorant = new ResponsabiliteEncadrementDoctorantVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateResponsabiliteEncadrementDoctorantLibelle();
this.validateResponsabiliteEncadrementDoctorantCode();

    }

private validateResponsabiliteEncadrementDoctorantLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedResponsabiliteEncadrementDoctorant.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validResponsabiliteEncadrementDoctorantLibelle = false;
        } else {
            this.validResponsabiliteEncadrementDoctorantLibelle = true;
        }
    }
private validateResponsabiliteEncadrementDoctorantCode(){
        if (this.stringUtilService.isEmpty(this.selectedResponsabiliteEncadrementDoctorant.code)) {
            this.errorMessages.push('Code non valide');
            this.validResponsabiliteEncadrementDoctorantCode = false;
        } else {
            this.validResponsabiliteEncadrementDoctorantCode = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createResponsabiliteEncadrementDoctorantDialog  = false;
    this.setValidation(true);
}

// getters and setters

get responsabiliteEncadrementDoctorants(): Array<ResponsabiliteEncadrementDoctorantVo> {
    return this.responsabiliteEncadrementDoctorantService.responsabiliteEncadrementDoctorants;
       }
set responsabiliteEncadrementDoctorants(value: Array<ResponsabiliteEncadrementDoctorantVo>) {
        this.responsabiliteEncadrementDoctorantService.responsabiliteEncadrementDoctorants = value;
       }

 get selectedResponsabiliteEncadrementDoctorant():ResponsabiliteEncadrementDoctorantVo {
           return this.responsabiliteEncadrementDoctorantService.selectedResponsabiliteEncadrementDoctorant;
       }
    set selectedResponsabiliteEncadrementDoctorant(value: ResponsabiliteEncadrementDoctorantVo) {
        this.responsabiliteEncadrementDoctorantService.selectedResponsabiliteEncadrementDoctorant = value;
       }

   get createResponsabiliteEncadrementDoctorantDialog(): boolean {
           return this.responsabiliteEncadrementDoctorantService.createResponsabiliteEncadrementDoctorantDialog;

       }
    set createResponsabiliteEncadrementDoctorantDialog(value: boolean) {
        this.responsabiliteEncadrementDoctorantService.createResponsabiliteEncadrementDoctorantDialog= value;
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

    get validResponsabiliteEncadrementDoctorantLibelle(): boolean {
    return this._validResponsabiliteEncadrementDoctorantLibelle;
    }

    set validResponsabiliteEncadrementDoctorantLibelle(value: boolean) {
    this._validResponsabiliteEncadrementDoctorantLibelle = value;
    }
    get validResponsabiliteEncadrementDoctorantCode(): boolean {
    return this._validResponsabiliteEncadrementDoctorantCode;
    }

    set validResponsabiliteEncadrementDoctorantCode(value: boolean) {
    this._validResponsabiliteEncadrementDoctorantCode = value;
    }


}
