import {Component, OnInit, Input} from '@angular/core';
import {ProjetActiviteRechercheDetailEtablissementLanceurService} from '../../../../../controller/service/ProjetActiviteRechercheDetailEtablissementLanceur.service';
import {ProjetActiviteRechercheDetailEtablissementLanceurVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailEtablissementLanceur.model';
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
  selector: 'app-projet-activite-recherche-detail-etablissement-lanceur-create-chercheur',
  templateUrl: './projet-activite-recherche-detail-etablissement-lanceur-create-chercheur.component.html',
  styleUrls: ['./projet-activite-recherche-detail-etablissement-lanceur-create-chercheur.component.css']
})
export class ProjetActiviteRechercheDetailEtablissementLanceurCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validEtablissementLibelle = true;



constructor(private datePipe: DatePipe, private projetActiviteRechercheDetailEtablissementLanceurService: ProjetActiviteRechercheDetailEtablissementLanceurService
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
     this.projetActiviteRechercheDetailEtablissementLanceurService.save().subscribe(projetActiviteRechercheDetailEtablissementLanceur=>{
       this.projetActiviteRechercheDetailEtablissementLanceurs.push({...projetActiviteRechercheDetailEtablissementLanceur});
       this.createProjetActiviteRechercheDetailEtablissementLanceurDialog = false;
       this.submitted = false;
       this.selectedProjetActiviteRechercheDetailEtablissementLanceur = new ProjetActiviteRechercheDetailEtablissementLanceurVo();


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
    this.createProjetActiviteRechercheDetailEtablissementLanceurDialog  = false;
    this.setValidation(true);
}

// getters and setters

get projetActiviteRechercheDetailEtablissementLanceurs(): Array<ProjetActiviteRechercheDetailEtablissementLanceurVo> {
    return this.projetActiviteRechercheDetailEtablissementLanceurService.projetActiviteRechercheDetailEtablissementLanceurs;
       }
set projetActiviteRechercheDetailEtablissementLanceurs(value: Array<ProjetActiviteRechercheDetailEtablissementLanceurVo>) {
        this.projetActiviteRechercheDetailEtablissementLanceurService.projetActiviteRechercheDetailEtablissementLanceurs = value;
       }

 get selectedProjetActiviteRechercheDetailEtablissementLanceur():ProjetActiviteRechercheDetailEtablissementLanceurVo {
           return this.projetActiviteRechercheDetailEtablissementLanceurService.selectedProjetActiviteRechercheDetailEtablissementLanceur;
       }
    set selectedProjetActiviteRechercheDetailEtablissementLanceur(value: ProjetActiviteRechercheDetailEtablissementLanceurVo) {
        this.projetActiviteRechercheDetailEtablissementLanceurService.selectedProjetActiviteRechercheDetailEtablissementLanceur = value;
       }

   get createProjetActiviteRechercheDetailEtablissementLanceurDialog(): boolean {
           return this.projetActiviteRechercheDetailEtablissementLanceurService.createProjetActiviteRechercheDetailEtablissementLanceurDialog;

       }
    set createProjetActiviteRechercheDetailEtablissementLanceurDialog(value: boolean) {
        this.projetActiviteRechercheDetailEtablissementLanceurService.createProjetActiviteRechercheDetailEtablissementLanceurDialog= value;
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
