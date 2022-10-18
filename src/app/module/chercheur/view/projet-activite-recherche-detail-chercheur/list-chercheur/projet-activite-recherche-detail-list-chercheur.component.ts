import {Component, OnInit} from '@angular/core';
import {ProjetActiviteRechercheDetailService} from '../../../../../controller/service/ProjetActiviteRechercheDetail.service';
import {ProjetActiviteRechercheDetailVo} from '../../../../../controller/model/ProjetActiviteRechercheDetail.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { StatusProjetService } from '../../../../../controller/service/StatusProjet.service';
import { RoleProjetService } from '../../../../../controller/service/RoleProjet.service';
import { EtablissementService } from '../../../../../controller/service/Etablissement.service';
import { PaysService } from '../../../../../controller/service/Pays.service';
import { ProjetActiviteRechercheService } from '../../../../../controller/service/ProjetActiviteRecherche.service';
import { EtatEtapeCampagneService } from '../../../../../controller/service/EtatEtapeCampagne.service';

import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {ProjetActiviteRechercheDetailPaysVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailPays.model';
import {ProjetActiviteRechercheVo} from '../../../../../controller/model/ProjetActiviteRecherche.model';
import {RoleProjetVo} from '../../../../../controller/model/RoleProjet.model';
import {ProjetActiviteRechercheDetailEtablissementLanceurVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailEtablissementLanceur.model';
import {StatusProjetVo} from '../../../../../controller/model/StatusProjet.model';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {ProjetActiviteRechercheDetailInstitutionCoContractantVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailInstitutionCoContractant.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {ProjetActiviteRechercheDetailEnjeuxIrdVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailEnjeuxIrd.model';
import {ProjetActiviteRechercheDetailInstrumentIrdVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailInstrumentIrd.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-projet-activite-recherche-detail-list-chercheur',
  templateUrl: './projet-activite-recherche-detail-list-chercheur.component.html',
  styleUrls: ['./projet-activite-recherche-detail-list-chercheur.component.css']
})
export class ProjetActiviteRechercheDetailListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ProjetActiviteRechercheDetail';
     yesOrNoFinancementSpecifique :any[] =[];
    statusProjets :Array<StatusProjetVo>;
    roleProjets :Array<RoleProjetVo>;
    etablissements :Array<EtablissementVo>;
    payss :Array<PaysVo>;
    projetActiviteRecherches :Array<ProjetActiviteRechercheVo>;
    etatEtapeCampagnes :Array<EtatEtapeCampagneVo>;


    constructor(private datePipe: DatePipe, private projetActiviteRechercheDetailService: ProjetActiviteRechercheDetailService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private statusProjetService: StatusProjetService
        , private roleProjetService: RoleProjetService
        , private etablissementService: EtablissementService
        , private paysService: PaysService
        , private projetActiviteRechercheService: ProjetActiviteRechercheService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
) { }

    ngOnInit(): void {
      this.loadProjetActiviteRechercheDetails();
      this.initExport();
      this.initCol();
      this.loadStatusProjet();
      this.loadRoleProjet();
      this.loadEtablissement();
      this.loadPays();
      this.loadProjetActiviteRecherche();
      this.loadEtatEtapeCampagne();
    this.yesOrNoFinancementSpecifique =  [{label: 'FinancementSpecifique', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadProjetActiviteRechercheDetails(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetail', 'list');
        isPermistted ? this.projetActiviteRechercheDetailService.findAll().subscribe(projetActiviteRechercheDetails => this.projetActiviteRechercheDetails = projetActiviteRechercheDetails,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.projetActiviteRechercheDetailService.findByCriteria(this.searchProjetActiviteRechercheDetail).subscribe(projetActiviteRechercheDetails=>{
            
            this.projetActiviteRechercheDetails = projetActiviteRechercheDetails;
           // this.searchProjetActiviteRechercheDetail = new ProjetActiviteRechercheDetailVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'statusProjet?.libelle', header: 'Status projet'},
                            {field: 'sujetIntituleReponse', header: 'Sujet intitule reponse'},
                            {field: 'dureePrevuEnMois', header: 'Duree prevu en mois'},
                        {field: 'roleProjet?.libelle', header: 'Role projet'},
                            {field: 'financementSpecifique', header: 'Financement specifique'},
                            {field: 'montantFinancementPrevu', header: 'Montant financement prevu'},
                        {field: 'etablissement?.libelle', header: 'Etablissement'},
                        {field: 'pays?.libelle', header: 'Pays'},
                        {field: 'projetActiviteRecherche?.id', header: 'Projet activite recherche'},
                        {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
        ];
    }
    
    public async editProjetActiviteRechercheDetail(projetActiviteRechercheDetail:ProjetActiviteRechercheDetailVo){
        const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetail', 'edit');
         if(isPermistted){
          this.projetActiviteRechercheDetailService.findByIdWithAssociatedList(projetActiviteRechercheDetail).subscribe(res => {
           this.selectedProjetActiviteRechercheDetail = res;
            this.editProjetActiviteRechercheDetailDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewProjetActiviteRechercheDetail(projetActiviteRechercheDetail:ProjetActiviteRechercheDetailVo){
        const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetail', 'view');
        if(isPermistted){
           this.projetActiviteRechercheDetailService.findByIdWithAssociatedList(projetActiviteRechercheDetail).subscribe(res => {
           this.selectedProjetActiviteRechercheDetail = res;
            this.viewProjetActiviteRechercheDetailDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateProjetActiviteRechercheDetail(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedProjetActiviteRechercheDetail = new ProjetActiviteRechercheDetailVo();
            this.createProjetActiviteRechercheDetailDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteProjetActiviteRechercheDetail(projetActiviteRechercheDetail:ProjetActiviteRechercheDetailVo){
       const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetail', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Projet activite recherche detail) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.projetActiviteRechercheDetailService.delete(projetActiviteRechercheDetail).subscribe(status=>{
                          if(status > 0){
                          const position = this.projetActiviteRechercheDetails.indexOf(projetActiviteRechercheDetail);
                          position > -1 ? this.projetActiviteRechercheDetails.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Projet activite recherche detail Supprimé',
                        life: 3000
                    });
                                     }

                    },error=>console.log(error))
                             }
                     });
              }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
              });
             }
    }

public async loadStatusProjet(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetail', 'list');
    isPermistted ? this.statusProjetService.findAll().subscribe(statusProjets => this.statusProjets = statusProjets,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadRoleProjet(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetail', 'list');
    isPermistted ? this.roleProjetService.findAll().subscribe(roleProjets => this.roleProjets = roleProjets,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtablissement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetail', 'list');
    isPermistted ? this.etablissementService.findAll().subscribe(etablissements => this.etablissements = etablissements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPays(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetail', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadProjetActiviteRecherche(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetail', 'list');
    isPermistted ? this.projetActiviteRechercheService.findAll().subscribe(projetActiviteRecherches => this.projetActiviteRecherches = projetActiviteRecherches,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatEtapeCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetail', 'list');
    isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateProjetActiviteRechercheDetail(projetActiviteRechercheDetail: ProjetActiviteRechercheDetailVo) {

     this.projetActiviteRechercheDetailService.findByIdWithAssociatedList(projetActiviteRechercheDetail).subscribe(
	 res => {
	       this.initDuplicateProjetActiviteRechercheDetail(res);
	       this.selectedProjetActiviteRechercheDetail = res;
	       this.selectedProjetActiviteRechercheDetail.id = null;
            this.createProjetActiviteRechercheDetailDialog = true;

});

	}

	initDuplicateProjetActiviteRechercheDetail(res: ProjetActiviteRechercheDetailVo) {
        if (res.projetActiviteRechercheDetailEnjeuxIrdsVo != null) {
             res.projetActiviteRechercheDetailEnjeuxIrdsVo.forEach(d => { d.projetActiviteRechercheDetailVo = null; d.id = null; });
                }
        if (res.projetActiviteRechercheDetailInstrumentIrdsVo != null) {
             res.projetActiviteRechercheDetailInstrumentIrdsVo.forEach(d => { d.projetActiviteRechercheDetailVo = null; d.id = null; });
                }
        if (res.projetActiviteRechercheDetailPayssVo != null) {
             res.projetActiviteRechercheDetailPayssVo.forEach(d => { d.projetActiviteRechercheDetailVo = null; d.id = null; });
                }
        if (res.projetActiviteRechercheDetailInstitutionCoContractantsVo != null) {
             res.projetActiviteRechercheDetailInstitutionCoContractantsVo.forEach(d => { d.projetActiviteRechercheDetailVo = null; d.id = null; });
                }
        if (res.projetActiviteRechercheDetailEtablissementLanceursVo != null) {
             res.projetActiviteRechercheDetailEtablissementLanceursVo.forEach(d => { d.projetActiviteRechercheDetailVo = null; d.id = null; });
                }


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.projetActiviteRechercheDetails.map(e => {
    return {
            'Status projet': e.statusProjetVo?.libelle ,
                    'Sujet intitule reponse': e.sujetIntituleReponse ,
                    'Duree prevu en mois': e.dureePrevuEnMois ,
            'Role projet': e.roleProjetVo?.libelle ,
                    'Financement specifique': e.financementSpecifique? 'Vrai' : 'Faux' ,
                    'Montant financement prevu': e.montantFinancementPrevu ,
            'Etablissement': e.etablissementVo?.libelle ,
            'Pays': e.paysVo?.libelle ,
            'Projet activite recherche': e.projetActiviteRechercheVo?.id ,
            'Etat etape campagne': e.etatEtapeCampagneVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Status projet': this.searchProjetActiviteRechercheDetail.statusProjetVo?.libelle ? this.searchProjetActiviteRechercheDetail.statusProjetVo?.libelle : environment.emptyForExport ,
            'Sujet intitule reponse': this.searchProjetActiviteRechercheDetail.sujetIntituleReponse ? this.searchProjetActiviteRechercheDetail.sujetIntituleReponse : environment.emptyForExport ,
            'Duree prevu en mois Min': this.searchProjetActiviteRechercheDetail.dureePrevuEnMoisMin ? this.searchProjetActiviteRechercheDetail.dureePrevuEnMoisMin : environment.emptyForExport ,
            'Duree prevu en mois Max': this.searchProjetActiviteRechercheDetail.dureePrevuEnMoisMax ? this.searchProjetActiviteRechercheDetail.dureePrevuEnMoisMax : environment.emptyForExport ,
        'Role projet': this.searchProjetActiviteRechercheDetail.roleProjetVo?.libelle ? this.searchProjetActiviteRechercheDetail.roleProjetVo?.libelle : environment.emptyForExport ,
            'Financement specifique': this.searchProjetActiviteRechercheDetail.financementSpecifique ? (this.searchProjetActiviteRechercheDetail.financementSpecifique ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Montant financement prevu Min': this.searchProjetActiviteRechercheDetail.montantFinancementPrevuMin ? this.searchProjetActiviteRechercheDetail.montantFinancementPrevuMin : environment.emptyForExport ,
            'Montant financement prevu Max': this.searchProjetActiviteRechercheDetail.montantFinancementPrevuMax ? this.searchProjetActiviteRechercheDetail.montantFinancementPrevuMax : environment.emptyForExport ,
        'Etablissement': this.searchProjetActiviteRechercheDetail.etablissementVo?.libelle ? this.searchProjetActiviteRechercheDetail.etablissementVo?.libelle : environment.emptyForExport ,
        'Pays': this.searchProjetActiviteRechercheDetail.paysVo?.libelle ? this.searchProjetActiviteRechercheDetail.paysVo?.libelle : environment.emptyForExport ,
        'Projet activite recherche': this.searchProjetActiviteRechercheDetail.projetActiviteRechercheVo?.id ? this.searchProjetActiviteRechercheDetail.projetActiviteRechercheVo?.id : environment.emptyForExport ,
        'Etat etape campagne': this.searchProjetActiviteRechercheDetail.etatEtapeCampagneVo?.libelle ? this.searchProjetActiviteRechercheDetail.etatEtapeCampagneVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get projetActiviteRechercheDetails(): Array<ProjetActiviteRechercheDetailVo> {
           return this.projetActiviteRechercheDetailService.projetActiviteRechercheDetails;
       }
    set projetActiviteRechercheDetails(value: Array<ProjetActiviteRechercheDetailVo>) {
        this.projetActiviteRechercheDetailService.projetActiviteRechercheDetails = value;
       }

    get projetActiviteRechercheDetailSelections(): Array<ProjetActiviteRechercheDetailVo> {
           return this.projetActiviteRechercheDetailService.projetActiviteRechercheDetailSelections;
       }
    set projetActiviteRechercheDetailSelections(value: Array<ProjetActiviteRechercheDetailVo>) {
        this.projetActiviteRechercheDetailService.projetActiviteRechercheDetailSelections = value;
       }
   
     


    get selectedProjetActiviteRechercheDetail():ProjetActiviteRechercheDetailVo {
           return this.projetActiviteRechercheDetailService.selectedProjetActiviteRechercheDetail;
       }
    set selectedProjetActiviteRechercheDetail(value: ProjetActiviteRechercheDetailVo) {
        this.projetActiviteRechercheDetailService.selectedProjetActiviteRechercheDetail = value;
       }
    
    get createProjetActiviteRechercheDetailDialog():boolean {
           return this.projetActiviteRechercheDetailService.createProjetActiviteRechercheDetailDialog;
       }
    set createProjetActiviteRechercheDetailDialog(value: boolean) {
        this.projetActiviteRechercheDetailService.createProjetActiviteRechercheDetailDialog= value;
       }
    
    get editProjetActiviteRechercheDetailDialog():boolean {
           return this.projetActiviteRechercheDetailService.editProjetActiviteRechercheDetailDialog;
       }
    set editProjetActiviteRechercheDetailDialog(value: boolean) {
        this.projetActiviteRechercheDetailService.editProjetActiviteRechercheDetailDialog= value;
       }
    get viewProjetActiviteRechercheDetailDialog():boolean {
           return this.projetActiviteRechercheDetailService.viewProjetActiviteRechercheDetailDialog;
       }
    set viewProjetActiviteRechercheDetailDialog(value: boolean) {
        this.projetActiviteRechercheDetailService.viewProjetActiviteRechercheDetailDialog = value;
       }
       
     get searchProjetActiviteRechercheDetail(): ProjetActiviteRechercheDetailVo {
        return this.projetActiviteRechercheDetailService.searchProjetActiviteRechercheDetail;
       }
    set searchProjetActiviteRechercheDetail(value: ProjetActiviteRechercheDetailVo) {
        this.projetActiviteRechercheDetailService.searchProjetActiviteRechercheDetail = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
