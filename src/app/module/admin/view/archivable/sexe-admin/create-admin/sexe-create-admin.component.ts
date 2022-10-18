import {Component, OnInit, Input} from '@angular/core';
import {SexeService} from '../../../../../controller/service/Sexe.service';
import {SexeVo} from '../../../../../controller/model/Sexe.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-sexe-create-admin',
  templateUrl: './sexe-create-admin.component.html',
  styleUrls: ['./sexe-create-admin.component.css']
})
export class SexeCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validSexeLibelle = true;




constructor(private datePipe: DatePipe, private sexeService: SexeService
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
    this.validSexeLibelle = value;
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
     this.sexeService.save().subscribe(sexe=>{
       this.sexes.push({...sexe});
       this.createSexeDialog = false;
       this.submitted = false;
       this.selectedSexe = new SexeVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateSexeLibelle();

    }

private validateSexeLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedSexe.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validSexeLibelle = false;
        } else {
            this.validSexeLibelle = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createSexeDialog  = false;
    this.setValidation(true);
}

// getters and setters

get sexes(): Array<SexeVo> {
    return this.sexeService.sexes;
       }
set sexes(value: Array<SexeVo>) {
        this.sexeService.sexes = value;
       }

 get selectedSexe():SexeVo {
           return this.sexeService.selectedSexe;
       }
    set selectedSexe(value: SexeVo) {
        this.sexeService.selectedSexe = value;
       }

   get createSexeDialog(): boolean {
           return this.sexeService.createSexeDialog;

       }
    set createSexeDialog(value: boolean) {
        this.sexeService.createSexeDialog= value;
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

    get validSexeLibelle(): boolean {
    return this._validSexeLibelle;
    }

    set validSexeLibelle(value: boolean) {
    this._validSexeLibelle = value;
    }


}
