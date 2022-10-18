import {Component, OnInit, Input} from '@angular/core';
import {DistinctionEtablissementPaysService} from '../../../../../controller/service/DistinctionEtablissementPays.service';
import {DistinctionEtablissementPaysVo} from '../../../../../controller/model/DistinctionEtablissementPays.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {DistinctionVo} from '../../../../../controller/model/Distinction.model';
import {DistinctionService} from '../../../../../controller/service/Distinction.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
@Component({
  selector: 'app-distinction-etablissement-pays-create-admin',
  templateUrl: './distinction-etablissement-pays-create-admin.component.html',
  styleUrls: ['./distinction-etablissement-pays-create-admin.component.css']
})
export class DistinctionEtablissementPaysCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validPaysLibelle = true;
    _validPaysCode = true;
    _validEtablissementLibelle = true;



constructor(private datePipe: DatePipe, private distinctionEtablissementPaysService: DistinctionEtablissementPaysService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private distinctionService :DistinctionService
,       private paysService :PaysService
,       private etablissementService :EtablissementService
) {

}


// methods
ngOnInit(): void {

    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedDistinction = new DistinctionVo();
    this.distinctionService.findAll().subscribe((data) => this.distinctions = data);
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
     this.distinctionEtablissementPaysService.save().subscribe(distinctionEtablissementPays=>{
       this.distinctionEtablissementPayss.push({...distinctionEtablissementPays});
       this.createDistinctionEtablissementPaysDialog = false;
       this.submitted = false;
       this.selectedDistinctionEtablissementPays = new DistinctionEtablissementPaysVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }








//openPopup
              public async openCreateetablissement(etablissement: string) {
                      const isPermistted = await this.roleService.isPermitted('Etablissement', 'add');
                       if(isPermistted){
         this.selectedEtablissement = new EtablissementVo();
        this.createEtablissementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatedistinction(distinction: string) {
                      const isPermistted = await this.roleService.isPermitted('Distinction', 'add');
                       if(isPermistted){
         this.selectedDistinction = new DistinctionVo();
        this.createDistinctionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatepays(pays: string) {
                      const isPermistted = await this.roleService.isPermitted('Pays', 'add');
                       if(isPermistted){
         this.selectedPays = new PaysVo();
        this.createPaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createDistinctionEtablissementPaysDialog  = false;
    this.setValidation(true);
}

// getters and setters

get distinctionEtablissementPayss(): Array<DistinctionEtablissementPaysVo> {
    return this.distinctionEtablissementPaysService.distinctionEtablissementPayss;
       }
set distinctionEtablissementPayss(value: Array<DistinctionEtablissementPaysVo>) {
        this.distinctionEtablissementPaysService.distinctionEtablissementPayss = value;
       }

 get selectedDistinctionEtablissementPays():DistinctionEtablissementPaysVo {
           return this.distinctionEtablissementPaysService.selectedDistinctionEtablissementPays;
       }
    set selectedDistinctionEtablissementPays(value: DistinctionEtablissementPaysVo) {
        this.distinctionEtablissementPaysService.selectedDistinctionEtablissementPays = value;
       }

   get createDistinctionEtablissementPaysDialog(): boolean {
           return this.distinctionEtablissementPaysService.createDistinctionEtablissementPaysDialog;

       }
    set createDistinctionEtablissementPaysDialog(value: boolean) {
        this.distinctionEtablissementPaysService.createDistinctionEtablissementPaysDialog= value;
       }

       get selectedEtablissement(): EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
      set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
       get etablissements(): Array<EtablissementVo> {
           return this.etablissementService.etablissements;
       }
       set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }
       get createEtablissementDialog(): boolean {
           return this.etablissementService.createEtablissementDialog;
       }
      set createEtablissementDialog(value: boolean) {
        this.etablissementService.createEtablissementDialog= value;
       }
       get selectedDistinction(): DistinctionVo {
           return this.distinctionService.selectedDistinction;
       }
      set selectedDistinction(value: DistinctionVo) {
        this.distinctionService.selectedDistinction = value;
       }
       get distinctions(): Array<DistinctionVo> {
           return this.distinctionService.distinctions;
       }
       set distinctions(value: Array<DistinctionVo>) {
        this.distinctionService.distinctions = value;
       }
       get createDistinctionDialog(): boolean {
           return this.distinctionService.createDistinctionDialog;
       }
      set createDistinctionDialog(value: boolean) {
        this.distinctionService.createDistinctionDialog= value;
       }
       get selectedPays(): PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss(): Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get createPaysDialog(): boolean {
           return this.paysService.createPaysDialog;
       }
      set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog= value;
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


    get validPaysLibelle(): boolean {
    return this._validPaysLibelle;
    }

    set validPaysLibelle(value: boolean) {
    this._validPaysLibelle = value;
    }
    get validPaysCode(): boolean {
    return this._validPaysCode;
    }

    set validPaysCode(value: boolean) {
    this._validPaysCode = value;
    }
    get validEtablissementLibelle(): boolean {
    return this._validEtablissementLibelle;
    }

    set validEtablissementLibelle(value: boolean) {
    this._validEtablissementLibelle = value;
    }

}
