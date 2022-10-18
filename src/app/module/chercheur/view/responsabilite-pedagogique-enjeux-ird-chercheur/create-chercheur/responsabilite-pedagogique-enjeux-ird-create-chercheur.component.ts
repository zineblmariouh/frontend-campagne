import {Component, OnInit, Input} from '@angular/core';
import {ResponsabilitePedagogiqueEnjeuxIrdService} from '../../../../../controller/service/ResponsabilitePedagogiqueEnjeuxIrd.service';
import {ResponsabilitePedagogiqueEnjeuxIrdVo} from '../../../../../controller/model/ResponsabilitePedagogiqueEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {ResponsabilitePedagogiqueVo} from '../../../../../controller/model/ResponsabilitePedagogique.model';
import {ResponsabilitePedagogiqueService} from '../../../../../controller/service/ResponsabilitePedagogique.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
@Component({
  selector: 'app-responsabilite-pedagogique-enjeux-ird-create-chercheur',
  templateUrl: './responsabilite-pedagogique-enjeux-ird-create-chercheur.component.html',
  styleUrls: ['./responsabilite-pedagogique-enjeux-ird-create-chercheur.component.css']
})
export class ResponsabilitePedagogiqueEnjeuxIrdCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validEnjeuxIrdLibelle = true;
    _validEnjeuxIrdCode = true;
    _validResponsabilitePedagogiqueNiveauResponsabilitePedagogique = true;
    _validResponsabilitePedagogiqueStatusCursus = true;
    _validResponsabilitePedagogiqueIntituleCursus = true;
    _validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements = true;
    _validResponsabilitePedagogiqueResponsabilitePedagogiquePayss = true;



constructor(private datePipe: DatePipe, private responsabilitePedagogiqueEnjeuxIrdService: ResponsabilitePedagogiqueEnjeuxIrdService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private responsabilitePedagogiqueService :ResponsabilitePedagogiqueService
,       private enjeuxIrdService :EnjeuxIrdService
) {

}


// methods
ngOnInit(): void {

    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
    this.selectedResponsabilitePedagogique = new ResponsabilitePedagogiqueVo();
    this.responsabilitePedagogiqueService.findAll().subscribe((data) => this.responsabilitePedagogiques = data);
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
     this.responsabilitePedagogiqueEnjeuxIrdService.save().subscribe(responsabilitePedagogiqueEnjeuxIrd=>{
       this.responsabilitePedagogiqueEnjeuxIrds.push({...responsabilitePedagogiqueEnjeuxIrd});
       this.createResponsabilitePedagogiqueEnjeuxIrdDialog = false;
       this.submitted = false;
       this.selectedResponsabilitePedagogiqueEnjeuxIrd = new ResponsabilitePedagogiqueEnjeuxIrdVo();


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
              public async openCreateresponsabilitePedagogique(responsabilitePedagogique: string) {
                      const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogique', 'add');
                       if(isPermistted){
         this.selectedResponsabilitePedagogique = new ResponsabilitePedagogiqueVo();
        this.createResponsabilitePedagogiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createResponsabilitePedagogiqueEnjeuxIrdDialog  = false;
    this.setValidation(true);
}

// getters and setters

get responsabilitePedagogiqueEnjeuxIrds(): Array<ResponsabilitePedagogiqueEnjeuxIrdVo> {
    return this.responsabilitePedagogiqueEnjeuxIrdService.responsabilitePedagogiqueEnjeuxIrds;
       }
set responsabilitePedagogiqueEnjeuxIrds(value: Array<ResponsabilitePedagogiqueEnjeuxIrdVo>) {
        this.responsabilitePedagogiqueEnjeuxIrdService.responsabilitePedagogiqueEnjeuxIrds = value;
       }

 get selectedResponsabilitePedagogiqueEnjeuxIrd():ResponsabilitePedagogiqueEnjeuxIrdVo {
           return this.responsabilitePedagogiqueEnjeuxIrdService.selectedResponsabilitePedagogiqueEnjeuxIrd;
       }
    set selectedResponsabilitePedagogiqueEnjeuxIrd(value: ResponsabilitePedagogiqueEnjeuxIrdVo) {
        this.responsabilitePedagogiqueEnjeuxIrdService.selectedResponsabilitePedagogiqueEnjeuxIrd = value;
       }

   get createResponsabilitePedagogiqueEnjeuxIrdDialog(): boolean {
           return this.responsabilitePedagogiqueEnjeuxIrdService.createResponsabilitePedagogiqueEnjeuxIrdDialog;

       }
    set createResponsabilitePedagogiqueEnjeuxIrdDialog(value: boolean) {
        this.responsabilitePedagogiqueEnjeuxIrdService.createResponsabilitePedagogiqueEnjeuxIrdDialog= value;
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
       get selectedResponsabilitePedagogique(): ResponsabilitePedagogiqueVo {
           return this.responsabilitePedagogiqueService.selectedResponsabilitePedagogique;
       }
      set selectedResponsabilitePedagogique(value: ResponsabilitePedagogiqueVo) {
        this.responsabilitePedagogiqueService.selectedResponsabilitePedagogique = value;
       }
       get responsabilitePedagogiques(): Array<ResponsabilitePedagogiqueVo> {
           return this.responsabilitePedagogiqueService.responsabilitePedagogiques;
       }
       set responsabilitePedagogiques(value: Array<ResponsabilitePedagogiqueVo>) {
        this.responsabilitePedagogiqueService.responsabilitePedagogiques = value;
       }
       get createResponsabilitePedagogiqueDialog(): boolean {
           return this.responsabilitePedagogiqueService.createResponsabilitePedagogiqueDialog;
       }
      set createResponsabilitePedagogiqueDialog(value: boolean) {
        this.responsabilitePedagogiqueService.createResponsabilitePedagogiqueDialog= value;
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
    get validResponsabilitePedagogiqueNiveauResponsabilitePedagogique(): boolean {
    return this._validResponsabilitePedagogiqueNiveauResponsabilitePedagogique;
    }

    set validResponsabilitePedagogiqueNiveauResponsabilitePedagogique(value: boolean) {
    this._validResponsabilitePedagogiqueNiveauResponsabilitePedagogique = value;
    }
    get validResponsabilitePedagogiqueStatusCursus(): boolean {
    return this._validResponsabilitePedagogiqueStatusCursus;
    }

    set validResponsabilitePedagogiqueStatusCursus(value: boolean) {
    this._validResponsabilitePedagogiqueStatusCursus = value;
    }
    get validResponsabilitePedagogiqueIntituleCursus(): boolean {
    return this._validResponsabilitePedagogiqueIntituleCursus;
    }

    set validResponsabilitePedagogiqueIntituleCursus(value: boolean) {
    this._validResponsabilitePedagogiqueIntituleCursus = value;
    }
    get validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements(): boolean {
    return this._validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements;
    }

    set validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements(value: boolean) {
    this._validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements = value;
    }
    get validResponsabilitePedagogiqueResponsabilitePedagogiquePayss(): boolean {
    return this._validResponsabilitePedagogiqueResponsabilitePedagogiquePayss;
    }

    set validResponsabilitePedagogiqueResponsabilitePedagogiquePayss(value: boolean) {
    this._validResponsabilitePedagogiqueResponsabilitePedagogiquePayss = value;
    }

}
