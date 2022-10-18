import {Component, OnInit, Input} from '@angular/core';
import {ProjetActiviteRechercheDetailInstitutionCoContractantService} from '../../../../../controller/service/ProjetActiviteRechercheDetailInstitutionCoContractant.service';
import {ProjetActiviteRechercheDetailInstitutionCoContractantVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailInstitutionCoContractant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {ProjetActiviteRechercheDetailVo} from '../../../../../controller/model/ProjetActiviteRechercheDetail.model';
import {ProjetActiviteRechercheDetailService} from '../../../../../controller/service/ProjetActiviteRechercheDetail.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
@Component({
  selector: 'app-projet-activite-recherche-detail-institution-co-contractant-create-admin',
  templateUrl: './projet-activite-recherche-detail-institution-co-contractant-create-admin.component.html',
  styleUrls: ['./projet-activite-recherche-detail-institution-co-contractant-create-admin.component.css']
})
export class ProjetActiviteRechercheDetailInstitutionCoContractantCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validEtablissementLibelle = true;



constructor(private datePipe: DatePipe, private projetActiviteRechercheDetailInstitutionCoContractantService: ProjetActiviteRechercheDetailInstitutionCoContractantService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private projetActiviteRechercheDetailService :ProjetActiviteRechercheDetailService
,       private etablissementService :EtablissementService
) {

}


// methods
ngOnInit(): void {

    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
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
     this.projetActiviteRechercheDetailInstitutionCoContractantService.save().subscribe(projetActiviteRechercheDetailInstitutionCoContractant=>{
       this.projetActiviteRechercheDetailInstitutionCoContractants.push({...projetActiviteRechercheDetailInstitutionCoContractant});
       this.createProjetActiviteRechercheDetailInstitutionCoContractantDialog = false;
       this.submitted = false;
       this.selectedProjetActiviteRechercheDetailInstitutionCoContractant = new ProjetActiviteRechercheDetailInstitutionCoContractantVo();


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
    this.createProjetActiviteRechercheDetailInstitutionCoContractantDialog  = false;
    this.setValidation(true);
}

// getters and setters

get projetActiviteRechercheDetailInstitutionCoContractants(): Array<ProjetActiviteRechercheDetailInstitutionCoContractantVo> {
    return this.projetActiviteRechercheDetailInstitutionCoContractantService.projetActiviteRechercheDetailInstitutionCoContractants;
       }
set projetActiviteRechercheDetailInstitutionCoContractants(value: Array<ProjetActiviteRechercheDetailInstitutionCoContractantVo>) {
        this.projetActiviteRechercheDetailInstitutionCoContractantService.projetActiviteRechercheDetailInstitutionCoContractants = value;
       }

 get selectedProjetActiviteRechercheDetailInstitutionCoContractant():ProjetActiviteRechercheDetailInstitutionCoContractantVo {
           return this.projetActiviteRechercheDetailInstitutionCoContractantService.selectedProjetActiviteRechercheDetailInstitutionCoContractant;
       }
    set selectedProjetActiviteRechercheDetailInstitutionCoContractant(value: ProjetActiviteRechercheDetailInstitutionCoContractantVo) {
        this.projetActiviteRechercheDetailInstitutionCoContractantService.selectedProjetActiviteRechercheDetailInstitutionCoContractant = value;
       }

   get createProjetActiviteRechercheDetailInstitutionCoContractantDialog(): boolean {
           return this.projetActiviteRechercheDetailInstitutionCoContractantService.createProjetActiviteRechercheDetailInstitutionCoContractantDialog;

       }
    set createProjetActiviteRechercheDetailInstitutionCoContractantDialog(value: boolean) {
        this.projetActiviteRechercheDetailInstitutionCoContractantService.createProjetActiviteRechercheDetailInstitutionCoContractantDialog= value;
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


    get validEtablissementLibelle(): boolean {
    return this._validEtablissementLibelle;
    }

    set validEtablissementLibelle(value: boolean) {
    this._validEtablissementLibelle = value;
    }

}
