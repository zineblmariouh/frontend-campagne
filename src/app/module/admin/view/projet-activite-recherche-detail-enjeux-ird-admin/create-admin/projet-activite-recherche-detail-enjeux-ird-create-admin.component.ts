import {Component, OnInit, Input} from '@angular/core';
import {ProjetActiviteRechercheDetailEnjeuxIrdService} from '../../../../../controller/service/ProjetActiviteRechercheDetailEnjeuxIrd.service';
import {ProjetActiviteRechercheDetailEnjeuxIrdVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {ProjetActiviteRechercheDetailVo} from '../../../../../controller/model/ProjetActiviteRechercheDetail.model';
import {ProjetActiviteRechercheDetailService} from '../../../../../controller/service/ProjetActiviteRechercheDetail.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
@Component({
  selector: 'app-projet-activite-recherche-detail-enjeux-ird-create-admin',
  templateUrl: './projet-activite-recherche-detail-enjeux-ird-create-admin.component.html',
  styleUrls: ['./projet-activite-recherche-detail-enjeux-ird-create-admin.component.css']
})
export class ProjetActiviteRechercheDetailEnjeuxIrdCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validEnjeuxIrdLibelle = true;
    _validEnjeuxIrdCode = true;



constructor(private datePipe: DatePipe, private projetActiviteRechercheDetailEnjeuxIrdService: ProjetActiviteRechercheDetailEnjeuxIrdService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private projetActiviteRechercheDetailService :ProjetActiviteRechercheDetailService
,       private enjeuxIrdService :EnjeuxIrdService
) {

}


// methods
ngOnInit(): void {

    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
    this.selectedProjetActiviteRechercheDetail = new ProjetActiviteRechercheDetailVo();
    this.projetActiviteRechercheDetailService.findAll().subscribe((data) => this.projetActiviteRechercheDetails = data);
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
     this.projetActiviteRechercheDetailEnjeuxIrdService.save().subscribe(projetActiviteRechercheDetailEnjeuxIrd=>{
       this.projetActiviteRechercheDetailEnjeuxIrds.push({...projetActiviteRechercheDetailEnjeuxIrd});
       this.createProjetActiviteRechercheDetailEnjeuxIrdDialog = false;
       this.submitted = false;
       this.selectedProjetActiviteRechercheDetailEnjeuxIrd = new ProjetActiviteRechercheDetailEnjeuxIrdVo();


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
              public async openCreateprojetActiviteRechercheDetail(projetActiviteRechercheDetail: string) {
                      const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetail', 'add');
                       if(isPermistted){
         this.selectedProjetActiviteRechercheDetail = new ProjetActiviteRechercheDetailVo();
        this.createProjetActiviteRechercheDetailDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createProjetActiviteRechercheDetailEnjeuxIrdDialog  = false;
    this.setValidation(true);
}

// getters and setters

get projetActiviteRechercheDetailEnjeuxIrds(): Array<ProjetActiviteRechercheDetailEnjeuxIrdVo> {
    return this.projetActiviteRechercheDetailEnjeuxIrdService.projetActiviteRechercheDetailEnjeuxIrds;
       }
set projetActiviteRechercheDetailEnjeuxIrds(value: Array<ProjetActiviteRechercheDetailEnjeuxIrdVo>) {
        this.projetActiviteRechercheDetailEnjeuxIrdService.projetActiviteRechercheDetailEnjeuxIrds = value;
       }

 get selectedProjetActiviteRechercheDetailEnjeuxIrd():ProjetActiviteRechercheDetailEnjeuxIrdVo {
           return this.projetActiviteRechercheDetailEnjeuxIrdService.selectedProjetActiviteRechercheDetailEnjeuxIrd;
       }
    set selectedProjetActiviteRechercheDetailEnjeuxIrd(value: ProjetActiviteRechercheDetailEnjeuxIrdVo) {
        this.projetActiviteRechercheDetailEnjeuxIrdService.selectedProjetActiviteRechercheDetailEnjeuxIrd = value;
       }

   get createProjetActiviteRechercheDetailEnjeuxIrdDialog(): boolean {
           return this.projetActiviteRechercheDetailEnjeuxIrdService.createProjetActiviteRechercheDetailEnjeuxIrdDialog;

       }
    set createProjetActiviteRechercheDetailEnjeuxIrdDialog(value: boolean) {
        this.projetActiviteRechercheDetailEnjeuxIrdService.createProjetActiviteRechercheDetailEnjeuxIrdDialog= value;
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
       get selectedProjetActiviteRechercheDetail(): ProjetActiviteRechercheDetailVo {
           return this.projetActiviteRechercheDetailService.selectedProjetActiviteRechercheDetail;
       }
      set selectedProjetActiviteRechercheDetail(value: ProjetActiviteRechercheDetailVo) {
        this.projetActiviteRechercheDetailService.selectedProjetActiviteRechercheDetail = value;
       }
       get projetActiviteRechercheDetails(): Array<ProjetActiviteRechercheDetailVo> {
           return this.projetActiviteRechercheDetailService.projetActiviteRechercheDetails;
       }
       set projetActiviteRechercheDetails(value: Array<ProjetActiviteRechercheDetailVo>) {
        this.projetActiviteRechercheDetailService.projetActiviteRechercheDetails = value;
       }
       get createProjetActiviteRechercheDetailDialog(): boolean {
           return this.projetActiviteRechercheDetailService.createProjetActiviteRechercheDetailDialog;
       }
      set createProjetActiviteRechercheDetailDialog(value: boolean) {
        this.projetActiviteRechercheDetailService.createProjetActiviteRechercheDetailDialog= value;
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
