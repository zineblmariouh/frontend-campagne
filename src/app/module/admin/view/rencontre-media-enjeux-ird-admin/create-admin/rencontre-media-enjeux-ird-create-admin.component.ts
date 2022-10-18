import {Component, OnInit, Input} from '@angular/core';
import {RencontreMediaEnjeuxIrdService} from '../../../../../controller/service/RencontreMediaEnjeuxIrd.service';
import {RencontreMediaEnjeuxIrdVo} from '../../../../../controller/model/RencontreMediaEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import {RencontreMediaService} from '../../../../../controller/service/RencontreMedia.service';
@Component({
  selector: 'app-rencontre-media-enjeux-ird-create-admin',
  templateUrl: './rencontre-media-enjeux-ird-create-admin.component.html',
  styleUrls: ['./rencontre-media-enjeux-ird-create-admin.component.css']
})
export class RencontreMediaEnjeuxIrdCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validEnjeuxIrdLibelle = true;
    _validEnjeuxIrdCode = true;



constructor(private datePipe: DatePipe, private rencontreMediaEnjeuxIrdService: RencontreMediaEnjeuxIrdService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private enjeuxIrdService :EnjeuxIrdService
,       private rencontreMediaService :RencontreMediaService
) {

}


// methods
ngOnInit(): void {

    this.selectedRencontreMedia = new RencontreMediaVo();
    this.rencontreMediaService.findAll().subscribe((data) => this.rencontreMedias = data);
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
     this.rencontreMediaEnjeuxIrdService.save().subscribe(rencontreMediaEnjeuxIrd=>{
       this.rencontreMediaEnjeuxIrds.push({...rencontreMediaEnjeuxIrd});
       this.createRencontreMediaEnjeuxIrdDialog = false;
       this.submitted = false;
       this.selectedRencontreMediaEnjeuxIrd = new RencontreMediaEnjeuxIrdVo();


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
              public async openCreaterencontreMedia(rencontreMedia: string) {
                      const isPermistted = await this.roleService.isPermitted('RencontreMedia', 'add');
                       if(isPermistted){
         this.selectedRencontreMedia = new RencontreMediaVo();
        this.createRencontreMediaDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createRencontreMediaEnjeuxIrdDialog  = false;
    this.setValidation(true);
}

// getters and setters

get rencontreMediaEnjeuxIrds(): Array<RencontreMediaEnjeuxIrdVo> {
    return this.rencontreMediaEnjeuxIrdService.rencontreMediaEnjeuxIrds;
       }
set rencontreMediaEnjeuxIrds(value: Array<RencontreMediaEnjeuxIrdVo>) {
        this.rencontreMediaEnjeuxIrdService.rencontreMediaEnjeuxIrds = value;
       }

 get selectedRencontreMediaEnjeuxIrd():RencontreMediaEnjeuxIrdVo {
           return this.rencontreMediaEnjeuxIrdService.selectedRencontreMediaEnjeuxIrd;
       }
    set selectedRencontreMediaEnjeuxIrd(value: RencontreMediaEnjeuxIrdVo) {
        this.rencontreMediaEnjeuxIrdService.selectedRencontreMediaEnjeuxIrd = value;
       }

   get createRencontreMediaEnjeuxIrdDialog(): boolean {
           return this.rencontreMediaEnjeuxIrdService.createRencontreMediaEnjeuxIrdDialog;

       }
    set createRencontreMediaEnjeuxIrdDialog(value: boolean) {
        this.rencontreMediaEnjeuxIrdService.createRencontreMediaEnjeuxIrdDialog= value;
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
       get selectedRencontreMedia(): RencontreMediaVo {
           return this.rencontreMediaService.selectedRencontreMedia;
       }
      set selectedRencontreMedia(value: RencontreMediaVo) {
        this.rencontreMediaService.selectedRencontreMedia = value;
       }
       get rencontreMedias(): Array<RencontreMediaVo> {
           return this.rencontreMediaService.rencontreMedias;
       }
       set rencontreMedias(value: Array<RencontreMediaVo>) {
        this.rencontreMediaService.rencontreMedias = value;
       }
       get createRencontreMediaDialog(): boolean {
           return this.rencontreMediaService.createRencontreMediaDialog;
       }
      set createRencontreMediaDialog(value: boolean) {
        this.rencontreMediaService.createRencontreMediaDialog= value;
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
