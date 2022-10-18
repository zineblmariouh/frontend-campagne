import {Component, OnInit, Input} from '@angular/core';
import {VieInstitutionnelleDetailEtablissementService} from '../../../../../controller/service/VieInstitutionnelleDetailEtablissement.service';
import {VieInstitutionnelleDetailEtablissementVo} from '../../../../../controller/model/VieInstitutionnelleDetailEtablissement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {VieInstitutionnelleDetailVo} from '../../../../../controller/model/VieInstitutionnelleDetail.model';
import {VieInstitutionnelleDetailService} from '../../../../../controller/service/VieInstitutionnelleDetail.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
@Component({
  selector: 'app-vie-institutionnelle-detail-etablissement-create-chercheur',
  templateUrl: './vie-institutionnelle-detail-etablissement-create-chercheur.component.html',
  styleUrls: ['./vie-institutionnelle-detail-etablissement-create-chercheur.component.css']
})
export class VieInstitutionnelleDetailEtablissementCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validEtablissementLibelle = true;



constructor(private datePipe: DatePipe, private vieInstitutionnelleDetailEtablissementService: VieInstitutionnelleDetailEtablissementService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private vieInstitutionnelleDetailService :VieInstitutionnelleDetailService
,       private etablissementService :EtablissementService
) {

}


// methods
ngOnInit(): void {

    this.selectedVieInstitutionnelleDetail = new VieInstitutionnelleDetailVo();
    this.vieInstitutionnelleDetailService.findAll().subscribe((data) => this.vieInstitutionnelleDetails = data);
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
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
     this.vieInstitutionnelleDetailEtablissementService.save().subscribe(vieInstitutionnelleDetailEtablissement=>{
       this.vieInstitutionnelleDetailEtablissements.push({...vieInstitutionnelleDetailEtablissement});
       this.createVieInstitutionnelleDetailEtablissementDialog = false;
       this.submitted = false;
       this.selectedVieInstitutionnelleDetailEtablissement = new VieInstitutionnelleDetailEtablissementVo();


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
              public async openCreatevieInstitutionnelleDetail(vieInstitutionnelleDetail: string) {
                      const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetail', 'add');
                       if(isPermistted){
         this.selectedVieInstitutionnelleDetail = new VieInstitutionnelleDetailVo();
        this.createVieInstitutionnelleDetailDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createVieInstitutionnelleDetailEtablissementDialog  = false;
    this.setValidation(true);
}

// getters and setters

get vieInstitutionnelleDetailEtablissements(): Array<VieInstitutionnelleDetailEtablissementVo> {
    return this.vieInstitutionnelleDetailEtablissementService.vieInstitutionnelleDetailEtablissements;
       }
set vieInstitutionnelleDetailEtablissements(value: Array<VieInstitutionnelleDetailEtablissementVo>) {
        this.vieInstitutionnelleDetailEtablissementService.vieInstitutionnelleDetailEtablissements = value;
       }

 get selectedVieInstitutionnelleDetailEtablissement():VieInstitutionnelleDetailEtablissementVo {
           return this.vieInstitutionnelleDetailEtablissementService.selectedVieInstitutionnelleDetailEtablissement;
       }
    set selectedVieInstitutionnelleDetailEtablissement(value: VieInstitutionnelleDetailEtablissementVo) {
        this.vieInstitutionnelleDetailEtablissementService.selectedVieInstitutionnelleDetailEtablissement = value;
       }

   get createVieInstitutionnelleDetailEtablissementDialog(): boolean {
           return this.vieInstitutionnelleDetailEtablissementService.createVieInstitutionnelleDetailEtablissementDialog;

       }
    set createVieInstitutionnelleDetailEtablissementDialog(value: boolean) {
        this.vieInstitutionnelleDetailEtablissementService.createVieInstitutionnelleDetailEtablissementDialog= value;
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
       get selectedVieInstitutionnelleDetail(): VieInstitutionnelleDetailVo {
           return this.vieInstitutionnelleDetailService.selectedVieInstitutionnelleDetail;
       }
      set selectedVieInstitutionnelleDetail(value: VieInstitutionnelleDetailVo) {
        this.vieInstitutionnelleDetailService.selectedVieInstitutionnelleDetail = value;
       }
       get vieInstitutionnelleDetails(): Array<VieInstitutionnelleDetailVo> {
           return this.vieInstitutionnelleDetailService.vieInstitutionnelleDetails;
       }
       set vieInstitutionnelleDetails(value: Array<VieInstitutionnelleDetailVo>) {
        this.vieInstitutionnelleDetailService.vieInstitutionnelleDetails = value;
       }
       get createVieInstitutionnelleDetailDialog(): boolean {
           return this.vieInstitutionnelleDetailService.createVieInstitutionnelleDetailDialog;
       }
      set createVieInstitutionnelleDetailDialog(value: boolean) {
        this.vieInstitutionnelleDetailService.createVieInstitutionnelleDetailDialog= value;
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


    get validEtablissementLibelle(): boolean {
    return this._validEtablissementLibelle;
    }

    set validEtablissementLibelle(value: boolean) {
    this._validEtablissementLibelle = value;
    }

}
