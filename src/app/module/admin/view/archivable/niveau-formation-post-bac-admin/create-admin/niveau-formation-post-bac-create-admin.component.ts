import {Component, OnInit, Input} from '@angular/core';
import {NiveauFormationPostBacService} from '../../../../../controller/service/NiveauFormationPostBac.service';
import {NiveauFormationPostBacVo} from '../../../../../controller/model/NiveauFormationPostBac.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-niveau-formation-post-bac-create-admin',
  templateUrl: './niveau-formation-post-bac-create-admin.component.html',
  styleUrls: ['./niveau-formation-post-bac-create-admin.component.css']
})
export class NiveauFormationPostBacCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validNiveauFormationPostBacCode = true;
   _validNiveauFormationPostBacLibelle = true;




constructor(private datePipe: DatePipe, private niveauFormationPostBacService: NiveauFormationPostBacService
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
    this.validNiveauFormationPostBacCode = value;
    this.validNiveauFormationPostBacLibelle = value;
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
     this.niveauFormationPostBacService.save().subscribe(niveauFormationPostBac=>{
       this.niveauFormationPostBacs.push({...niveauFormationPostBac});
       this.createNiveauFormationPostBacDialog = false;
       this.submitted = false;
       this.selectedNiveauFormationPostBac = new NiveauFormationPostBacVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateNiveauFormationPostBacCode();
this.validateNiveauFormationPostBacLibelle();

    }

private validateNiveauFormationPostBacCode(){
        if (this.stringUtilService.isEmpty(this.selectedNiveauFormationPostBac.code)) {
            this.errorMessages.push('Code non valide');
            this.validNiveauFormationPostBacCode = false;
        } else {
            this.validNiveauFormationPostBacCode = true;
        }
    }
private validateNiveauFormationPostBacLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedNiveauFormationPostBac.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validNiveauFormationPostBacLibelle = false;
        } else {
            this.validNiveauFormationPostBacLibelle = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createNiveauFormationPostBacDialog  = false;
    this.setValidation(true);
}

// getters and setters

get niveauFormationPostBacs(): Array<NiveauFormationPostBacVo> {
    return this.niveauFormationPostBacService.niveauFormationPostBacs;
       }
set niveauFormationPostBacs(value: Array<NiveauFormationPostBacVo>) {
        this.niveauFormationPostBacService.niveauFormationPostBacs = value;
       }

 get selectedNiveauFormationPostBac():NiveauFormationPostBacVo {
           return this.niveauFormationPostBacService.selectedNiveauFormationPostBac;
       }
    set selectedNiveauFormationPostBac(value: NiveauFormationPostBacVo) {
        this.niveauFormationPostBacService.selectedNiveauFormationPostBac = value;
       }

   get createNiveauFormationPostBacDialog(): boolean {
           return this.niveauFormationPostBacService.createNiveauFormationPostBacDialog;

       }
    set createNiveauFormationPostBacDialog(value: boolean) {
        this.niveauFormationPostBacService.createNiveauFormationPostBacDialog= value;
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

    get validNiveauFormationPostBacCode(): boolean {
    return this._validNiveauFormationPostBacCode;
    }

    set validNiveauFormationPostBacCode(value: boolean) {
    this._validNiveauFormationPostBacCode = value;
    }
    get validNiveauFormationPostBacLibelle(): boolean {
    return this._validNiveauFormationPostBacLibelle;
    }

    set validNiveauFormationPostBacLibelle(value: boolean) {
    this._validNiveauFormationPostBacLibelle = value;
    }


}
