import {Component, OnInit, Input} from '@angular/core';
import {OutilPedagogiqueEnjeuxIrdService} from '../../../../../controller/service/OutilPedagogiqueEnjeuxIrd.service';
import {OutilPedagogiqueEnjeuxIrdVo} from '../../../../../controller/model/OutilPedagogiqueEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
@Component({
  selector: 'app-outil-pedagogique-enjeux-ird-create-admin',
  templateUrl: './outil-pedagogique-enjeux-ird-create-admin.component.html',
  styleUrls: ['./outil-pedagogique-enjeux-ird-create-admin.component.css']
})
export class OutilPedagogiqueEnjeuxIrdCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validEnjeuxIrdLibelle = true;
    _validEnjeuxIrdCode = true;



constructor(private datePipe: DatePipe, private outilPedagogiqueEnjeuxIrdService: OutilPedagogiqueEnjeuxIrdService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private outilPedagogiqueService :OutilPedagogiqueService
,       private enjeuxIrdService :EnjeuxIrdService
) {

}


// methods
ngOnInit(): void {

    this.selectedOutilPedagogique = new OutilPedagogiqueVo();
    this.outilPedagogiqueService.findAll().subscribe((data) => this.outilPedagogiques = data);
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
     this.outilPedagogiqueEnjeuxIrdService.save().subscribe(outilPedagogiqueEnjeuxIrd=>{
       this.outilPedagogiqueEnjeuxIrds.push({...outilPedagogiqueEnjeuxIrd});
       this.createOutilPedagogiqueEnjeuxIrdDialog = false;
       this.submitted = false;
       this.selectedOutilPedagogiqueEnjeuxIrd = new OutilPedagogiqueEnjeuxIrdVo();


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
              public async openCreateoutilPedagogique(outilPedagogique: string) {
                      const isPermistted = await this.roleService.isPermitted('OutilPedagogique', 'add');
                       if(isPermistted){
         this.selectedOutilPedagogique = new OutilPedagogiqueVo();
        this.createOutilPedagogiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createOutilPedagogiqueEnjeuxIrdDialog  = false;
    this.setValidation(true);
}

// getters and setters

get outilPedagogiqueEnjeuxIrds(): Array<OutilPedagogiqueEnjeuxIrdVo> {
    return this.outilPedagogiqueEnjeuxIrdService.outilPedagogiqueEnjeuxIrds;
       }
set outilPedagogiqueEnjeuxIrds(value: Array<OutilPedagogiqueEnjeuxIrdVo>) {
        this.outilPedagogiqueEnjeuxIrdService.outilPedagogiqueEnjeuxIrds = value;
       }

 get selectedOutilPedagogiqueEnjeuxIrd():OutilPedagogiqueEnjeuxIrdVo {
           return this.outilPedagogiqueEnjeuxIrdService.selectedOutilPedagogiqueEnjeuxIrd;
       }
    set selectedOutilPedagogiqueEnjeuxIrd(value: OutilPedagogiqueEnjeuxIrdVo) {
        this.outilPedagogiqueEnjeuxIrdService.selectedOutilPedagogiqueEnjeuxIrd = value;
       }

   get createOutilPedagogiqueEnjeuxIrdDialog(): boolean {
           return this.outilPedagogiqueEnjeuxIrdService.createOutilPedagogiqueEnjeuxIrdDialog;

       }
    set createOutilPedagogiqueEnjeuxIrdDialog(value: boolean) {
        this.outilPedagogiqueEnjeuxIrdService.createOutilPedagogiqueEnjeuxIrdDialog= value;
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
       get selectedOutilPedagogique(): OutilPedagogiqueVo {
           return this.outilPedagogiqueService.selectedOutilPedagogique;
       }
      set selectedOutilPedagogique(value: OutilPedagogiqueVo) {
        this.outilPedagogiqueService.selectedOutilPedagogique = value;
       }
       get outilPedagogiques(): Array<OutilPedagogiqueVo> {
           return this.outilPedagogiqueService.outilPedagogiques;
       }
       set outilPedagogiques(value: Array<OutilPedagogiqueVo>) {
        this.outilPedagogiqueService.outilPedagogiques = value;
       }
       get createOutilPedagogiqueDialog(): boolean {
           return this.outilPedagogiqueService.createOutilPedagogiqueDialog;
       }
      set createOutilPedagogiqueDialog(value: boolean) {
        this.outilPedagogiqueService.createOutilPedagogiqueDialog= value;
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
