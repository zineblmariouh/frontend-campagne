import {Component, OnInit, Input} from '@angular/core';
import {MasterInternationalService} from '../../../../../controller/service/MasterInternational.service';
import {MasterInternationalVo} from '../../../../../controller/model/MasterInternational.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-master-international-create-chercheur',
  templateUrl: './master-international-create-chercheur.component.html',
  styleUrls: ['./master-international-create-chercheur.component.css']
})
export class MasterInternationalCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validMasterInternationalLibelle = true;
   _validMasterInternationalCode = true;




constructor(private datePipe: DatePipe, private masterInternationalService: MasterInternationalService
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
    this.validMasterInternationalLibelle = value;
    this.validMasterInternationalCode = value;
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
     this.masterInternationalService.save().subscribe(masterInternational=>{
       this.masterInternationals.push({...masterInternational});
       this.createMasterInternationalDialog = false;
       this.submitted = false;
       this.selectedMasterInternational = new MasterInternationalVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateMasterInternationalLibelle();
this.validateMasterInternationalCode();

    }

private validateMasterInternationalLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedMasterInternational.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validMasterInternationalLibelle = false;
        } else {
            this.validMasterInternationalLibelle = true;
        }
    }
private validateMasterInternationalCode(){
        if (this.stringUtilService.isEmpty(this.selectedMasterInternational.code)) {
            this.errorMessages.push('Code non valide');
            this.validMasterInternationalCode = false;
        } else {
            this.validMasterInternationalCode = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createMasterInternationalDialog  = false;
    this.setValidation(true);
}

// getters and setters

get masterInternationals(): Array<MasterInternationalVo> {
    return this.masterInternationalService.masterInternationals;
       }
set masterInternationals(value: Array<MasterInternationalVo>) {
        this.masterInternationalService.masterInternationals = value;
       }

 get selectedMasterInternational():MasterInternationalVo {
           return this.masterInternationalService.selectedMasterInternational;
       }
    set selectedMasterInternational(value: MasterInternationalVo) {
        this.masterInternationalService.selectedMasterInternational = value;
       }

   get createMasterInternationalDialog(): boolean {
           return this.masterInternationalService.createMasterInternationalDialog;

       }
    set createMasterInternationalDialog(value: boolean) {
        this.masterInternationalService.createMasterInternationalDialog= value;
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

    get validMasterInternationalLibelle(): boolean {
    return this._validMasterInternationalLibelle;
    }

    set validMasterInternationalLibelle(value: boolean) {
    this._validMasterInternationalLibelle = value;
    }
    get validMasterInternationalCode(): boolean {
    return this._validMasterInternationalCode;
    }

    set validMasterInternationalCode(value: boolean) {
    this._validMasterInternationalCode = value;
    }


}
