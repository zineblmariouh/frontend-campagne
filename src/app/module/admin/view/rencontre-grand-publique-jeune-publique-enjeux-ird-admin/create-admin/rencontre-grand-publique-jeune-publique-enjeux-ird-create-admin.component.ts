import {Component, OnInit, Input} from '@angular/core';
import {RencontreGrandPubliqueJeunePubliqueEnjeuxIrdService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueEnjeuxIrd.service';
import {RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
@Component({
  selector: 'app-rencontre-grand-publique-jeune-publique-enjeux-ird-create-admin',
  templateUrl: './rencontre-grand-publique-jeune-publique-enjeux-ird-create-admin.component.html',
  styleUrls: ['./rencontre-grand-publique-jeune-publique-enjeux-ird-create-admin.component.css']
})
export class RencontreGrandPubliqueJeunePubliqueEnjeuxIrdCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validEnjeuxIrdLibelle = true;
    _validEnjeuxIrdCode = true;



constructor(private datePipe: DatePipe, private rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService: RencontreGrandPubliqueJeunePubliqueEnjeuxIrdService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private rencontreGrandPubliqueJeunePubliqueService :RencontreGrandPubliqueJeunePubliqueService
,       private enjeuxIrdService :EnjeuxIrdService
) {

}


// methods
ngOnInit(): void {

    this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
    this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe((data) => this.rencontreGrandPubliqueJeunePubliques = data);
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
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
     this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.save().subscribe(rencontreGrandPubliqueJeunePubliqueEnjeuxIrd=>{
       this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrds.push({...rencontreGrandPubliqueJeunePubliqueEnjeuxIrd});
       this.createRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog = false;
       this.submitted = false;
       this.selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd = new RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreateenjeuxIrd(enjeuxIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('EnjeuxIrd', 'add');
                       if(isPermistted){
         this.selectedEnjeuxIrd = new EnjeuxIrdVo();
        this.createEnjeuxIrdDialog = true;
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
    this.createRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog  = false;
    this.setValidation(true);
}

// getters and setters

get rencontreGrandPubliqueJeunePubliqueEnjeuxIrds(): Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo> {
    return this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.rencontreGrandPubliqueJeunePubliqueEnjeuxIrds;
       }
set rencontreGrandPubliqueJeunePubliqueEnjeuxIrds(value: Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo>) {
        this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.rencontreGrandPubliqueJeunePubliqueEnjeuxIrds = value;
       }

 get selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd():RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo {
           return this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd;
       }
    set selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd(value: RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo) {
        this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd = value;
       }

   get createRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog(): boolean {
           return this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.createRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog;

       }
    set createRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.createRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog= value;
       }

       get selectedEnjeuxIrd(): EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds(): Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get createEnjeuxIrdDialog(): boolean {
           return this.enjeuxIrdService.createEnjeuxIrdDialog;
       }
      set createEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.createEnjeuxIrdDialog= value;
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


    get validEnjeuxIrdLibelle(): boolean {
    return this._validEnjeuxIrdLibelle;
    }

    set validEnjeuxIrdLibelle(value: boolean) {
    this._validEnjeuxIrdLibelle = value;
    }
    get validEnjeuxIrdCode(): boolean {
    return this._validEnjeuxIrdCode;
    }

    set validEnjeuxIrdCode(value: boolean) {
    this._validEnjeuxIrdCode = value;
    }

}
