import {Component, OnInit, Input} from '@angular/core';
import {RoleProjetService} from '../../../../../controller/service/RoleProjet.service';
import {RoleProjetVo} from '../../../../../controller/model/RoleProjet.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-role-projet-create-chercheur',
  templateUrl: './role-projet-create-chercheur.component.html',
  styleUrls: ['./role-projet-create-chercheur.component.css']
})
export class RoleProjetCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validRoleProjetLibelle = true;
   _validRoleProjetCode = true;




constructor(private datePipe: DatePipe, private roleProjetService: RoleProjetService
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
    this.validRoleProjetLibelle = value;
    this.validRoleProjetCode = value;
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
     this.roleProjetService.save().subscribe(roleProjet=>{
       this.roleProjets.push({...roleProjet});
       this.createRoleProjetDialog = false;
       this.submitted = false;
       this.selectedRoleProjet = new RoleProjetVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateRoleProjetLibelle();
this.validateRoleProjetCode();

    }

private validateRoleProjetLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedRoleProjet.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validRoleProjetLibelle = false;
        } else {
            this.validRoleProjetLibelle = true;
        }
    }
private validateRoleProjetCode(){
        if (this.stringUtilService.isEmpty(this.selectedRoleProjet.code)) {
            this.errorMessages.push('Code non valide');
            this.validRoleProjetCode = false;
        } else {
            this.validRoleProjetCode = true;
        }
    }













//openPopup
// methods

hideCreateDialog(){
    this.createRoleProjetDialog  = false;
    this.setValidation(true);
}

// getters and setters

get roleProjets(): Array<RoleProjetVo> {
    return this.roleProjetService.roleProjets;
       }
set roleProjets(value: Array<RoleProjetVo>) {
        this.roleProjetService.roleProjets = value;
       }

 get selectedRoleProjet():RoleProjetVo {
           return this.roleProjetService.selectedRoleProjet;
       }
    set selectedRoleProjet(value: RoleProjetVo) {
        this.roleProjetService.selectedRoleProjet = value;
       }

   get createRoleProjetDialog(): boolean {
           return this.roleProjetService.createRoleProjetDialog;

       }
    set createRoleProjetDialog(value: boolean) {
        this.roleProjetService.createRoleProjetDialog= value;
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

    get validRoleProjetLibelle(): boolean {
    return this._validRoleProjetLibelle;
    }

    set validRoleProjetLibelle(value: boolean) {
    this._validRoleProjetLibelle = value;
    }
    get validRoleProjetCode(): boolean {
    return this._validRoleProjetCode;
    }

    set validRoleProjetCode(value: boolean) {
    this._validRoleProjetCode = value;
    }


}
