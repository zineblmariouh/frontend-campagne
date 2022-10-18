import {Component, OnInit, Input} from '@angular/core';
import {AffectationStructurelleService} from '../../../../../controller/service/AffectationStructurelle.service';
import {AffectationStructurelleVo} from '../../../../../controller/model/AffectationStructurelle.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-affectation-structurelle-create-chercheur',
  templateUrl: './affectation-structurelle-create-chercheur.component.html',
  styleUrls: ['./affectation-structurelle-create-chercheur.component.css']
})
export class AffectationStructurelleCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validAffectationStructurelleCode = true;
   _validAffectationStructurelleLibelleCourt = true;
   _validAffectationStructurelleLibelleLong = true;




constructor(private datePipe: DatePipe, private affectationStructurelleService: AffectationStructurelleService
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
    this.validAffectationStructurelleCode = value;
    this.validAffectationStructurelleLibelleCourt = value;
    this.validAffectationStructurelleLibelleLong = value;
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
     this.affectationStructurelleService.save().subscribe(affectationStructurelle=>{
       this.affectationStructurelles.push({...affectationStructurelle});
       this.createAffectationStructurelleDialog = false;
       this.submitted = false;
       this.selectedAffectationStructurelle = new AffectationStructurelleVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateAffectationStructurelleCode();
this.validateAffectationStructurelleLibelleCourt();
this.validateAffectationStructurelleLibelleLong();

    }

private validateAffectationStructurelleCode(){
        if (this.stringUtilService.isEmpty(this.selectedAffectationStructurelle.code)) {
            this.errorMessages.push('Code non valide');
            this.validAffectationStructurelleCode = false;
        } else {
            this.validAffectationStructurelleCode = true;
        }
    }
private validateAffectationStructurelleLibelleCourt(){
        if (this.stringUtilService.isEmpty(this.selectedAffectationStructurelle.libelleCourt)) {
            this.errorMessages.push('Libelle court non valide');
            this.validAffectationStructurelleLibelleCourt = false;
        } else {
            this.validAffectationStructurelleLibelleCourt = true;
        }
    }
private validateAffectationStructurelleLibelleLong(){
        if (this.stringUtilService.isEmpty(this.selectedAffectationStructurelle.libelleLong)) {
            this.errorMessages.push('Libelle long non valide');
            this.validAffectationStructurelleLibelleLong = false;
        } else {
            this.validAffectationStructurelleLibelleLong = true;
        }
    }







//openPopup
// methods

hideCreateDialog(){
    this.createAffectationStructurelleDialog  = false;
    this.setValidation(true);
}

// getters and setters

get affectationStructurelles(): Array<AffectationStructurelleVo> {
    return this.affectationStructurelleService.affectationStructurelles;
       }
set affectationStructurelles(value: Array<AffectationStructurelleVo>) {
        this.affectationStructurelleService.affectationStructurelles = value;
       }

 get selectedAffectationStructurelle():AffectationStructurelleVo {
           return this.affectationStructurelleService.selectedAffectationStructurelle;
       }
    set selectedAffectationStructurelle(value: AffectationStructurelleVo) {
        this.affectationStructurelleService.selectedAffectationStructurelle = value;
       }

   get createAffectationStructurelleDialog(): boolean {
           return this.affectationStructurelleService.createAffectationStructurelleDialog;

       }
    set createAffectationStructurelleDialog(value: boolean) {
        this.affectationStructurelleService.createAffectationStructurelleDialog= value;
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

    get validAffectationStructurelleCode(): boolean {
    return this._validAffectationStructurelleCode;
    }

    set validAffectationStructurelleCode(value: boolean) {
    this._validAffectationStructurelleCode = value;
    }
    get validAffectationStructurelleLibelleCourt(): boolean {
    return this._validAffectationStructurelleLibelleCourt;
    }

    set validAffectationStructurelleLibelleCourt(value: boolean) {
    this._validAffectationStructurelleLibelleCourt = value;
    }
    get validAffectationStructurelleLibelleLong(): boolean {
    return this._validAffectationStructurelleLibelleLong;
    }

    set validAffectationStructurelleLibelleLong(value: boolean) {
    this._validAffectationStructurelleLibelleLong = value;
    }


}
