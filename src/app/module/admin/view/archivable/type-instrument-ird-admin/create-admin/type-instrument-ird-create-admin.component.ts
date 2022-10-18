import {Component, OnInit, Input} from '@angular/core';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';
import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-type-instrument-ird-create-admin',
  templateUrl: './type-instrument-ird-create-admin.component.html',
  styleUrls: ['./type-instrument-ird-create-admin.component.css']
})
export class TypeInstrumentIrdCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeInstrumentIrdCode = true;
   _validTypeInstrumentIrdLibelle = true;




constructor(private datePipe: DatePipe, private typeInstrumentIrdService: TypeInstrumentIrdService
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
    this.validTypeInstrumentIrdCode = value;
    this.validTypeInstrumentIrdLibelle = value;
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
     this.typeInstrumentIrdService.save().subscribe(typeInstrumentIrd=>{
       this.typeInstrumentIrds.push({...typeInstrumentIrd});
       this.createTypeInstrumentIrdDialog = false;
       this.submitted = false;
       this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeInstrumentIrdCode();
this.validateTypeInstrumentIrdLibelle();

    }

private validateTypeInstrumentIrdCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeInstrumentIrd.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeInstrumentIrdCode = false;
        } else {
            this.validTypeInstrumentIrdCode = true;
        }
    }
private validateTypeInstrumentIrdLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeInstrumentIrd.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeInstrumentIrdLibelle = false;
        } else {
            this.validTypeInstrumentIrdLibelle = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createTypeInstrumentIrdDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeInstrumentIrds(): Array<TypeInstrumentIrdVo> {
    return this.typeInstrumentIrdService.typeInstrumentIrds;
       }
set typeInstrumentIrds(value: Array<TypeInstrumentIrdVo>) {
        this.typeInstrumentIrdService.typeInstrumentIrds = value;
       }

 get selectedTypeInstrumentIrd():TypeInstrumentIrdVo {
           return this.typeInstrumentIrdService.selectedTypeInstrumentIrd;
       }
    set selectedTypeInstrumentIrd(value: TypeInstrumentIrdVo) {
        this.typeInstrumentIrdService.selectedTypeInstrumentIrd = value;
       }

   get createTypeInstrumentIrdDialog(): boolean {
           return this.typeInstrumentIrdService.createTypeInstrumentIrdDialog;

       }
    set createTypeInstrumentIrdDialog(value: boolean) {
        this.typeInstrumentIrdService.createTypeInstrumentIrdDialog= value;
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

    get validTypeInstrumentIrdCode(): boolean {
    return this._validTypeInstrumentIrdCode;
    }

    set validTypeInstrumentIrdCode(value: boolean) {
    this._validTypeInstrumentIrdCode = value;
    }
    get validTypeInstrumentIrdLibelle(): boolean {
    return this._validTypeInstrumentIrdLibelle;
    }

    set validTypeInstrumentIrdLibelle(value: boolean) {
    this._validTypeInstrumentIrdLibelle = value;
    }


}
