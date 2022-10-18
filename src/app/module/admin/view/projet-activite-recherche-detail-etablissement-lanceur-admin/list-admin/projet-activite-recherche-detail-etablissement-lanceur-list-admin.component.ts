import {Component, OnInit} from '@angular/core';
import {ProjetActiviteRechercheDetailEtablissementLanceurService} from '../../../../../controller/service/ProjetActiviteRechercheDetailEtablissementLanceur.service';
import {ProjetActiviteRechercheDetailEtablissementLanceurVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailEtablissementLanceur.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EtablissementService } from '../../../../../controller/service/Etablissement.service';
import { ProjetActiviteRechercheDetailService } from '../../../../../controller/service/ProjetActiviteRechercheDetail.service';

import {ProjetActiviteRechercheDetailVo} from '../../../../../controller/model/ProjetActiviteRechercheDetail.model';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-projet-activite-recherche-detail-etablissement-lanceur-list-admin',
  templateUrl: './projet-activite-recherche-detail-etablissement-lanceur-list-admin.component.html',
  styleUrls: ['./projet-activite-recherche-detail-etablissement-lanceur-list-admin.component.css']
})
export class ProjetActiviteRechercheDetailEtablissementLanceurListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ProjetActiviteRechercheDetailEtablissementLanceur';
    etablissements :Array<EtablissementVo>;
    projetActiviteRechercheDetails :Array<ProjetActiviteRechercheDetailVo>;


    constructor(private datePipe: DatePipe, private projetActiviteRechercheDetailEtablissementLanceurService: ProjetActiviteRechercheDetailEtablissementLanceurService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private etablissementService: EtablissementService
        , private projetActiviteRechercheDetailService: ProjetActiviteRechercheDetailService
) { }

    ngOnInit(): void {
      this.loadProjetActiviteRechercheDetailEtablissementLanceurs();
      this.initExport();
      this.initCol();
      this.loadEtablissement();
      this.loadProjetActiviteRechercheDetail();
    }
    
    // methods
      public async loadProjetActiviteRechercheDetailEtablissementLanceurs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailEtablissementLanceur', 'list');
        isPermistted ? this.projetActiviteRechercheDetailEtablissementLanceurService.findAll().subscribe(projetActiviteRechercheDetailEtablissementLanceurs => this.projetActiviteRechercheDetailEtablissementLanceurs = projetActiviteRechercheDetailEtablissementLanceurs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.projetActiviteRechercheDetailEtablissementLanceurService.findByCriteria(this.searchProjetActiviteRechercheDetailEtablissementLanceur).subscribe(projetActiviteRechercheDetailEtablissementLanceurs=>{
            
            this.projetActiviteRechercheDetailEtablissementLanceurs = projetActiviteRechercheDetailEtablissementLanceurs;
           // this.searchProjetActiviteRechercheDetailEtablissementLanceur = new ProjetActiviteRechercheDetailEtablissementLanceurVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'etablissement?.libelle', header: 'Etablissement'},
                        {field: 'projetActiviteRechercheDetail?.id', header: 'Projet activite recherche detail'},
        ];
    }
    
    public async editProjetActiviteRechercheDetailEtablissementLanceur(projetActiviteRechercheDetailEtablissementLanceur:ProjetActiviteRechercheDetailEtablissementLanceurVo){
        const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailEtablissementLanceur', 'edit');
         if(isPermistted){
          this.projetActiviteRechercheDetailEtablissementLanceurService.findByIdWithAssociatedList(projetActiviteRechercheDetailEtablissementLanceur).subscribe(res => {
           this.selectedProjetActiviteRechercheDetailEtablissementLanceur = res;
            this.editProjetActiviteRechercheDetailEtablissementLanceurDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewProjetActiviteRechercheDetailEtablissementLanceur(projetActiviteRechercheDetailEtablissementLanceur:ProjetActiviteRechercheDetailEtablissementLanceurVo){
        const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailEtablissementLanceur', 'view');
        if(isPermistted){
           this.projetActiviteRechercheDetailEtablissementLanceurService.findByIdWithAssociatedList(projetActiviteRechercheDetailEtablissementLanceur).subscribe(res => {
           this.selectedProjetActiviteRechercheDetailEtablissementLanceur = res;
            this.viewProjetActiviteRechercheDetailEtablissementLanceurDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateProjetActiviteRechercheDetailEtablissementLanceur(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedProjetActiviteRechercheDetailEtablissementLanceur = new ProjetActiviteRechercheDetailEtablissementLanceurVo();
            this.createProjetActiviteRechercheDetailEtablissementLanceurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteProjetActiviteRechercheDetailEtablissementLanceur(projetActiviteRechercheDetailEtablissementLanceur:ProjetActiviteRechercheDetailEtablissementLanceurVo){
       const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailEtablissementLanceur', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Projet activite recherche detail etablissement lanceur) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.projetActiviteRechercheDetailEtablissementLanceurService.delete(projetActiviteRechercheDetailEtablissementLanceur).subscribe(status=>{
                          if(status > 0){
                          const position = this.projetActiviteRechercheDetailEtablissementLanceurs.indexOf(projetActiviteRechercheDetailEtablissementLanceur);
                          position > -1 ? this.projetActiviteRechercheDetailEtablissementLanceurs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Projet activite recherche detail etablissement lanceur Supprimé',
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

public async loadEtablissement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailEtablissementLanceur', 'list');
    isPermistted ? this.etablissementService.findAll().subscribe(etablissements => this.etablissements = etablissements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadProjetActiviteRechercheDetail(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailEtablissementLanceur', 'list');
    isPermistted ? this.projetActiviteRechercheDetailService.findAll().subscribe(projetActiviteRechercheDetails => this.projetActiviteRechercheDetails = projetActiviteRechercheDetails,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateProjetActiviteRechercheDetailEtablissementLanceur(projetActiviteRechercheDetailEtablissementLanceur: ProjetActiviteRechercheDetailEtablissementLanceurVo) {

     this.projetActiviteRechercheDetailEtablissementLanceurService.findByIdWithAssociatedList(projetActiviteRechercheDetailEtablissementLanceur).subscribe(
	 res => {
	       this.initDuplicateProjetActiviteRechercheDetailEtablissementLanceur(res);
	       this.selectedProjetActiviteRechercheDetailEtablissementLanceur = res;
	       this.selectedProjetActiviteRechercheDetailEtablissementLanceur.id = null;
            this.createProjetActiviteRechercheDetailEtablissementLanceurDialog = true;

});

	}

	initDuplicateProjetActiviteRechercheDetailEtablissementLanceur(res: ProjetActiviteRechercheDetailEtablissementLanceurVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.projetActiviteRechercheDetailEtablissementLanceurs.map(e => {
    return {
            'Etablissement': e.etablissementVo?.libelle ,
            'Projet activite recherche detail': e.projetActiviteRechercheDetailVo?.id ,
     }
      });

      this.criteriaData = [{
        'Etablissement': this.searchProjetActiviteRechercheDetailEtablissementLanceur.etablissementVo?.libelle ? this.searchProjetActiviteRechercheDetailEtablissementLanceur.etablissementVo?.libelle : environment.emptyForExport ,
        'Projet activite recherche detail': this.searchProjetActiviteRechercheDetailEtablissementLanceur.projetActiviteRechercheDetailVo?.id ? this.searchProjetActiviteRechercheDetailEtablissementLanceur.projetActiviteRechercheDetailVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get projetActiviteRechercheDetailEtablissementLanceurs(): Array<ProjetActiviteRechercheDetailEtablissementLanceurVo> {
           return this.projetActiviteRechercheDetailEtablissementLanceurService.projetActiviteRechercheDetailEtablissementLanceurs;
       }
    set projetActiviteRechercheDetailEtablissementLanceurs(value: Array<ProjetActiviteRechercheDetailEtablissementLanceurVo>) {
        this.projetActiviteRechercheDetailEtablissementLanceurService.projetActiviteRechercheDetailEtablissementLanceurs = value;
       }

    get projetActiviteRechercheDetailEtablissementLanceurSelections(): Array<ProjetActiviteRechercheDetailEtablissementLanceurVo> {
           return this.projetActiviteRechercheDetailEtablissementLanceurService.projetActiviteRechercheDetailEtablissementLanceurSelections;
       }
    set projetActiviteRechercheDetailEtablissementLanceurSelections(value: Array<ProjetActiviteRechercheDetailEtablissementLanceurVo>) {
        this.projetActiviteRechercheDetailEtablissementLanceurService.projetActiviteRechercheDetailEtablissementLanceurSelections = value;
       }
   
     


    get selectedProjetActiviteRechercheDetailEtablissementLanceur():ProjetActiviteRechercheDetailEtablissementLanceurVo {
           return this.projetActiviteRechercheDetailEtablissementLanceurService.selectedProjetActiviteRechercheDetailEtablissementLanceur;
       }
    set selectedProjetActiviteRechercheDetailEtablissementLanceur(value: ProjetActiviteRechercheDetailEtablissementLanceurVo) {
        this.projetActiviteRechercheDetailEtablissementLanceurService.selectedProjetActiviteRechercheDetailEtablissementLanceur = value;
       }
    
    get createProjetActiviteRechercheDetailEtablissementLanceurDialog():boolean {
           return this.projetActiviteRechercheDetailEtablissementLanceurService.createProjetActiviteRechercheDetailEtablissementLanceurDialog;
       }
    set createProjetActiviteRechercheDetailEtablissementLanceurDialog(value: boolean) {
        this.projetActiviteRechercheDetailEtablissementLanceurService.createProjetActiviteRechercheDetailEtablissementLanceurDialog= value;
       }
    
    get editProjetActiviteRechercheDetailEtablissementLanceurDialog():boolean {
           return this.projetActiviteRechercheDetailEtablissementLanceurService.editProjetActiviteRechercheDetailEtablissementLanceurDialog;
       }
    set editProjetActiviteRechercheDetailEtablissementLanceurDialog(value: boolean) {
        this.projetActiviteRechercheDetailEtablissementLanceurService.editProjetActiviteRechercheDetailEtablissementLanceurDialog= value;
       }
    get viewProjetActiviteRechercheDetailEtablissementLanceurDialog():boolean {
           return this.projetActiviteRechercheDetailEtablissementLanceurService.viewProjetActiviteRechercheDetailEtablissementLanceurDialog;
       }
    set viewProjetActiviteRechercheDetailEtablissementLanceurDialog(value: boolean) {
        this.projetActiviteRechercheDetailEtablissementLanceurService.viewProjetActiviteRechercheDetailEtablissementLanceurDialog = value;
       }
       
     get searchProjetActiviteRechercheDetailEtablissementLanceur(): ProjetActiviteRechercheDetailEtablissementLanceurVo {
        return this.projetActiviteRechercheDetailEtablissementLanceurService.searchProjetActiviteRechercheDetailEtablissementLanceur;
       }
    set searchProjetActiviteRechercheDetailEtablissementLanceur(value: ProjetActiviteRechercheDetailEtablissementLanceurVo) {
        this.projetActiviteRechercheDetailEtablissementLanceurService.searchProjetActiviteRechercheDetailEtablissementLanceur = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
