import {Component, OnInit, Input} from '@angular/core';
import {RencontreGrandPubliqueJeunePubliqueInstrumentIrdService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueInstrumentIrd.service';
import {RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueInstrumentIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
@Component({
  selector: 'app-rencontre-grand-publique-jeune-publique-instrument-ird-create-admin',
  templateUrl: './rencontre-grand-publique-jeune-publique-instrument-ird-create-admin.component.html',
  styleUrls: ['./rencontre-grand-publique-jeune-publique-instrument-ird-create-admin.component.css']
})
export class RencontreGrandPubliqueJeunePubliqueInstrumentIrdCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validInstrumentIrdCode = true;
    _validInstrumentIrdLibelle = true;



constructor(private datePipe: DatePipe, private rencontreGrandPubliqueJeunePubliqueInstrumentIrdService: RencontreGrandPubliqueJeunePubliqueInstrumentIrdService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private instrumentIrdService :InstrumentIrdService
,       private rencontreGrandPubliqueJeunePubliqueService :RencontreGrandPubliqueJeunePubliqueService
) {

}


// methods
ngOnInit(): void {

    this.selectedInstrumentIrd = new InstrumentIrdVo();
    this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
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
     this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.save().subscribe(rencontreGrandPubliqueJeunePubliqueInstrumentIrd=>{
       this.rencontreGrandPubliqueJeunePubliqueInstrumentIrds.push({...rencontreGrandPubliqueJeunePubliqueInstrumentIrd});
       this.createRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog = false;
       this.submitted = false;
       this.selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd = new RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreateinstrumentIrd(instrumentIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('InstrumentIrd', 'add');
                       if(isPermistted){
         this.selectedInstrumentIrd = new InstrumentIrdVo();
        this.createInstrumentIrdDialog = true;
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
    this.createRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog  = false;
    this.setValidation(true);
}

// getters and setters

get rencontreGrandPubliqueJeunePubliqueInstrumentIrds(): Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo> {
    return this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.rencontreGrandPubliqueJeunePubliqueInstrumentIrds;
       }
set rencontreGrandPubliqueJeunePubliqueInstrumentIrds(value: Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo>) {
        this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.rencontreGrandPubliqueJeunePubliqueInstrumentIrds = value;
       }

 get selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd():RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo {
           return this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd;
       }
    set selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd(value: RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo) {
        this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd = value;
       }

   get createRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog(): boolean {
           return this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.createRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog;

       }
    set createRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.createRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog= value;
       }

       get selectedInstrumentIrd(): InstrumentIrdVo {
           return this.instrumentIrdService.selectedInstrumentIrd;
       }
      set selectedInstrumentIrd(value: InstrumentIrdVo) {
        this.instrumentIrdService.selectedInstrumentIrd = value;
       }
       get instrumentIrds(): Array<InstrumentIrdVo> {
           return this.instrumentIrdService.instrumentIrds;
       }
       set instrumentIrds(value: Array<InstrumentIrdVo>) {
        this.instrumentIrdService.instrumentIrds = value;
       }
       get createInstrumentIrdDialog(): boolean {
           return this.instrumentIrdService.createInstrumentIrdDialog;
       }
      set createInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.createInstrumentIrdDialog= value;
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


    get validInstrumentIrdCode(): boolean {
    return this._validInstrumentIrdCode;
    }

    set validInstrumentIrdCode(value: boolean) {
    this._validInstrumentIrdCode = value;
    }
    get validInstrumentIrdLibelle(): boolean {
    return this._validInstrumentIrdLibelle;
    }

    set validInstrumentIrdLibelle(value: boolean) {
    this._validInstrumentIrdLibelle = value;
    }

}
