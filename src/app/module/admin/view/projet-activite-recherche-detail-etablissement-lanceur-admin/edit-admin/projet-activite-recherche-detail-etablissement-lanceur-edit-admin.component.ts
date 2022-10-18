import {Component, OnInit} from '@angular/core';
import {ProjetActiviteRechercheDetailEtablissementLanceurService} from '../../../../../controller/service/ProjetActiviteRechercheDetailEtablissementLanceur.service';
import {ProjetActiviteRechercheDetailEtablissementLanceurVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailEtablissementLanceur.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ProjetActiviteRechercheDetailVo} from '../../../../../controller/model/ProjetActiviteRechercheDetail.model';
import {ProjetActiviteRechercheDetailService} from '../../../../../controller/service/ProjetActiviteRechercheDetail.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';

@Component({
  selector: 'app-projet-activite-recherche-detail-etablissement-lanceur-edit-admin',
  templateUrl: './projet-activite-recherche-detail-etablissement-lanceur-edit-admin.component.html',
  styleUrls: ['./projet-activite-recherche-detail-etablissement-lanceur-edit-admin.component.css']
})
export class ProjetActiviteRechercheDetailEtablissementLanceurEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private projetActiviteRechercheDetailEtablissementLanceurService: ProjetActiviteRechercheDetailEtablissementLanceurService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private projetActiviteRechercheDetailService: ProjetActiviteRechercheDetailService
 ,       private etablissementService: EtablissementService
) {
}

// methods
ngOnInit(): void {
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedProjetActiviteRechercheDetail = new ProjetActiviteRechercheDetailVo();
    this.projetActiviteRechercheDetailService.findAll().subscribe((data) => this.projetActiviteRechercheDetails = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.projetActiviteRechercheDetailEtablissementLanceurService.edit().subscribe(projetActiviteRechercheDetailEtablissementLanceur=>{
    const myIndex = this.projetActiviteRechercheDetailEtablissementLanceurs.findIndex(e => e.id === this.selectedProjetActiviteRechercheDetailEtablissementLanceur.id);
    this.projetActiviteRechercheDetailEtablissementLanceurs[myIndex] = this.selectedProjetActiviteRechercheDetailEtablissementLanceur;
    this.editProjetActiviteRechercheDetailEtablissementLanceurDialog = false;
    this.selectedProjetActiviteRechercheDetailEtablissementLanceur = new ProjetActiviteRechercheDetailEtablissementLanceurVo();


    }, error => {
        console.log(error);
    });

}

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

hideEditDialog(){
    this.editProjetActiviteRechercheDetailEtablissementLanceurDialog  = false;
}

// getters and setters

get projetActiviteRechercheDetailEtablissementLanceurs(): Array<ProjetActiviteRechercheDetailEtablissementLanceurVo> {
    return this.projetActiviteRechercheDetailEtablissementLanceurService.projetActiviteRechercheDetailEtablissementLanceurs;
       }
set projetActiviteRechercheDetailEtablissementLanceurs(value: Array<ProjetActiviteRechercheDetailEtablissementLanceurVo>) {
        this.projetActiviteRechercheDetailEtablissementLanceurService.projetActiviteRechercheDetailEtablissementLanceurs = value;
       }

 get selectedProjetActiviteRechercheDetailEtablissementLanceur(): ProjetActiviteRechercheDetailEtablissementLanceurVo {
           return this.projetActiviteRechercheDetailEtablissementLanceurService.selectedProjetActiviteRechercheDetailEtablissementLanceur;
       }
    set selectedProjetActiviteRechercheDetailEtablissementLanceur(value: ProjetActiviteRechercheDetailEtablissementLanceurVo) {
        this.projetActiviteRechercheDetailEtablissementLanceurService.selectedProjetActiviteRechercheDetailEtablissementLanceur = value;
       }

   get editProjetActiviteRechercheDetailEtablissementLanceurDialog(): boolean {
           return this.projetActiviteRechercheDetailEtablissementLanceurService.editProjetActiviteRechercheDetailEtablissementLanceurDialog;

       }
    set editProjetActiviteRechercheDetailEtablissementLanceurDialog(value: boolean) {
        this.projetActiviteRechercheDetailEtablissementLanceurService.editProjetActiviteRechercheDetailEtablissementLanceurDialog = value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
