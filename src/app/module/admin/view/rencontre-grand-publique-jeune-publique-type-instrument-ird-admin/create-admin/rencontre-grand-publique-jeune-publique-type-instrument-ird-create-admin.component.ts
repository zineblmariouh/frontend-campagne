import {Component, OnInit, Input} from '@angular/core';
import {RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.service';
import {RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';
@Component({
  selector: 'app-rencontre-grand-publique-jeune-publique-type-instrument-ird-create-admin',
  templateUrl: './rencontre-grand-publique-jeune-publique-type-instrument-ird-create-admin.component.html',
  styleUrls: ['./rencontre-grand-publique-jeune-publique-type-instrument-ird-create-admin.component.css']
})
export class RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validTypeInstrumentIrdCode = true;
    _validTypeInstrumentIrdLibelle = true;



constructor(private datePipe: DatePipe, private rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService: RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private rencontreGrandPubliqueJeunePubliqueService :RencontreGrandPubliqueJeunePubliqueService
,       private typeInstrumentIrdService :TypeInstrumentIrdService
) {

}


// methods
ngOnInit(): void {

    this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();
    this.typeInstrumentIrdService.findAll().subscribe((data) => this.typeInstrumentIrds = data);
    this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
    this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe((data) => this.rencontreGrandPubliqueJeunePubliques = data);
}




private setValidation(value : boolean){
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
     this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.save().subscribe(rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd=>{
       this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds.push({...rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd});
       this.createRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog = false;
       this.submitted = false;
       this.selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd = new RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreatetypeInstrumentIrd(typeInstrumentIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrd', 'add');
                       if(isPermistted){
         this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();
        this.createTypeInstrumentIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreaterencontreGrandPubliqueJeunePublique(rencontreGrandPubliqueJeunePublique: string) {
                      const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePublique', 'add');
                       if(isPermistted){
         this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
        this.createRencontreGrandPubliqueJeunePubliqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog  = false;
    this.setValidation(true);
}

// getters and setters

get rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds(): Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo> {
    return this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds;
       }
set rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds(value: Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo>) {
        this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds = value;
       }

 get selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd():RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo {
           return this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd;
       }
    set selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd(value: RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo) {
        this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd = value;
       }

   get createRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog(): boolean {
           return this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.createRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog;

       }
    set createRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.createRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog= value;
       }

       get selectedTypeInstrumentIrd(): TypeInstrumentIrdVo {
           return this.typeInstrumentIrdService.selectedTypeInstrumentIrd;
       }
      set selectedTypeInstrumentIrd(value: TypeInstrumentIrdVo) {
        this.typeInstrumentIrdService.selectedTypeInstrumentIrd = value;
       }
       get typeInstrumentIrds(): Array<TypeInstrumentIrdVo> {
           return this.typeInstrumentIrdService.typeInstrumentIrds;
       }
       set typeInstrumentIrds(value: Array<TypeInstrumentIrdVo>) {
        this.typeInstrumentIrdService.typeInstrumentIrds = value;
       }
       get createTypeInstrumentIrdDialog(): boolean {
           return this.typeInstrumentIrdService.createTypeInstrumentIrdDialog;
       }
      set createTypeInstrumentIrdDialog(value: boolean) {
        this.typeInstrumentIrdService.createTypeInstrumentIrdDialog= value;
       }
       get selectedRencontreGrandPubliqueJeunePublique(): RencontreGrandPubliqueJeunePubliqueVo {
           return this.rencontreGrandPubliqueJeunePubliqueService.selectedRencontreGrandPubliqueJeunePublique;
       }
      set selectedRencontreGrandPubliqueJeunePublique(value: RencontreGrandPubliqueJeunePubliqueVo) {
        this.rencontreGrandPubliqueJeunePubliqueService.selectedRencontreGrandPubliqueJeunePublique = value;
       }
       get rencontreGrandPubliqueJeunePubliques(): Array<RencontreGrandPubliqueJeunePubliqueVo> {
           return this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliques;
       }
       set rencontreGrandPubliqueJeunePubliques(value: Array<RencontreGrandPubliqueJeunePubliqueVo>) {
        this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliques = value;
       }
       get createRencontreGrandPubliqueJeunePubliqueDialog(): boolean {
           return this.rencontreGrandPubliqueJeunePubliqueService.createRencontreGrandPubliqueJeunePubliqueDialog;
       }
      set createRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueService.createRencontreGrandPubliqueJeunePubliqueDialog= value;
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
