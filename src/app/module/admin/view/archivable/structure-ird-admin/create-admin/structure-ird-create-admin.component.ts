import {Component, OnInit, Input} from '@angular/core';
import {StructureIrdService} from '../../../../../controller/service/StructureIrd.service';
import {StructureIrdVo} from '../../../../../controller/model/StructureIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-structure-ird-create-admin',
  templateUrl: './structure-ird-create-admin.component.html',
  styleUrls: ['./structure-ird-create-admin.component.css']
})
export class StructureIrdCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validStructureIrdLibelle = true;
   _validStructureIrdCode = true;




constructor(private datePipe: DatePipe, private structureIrdService: StructureIrdService
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
    this.validStructureIrdLibelle = value;
    this.validStructureIrdCode = value;
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
     this.structureIrdService.save().subscribe(structureIrd=>{
       this.structureIrds.push({...structureIrd});
       this.createStructureIrdDialog = false;
       this.submitted = false;
       this.selectedStructureIrd = new StructureIrdVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateStructureIrdLibelle();
this.validateStructureIrdCode();

    }

private validateStructureIrdLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedStructureIrd.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validStructureIrdLibelle = false;
        } else {
            this.validStructureIrdLibelle = true;
        }
    }
private validateStructureIrdCode(){
        if (this.stringUtilService.isEmpty(this.selectedStructureIrd.code)) {
            this.errorMessages.push('Code non valide');
            this.validStructureIrdCode = false;
        } else {
            this.validStructureIrdCode = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createStructureIrdDialog  = false;
    this.setValidation(true);
}

// getters and setters

get structureIrds(): Array<StructureIrdVo> {
    return this.structureIrdService.structureIrds;
       }
set structureIrds(value: Array<StructureIrdVo>) {
        this.structureIrdService.structureIrds = value;
       }

 get selectedStructureIrd():StructureIrdVo {
           return this.structureIrdService.selectedStructureIrd;
       }
    set selectedStructureIrd(value: StructureIrdVo) {
        this.structureIrdService.selectedStructureIrd = value;
       }

   get createStructureIrdDialog(): boolean {
           return this.structureIrdService.createStructureIrdDialog;

       }
    set createStructureIrdDialog(value: boolean) {
        this.structureIrdService.createStructureIrdDialog= value;
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

    get validStructureIrdLibelle(): boolean {
    return this._validStructureIrdLibelle;
    }

    set validStructureIrdLibelle(value: boolean) {
    this._validStructureIrdLibelle = value;
    }
    get validStructureIrdCode(): boolean {
    return this._validStructureIrdCode;
    }

    set validStructureIrdCode(value: boolean) {
    this._validStructureIrdCode = value;
    }


}
