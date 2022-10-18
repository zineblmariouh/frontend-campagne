import {Component, OnInit, Input} from '@angular/core';
import {StatusProjetService} from '../../../../../controller/service/StatusProjet.service';
import {StatusProjetVo} from '../../../../../controller/model/StatusProjet.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-status-projet-create-admin',
  templateUrl: './status-projet-create-admin.component.html',
  styleUrls: ['./status-projet-create-admin.component.css']
})
export class StatusProjetCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validStatusProjetLibelle = true;
   _validStatusProjetCode = true;




constructor(private datePipe: DatePipe, private statusProjetService: StatusProjetService
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
    this.validStatusProjetLibelle = value;
    this.validStatusProjetCode = value;
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
     this.statusProjetService.save().subscribe(statusProjet=>{
       this.statusProjets.push({...statusProjet});
       this.createStatusProjetDialog = false;
       this.submitted = false;
       this.selectedStatusProjet = new StatusProjetVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateStatusProjetLibelle();
this.validateStatusProjetCode();

    }

private validateStatusProjetLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedStatusProjet.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validStatusProjetLibelle = false;
        } else {
            this.validStatusProjetLibelle = true;
        }
    }
private validateStatusProjetCode(){
        if (this.stringUtilService.isEmpty(this.selectedStatusProjet.code)) {
            this.errorMessages.push('Code non valide');
            this.validStatusProjetCode = false;
        } else {
            this.validStatusProjetCode = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createStatusProjetDialog  = false;
    this.setValidation(true);
}

// getters and setters

get statusProjets(): Array<StatusProjetVo> {
    return this.statusProjetService.statusProjets;
       }
set statusProjets(value: Array<StatusProjetVo>) {
        this.statusProjetService.statusProjets = value;
       }

 get selectedStatusProjet():StatusProjetVo {
           return this.statusProjetService.selectedStatusProjet;
       }
    set selectedStatusProjet(value: StatusProjetVo) {
        this.statusProjetService.selectedStatusProjet = value;
       }

   get createStatusProjetDialog(): boolean {
           return this.statusProjetService.createStatusProjetDialog;

       }
    set createStatusProjetDialog(value: boolean) {
        this.statusProjetService.createStatusProjetDialog= value;
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

    get validStatusProjetLibelle(): boolean {
    return this._validStatusProjetLibelle;
    }

    set validStatusProjetLibelle(value: boolean) {
    this._validStatusProjetLibelle = value;
    }
    get validStatusProjetCode(): boolean {
    return this._validStatusProjetCode;
    }

    set validStatusProjetCode(value: boolean) {
    this._validStatusProjetCode = value;
    }


}
