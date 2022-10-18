import {Component, OnInit, Input} from '@angular/core';
import {NatureEnseignementService} from '../../../../../controller/service/NatureEnseignement.service';
import {NatureEnseignementVo} from '../../../../../controller/model/NatureEnseignement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-nature-enseignement-create-admin',
  templateUrl: './nature-enseignement-create-admin.component.html',
  styleUrls: ['./nature-enseignement-create-admin.component.css']
})
export class NatureEnseignementCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validNatureEnseignementLibelle = true;
   _validNatureEnseignementCode = true;




constructor(private datePipe: DatePipe, private natureEnseignementService: NatureEnseignementService
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
    this.validNatureEnseignementLibelle = value;
    this.validNatureEnseignementCode = value;
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
     this.natureEnseignementService.save().subscribe(natureEnseignement=>{
       this.natureEnseignements.push({...natureEnseignement});
       this.createNatureEnseignementDialog = false;
       this.submitted = false;
       this.selectedNatureEnseignement = new NatureEnseignementVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateNatureEnseignementLibelle();
this.validateNatureEnseignementCode();

    }

private validateNatureEnseignementLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedNatureEnseignement.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validNatureEnseignementLibelle = false;
        } else {
            this.validNatureEnseignementLibelle = true;
        }
    }
private validateNatureEnseignementCode(){
        if (this.stringUtilService.isEmpty(this.selectedNatureEnseignement.code)) {
            this.errorMessages.push('Code non valide');
            this.validNatureEnseignementCode = false;
        } else {
            this.validNatureEnseignementCode = true;
        }
    }













//openPopup
// methods

hideCreateDialog(){
    this.createNatureEnseignementDialog  = false;
    this.setValidation(true);
}

// getters and setters

get natureEnseignements(): Array<NatureEnseignementVo> {
    return this.natureEnseignementService.natureEnseignements;
       }
set natureEnseignements(value: Array<NatureEnseignementVo>) {
        this.natureEnseignementService.natureEnseignements = value;
       }

 get selectedNatureEnseignement():NatureEnseignementVo {
           return this.natureEnseignementService.selectedNatureEnseignement;
       }
    set selectedNatureEnseignement(value: NatureEnseignementVo) {
        this.natureEnseignementService.selectedNatureEnseignement = value;
       }

   get createNatureEnseignementDialog(): boolean {
           return this.natureEnseignementService.createNatureEnseignementDialog;

       }
    set createNatureEnseignementDialog(value: boolean) {
        this.natureEnseignementService.createNatureEnseignementDialog= value;
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

    get validNatureEnseignementLibelle(): boolean {
    return this._validNatureEnseignementLibelle;
    }

    set validNatureEnseignementLibelle(value: boolean) {
    this._validNatureEnseignementLibelle = value;
    }
    get validNatureEnseignementCode(): boolean {
    return this._validNatureEnseignementCode;
    }

    set validNatureEnseignementCode(value: boolean) {
    this._validNatureEnseignementCode = value;
    }


}
