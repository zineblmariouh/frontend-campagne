import {Component, OnInit, Input} from '@angular/core';
import {ResponsabilitePedagogiquePaysService} from '../../../../../controller/service/ResponsabilitePedagogiquePays.service';
import {ResponsabilitePedagogiquePaysVo} from '../../../../../controller/model/ResponsabilitePedagogiquePays.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {ResponsabilitePedagogiqueVo} from '../../../../../controller/model/ResponsabilitePedagogique.model';
import {ResponsabilitePedagogiqueService} from '../../../../../controller/service/ResponsabilitePedagogique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
@Component({
  selector: 'app-responsabilite-pedagogique-pays-create-admin',
  templateUrl: './responsabilite-pedagogique-pays-create-admin.component.html',
  styleUrls: ['./responsabilite-pedagogique-pays-create-admin.component.css']
})
export class ResponsabilitePedagogiquePaysCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validPaysLibelle = true;
    _validPaysCode = true;
    _validResponsabilitePedagogiqueNiveauResponsabilitePedagogique = true;
    _validResponsabilitePedagogiqueStatusCursus = true;
    _validResponsabilitePedagogiqueIntituleCursus = true;
    _validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements = true;
    _validResponsabilitePedagogiqueResponsabilitePedagogiquePayss = true;



constructor(private datePipe: DatePipe, private responsabilitePedagogiquePaysService: ResponsabilitePedagogiquePaysService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private responsabilitePedagogiqueService :ResponsabilitePedagogiqueService
,       private paysService :PaysService
) {

}


// methods
ngOnInit(): void {

    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
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
     this.responsabilitePedagogiquePaysService.save().subscribe(responsabilitePedagogiquePays=>{
       this.responsabilitePedagogiquePayss.push({...responsabilitePedagogiquePays});
       this.createResponsabilitePedagogiquePaysDialog = false;
       this.submitted = false;
       this.selectedResponsabilitePedagogiquePays = new ResponsabilitePedagogiquePaysVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
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
    this.createResponsabilitePedagogiquePaysDialog  = false;
    this.setValidation(true);
}

// getters and setters

get responsabilitePedagogiquePayss(): Array<ResponsabilitePedagogiquePaysVo> {
    return this.responsabilitePedagogiquePaysService.responsabilitePedagogiquePayss;
       }
set responsabilitePedagogiquePayss(value: Array<ResponsabilitePedagogiquePaysVo>) {
        this.responsabilitePedagogiquePaysService.responsabilitePedagogiquePayss = value;
       }

 get selectedResponsabilitePedagogiquePays():ResponsabilitePedagogiquePaysVo {
           return this.responsabilitePedagogiquePaysService.selectedResponsabilitePedagogiquePays;
       }
    set selectedResponsabilitePedagogiquePays(value: ResponsabilitePedagogiquePaysVo) {
        this.responsabilitePedagogiquePaysService.selectedResponsabilitePedagogiquePays = value;
       }

   get createResponsabilitePedagogiquePaysDialog(): boolean {
           return this.responsabilitePedagogiquePaysService.createResponsabilitePedagogiquePaysDialog;

       }
    set createResponsabilitePedagogiquePaysDialog(value: boolean) {
        this.responsabilitePedagogiquePaysService.createResponsabilitePedagogiquePaysDialog= value;
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
