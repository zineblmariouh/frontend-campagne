import {Component, OnInit} from '@angular/core';
import {ProjetActiviteRechercheDetailInstitutionCoContractantService} from '../../../../../controller/service/ProjetActiviteRechercheDetailInstitutionCoContractant.service';
import {ProjetActiviteRechercheDetailInstitutionCoContractantVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailInstitutionCoContractant.model';
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
  selector: 'app-projet-activite-recherche-detail-institution-co-contractant-list-admin',
  templateUrl: './projet-activite-recherche-detail-institution-co-contractant-list-admin.component.html',
  styleUrls: ['./projet-activite-recherche-detail-institution-co-contractant-list-admin.component.css']
})
export class ProjetActiviteRechercheDetailInstitutionCoContractantListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ProjetActiviteRechercheDetailInstitutionCoContractant';
    etablissements :Array<EtablissementVo>;
    projetActiviteRechercheDetails :Array<ProjetActiviteRechercheDetailVo>;


    constructor(private datePipe: DatePipe, private projetActiviteRechercheDetailInstitutionCoContractantService: ProjetActiviteRechercheDetailInstitutionCoContractantService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private etablissementService: EtablissementService
        , private projetActiviteRechercheDetailService: ProjetActiviteRechercheDetailService
) { }

    ngOnInit(): void {
      this.loadProjetActiviteRechercheDetailInstitutionCoContractants();
      this.initExport();
      this.initCol();
      this.loadEtablissement();
      this.loadProjetActiviteRechercheDetail();
    }
    
    // methods
      public async loadProjetActiviteRechercheDetailInstitutionCoContractants(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailInstitutionCoContractant', 'list');
        isPermistted ? this.projetActiviteRechercheDetailInstitutionCoContractantService.findAll().subscribe(projetActiviteRechercheDetailInstitutionCoContractants => this.projetActiviteRechercheDetailInstitutionCoContractants = projetActiviteRechercheDetailInstitutionCoContractants,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.projetActiviteRechercheDetailInstitutionCoContractantService.findByCriteria(this.searchProjetActiviteRechercheDetailInstitutionCoContractant).subscribe(projetActiviteRechercheDetailInstitutionCoContractants=>{
            
            this.projetActiviteRechercheDetailInstitutionCoContractants = projetActiviteRechercheDetailInstitutionCoContractants;
           // this.searchProjetActiviteRechercheDetailInstitutionCoContractant = new ProjetActiviteRechercheDetailInstitutionCoContractantVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'etablissement?.libelle', header: 'Etablissement'},
                        {field: 'projetActiviteRechercheDetail?.id', header: 'Projet activite recherche detail'},
        ];
    }
    
    public async editProjetActiviteRechercheDetailInstitutionCoContractant(projetActiviteRechercheDetailInstitutionCoContractant:ProjetActiviteRechercheDetailInstitutionCoContractantVo){
        const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailInstitutionCoContractant', 'edit');
         if(isPermistted){
          this.projetActiviteRechercheDetailInstitutionCoContractantService.findByIdWithAssociatedList(projetActiviteRechercheDetailInstitutionCoContractant).subscribe(res => {
           this.selectedProjetActiviteRechercheDetailInstitutionCoContractant = res;
            this.editProjetActiviteRechercheDetailInstitutionCoContractantDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewProjetActiviteRechercheDetailInstitutionCoContractant(projetActiviteRechercheDetailInstitutionCoContractant:ProjetActiviteRechercheDetailInstitutionCoContractantVo){
        const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailInstitutionCoContractant', 'view');
        if(isPermistted){
           this.projetActiviteRechercheDetailInstitutionCoContractantService.findByIdWithAssociatedList(projetActiviteRechercheDetailInstitutionCoContractant).subscribe(res => {
           this.selectedProjetActiviteRechercheDetailInstitutionCoContractant = res;
            this.viewProjetActiviteRechercheDetailInstitutionCoContractantDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateProjetActiviteRechercheDetailInstitutionCoContractant(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedProjetActiviteRechercheDetailInstitutionCoContractant = new ProjetActiviteRechercheDetailInstitutionCoContractantVo();
            this.createProjetActiviteRechercheDetailInstitutionCoContractantDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteProjetActiviteRechercheDetailInstitutionCoContractant(projetActiviteRechercheDetailInstitutionCoContractant:ProjetActiviteRechercheDetailInstitutionCoContractantVo){
       const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailInstitutionCoContractant', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Projet activite recherche detail institution co contractant) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.projetActiviteRechercheDetailInstitutionCoContractantService.delete(projetActiviteRechercheDetailInstitutionCoContractant).subscribe(status=>{
                          if(status > 0){
                          const position = this.projetActiviteRechercheDetailInstitutionCoContractants.indexOf(projetActiviteRechercheDetailInstitutionCoContractant);
                          position > -1 ? this.projetActiviteRechercheDetailInstitutionCoContractants.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Projet activite recherche detail institution co contractant Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailInstitutionCoContractant', 'list');
    isPermistted ? this.etablissementService.findAll().subscribe(etablissements => this.etablissements = etablissements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadProjetActiviteRechercheDetail(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailInstitutionCoContractant', 'list');
    isPermistted ? this.projetActiviteRechercheDetailService.findAll().subscribe(projetActiviteRechercheDetails => this.projetActiviteRechercheDetails = projetActiviteRechercheDetails,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateProjetActiviteRechercheDetailInstitutionCoContractant(projetActiviteRechercheDetailInstitutionCoContractant: ProjetActiviteRechercheDetailInstitutionCoContractantVo) {

     this.projetActiviteRechercheDetailInstitutionCoContractantService.findByIdWithAssociatedList(projetActiviteRechercheDetailInstitutionCoContractant).subscribe(
	 res => {
	       this.initDuplicateProjetActiviteRechercheDetailInstitutionCoContractant(res);
	       this.selectedProjetActiviteRechercheDetailInstitutionCoContractant = res;
	       this.selectedProjetActiviteRechercheDetailInstitutionCoContractant.id = null;
            this.createProjetActiviteRechercheDetailInstitutionCoContractantDialog = true;

});

	}

	initDuplicateProjetActiviteRechercheDetailInstitutionCoContractant(res: ProjetActiviteRechercheDetailInstitutionCoContractantVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.projetActiviteRechercheDetailInstitutionCoContractants.map(e => {
    return {
            'Etablissement': e.etablissementVo?.libelle ,
            'Projet activite recherche detail': e.projetActiviteRechercheDetailVo?.id ,
     }
      });

      this.criteriaData = [{
        'Etablissement': this.searchProjetActiviteRechercheDetailInstitutionCoContractant.etablissementVo?.libelle ? this.searchProjetActiviteRechercheDetailInstitutionCoContractant.etablissementVo?.libelle : environment.emptyForExport ,
        'Projet activite recherche detail': this.searchProjetActiviteRechercheDetailInstitutionCoContractant.projetActiviteRechercheDetailVo?.id ? this.searchProjetActiviteRechercheDetailInstitutionCoContractant.projetActiviteRechercheDetailVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get projetActiviteRechercheDetailInstitutionCoContractants(): Array<ProjetActiviteRechercheDetailInstitutionCoContractantVo> {
           return this.projetActiviteRechercheDetailInstitutionCoContractantService.projetActiviteRechercheDetailInstitutionCoContractants;
       }
    set projetActiviteRechercheDetailInstitutionCoContractants(value: Array<ProjetActiviteRechercheDetailInstitutionCoContractantVo>) {
        this.projetActiviteRechercheDetailInstitutionCoContractantService.projetActiviteRechercheDetailInstitutionCoContractants = value;
       }

    get projetActiviteRechercheDetailInstitutionCoContractantSelections(): Array<ProjetActiviteRechercheDetailInstitutionCoContractantVo> {
           return this.projetActiviteRechercheDetailInstitutionCoContractantService.projetActiviteRechercheDetailInstitutionCoContractantSelections;
       }
    set projetActiviteRechercheDetailInstitutionCoContractantSelections(value: Array<ProjetActiviteRechercheDetailInstitutionCoContractantVo>) {
        this.projetActiviteRechercheDetailInstitutionCoContractantService.projetActiviteRechercheDetailInstitutionCoContractantSelections = value;
       }
   
     


    get selectedProjetActiviteRechercheDetailInstitutionCoContractant():ProjetActiviteRechercheDetailInstitutionCoContractantVo {
           return this.projetActiviteRechercheDetailInstitutionCoContractantService.selectedProjetActiviteRechercheDetailInstitutionCoContractant;
       }
    set selectedProjetActiviteRechercheDetailInstitutionCoContractant(value: ProjetActiviteRechercheDetailInstitutionCoContractantVo) {
        this.projetActiviteRechercheDetailInstitutionCoContractantService.selectedProjetActiviteRechercheDetailInstitutionCoContractant = value;
       }
    
    get createProjetActiviteRechercheDetailInstitutionCoContractantDialog():boolean {
           return this.projetActiviteRechercheDetailInstitutionCoContractantService.createProjetActiviteRechercheDetailInstitutionCoContractantDialog;
       }
    set createProjetActiviteRechercheDetailInstitutionCoContractantDialog(value: boolean) {
        this.projetActiviteRechercheDetailInstitutionCoContractantService.createProjetActiviteRechercheDetailInstitutionCoContractantDialog= value;
       }
    
    get editProjetActiviteRechercheDetailInstitutionCoContractantDialog():boolean {
           return this.projetActiviteRechercheDetailInstitutionCoContractantService.editProjetActiviteRechercheDetailInstitutionCoContractantDialog;
       }
    set editProjetActiviteRechercheDetailInstitutionCoContractantDialog(value: boolean) {
        this.projetActiviteRechercheDetailInstitutionCoContractantService.editProjetActiviteRechercheDetailInstitutionCoContractantDialog= value;
       }
    get viewProjetActiviteRechercheDetailInstitutionCoContractantDialog():boolean {
           return this.projetActiviteRechercheDetailInstitutionCoContractantService.viewProjetActiviteRechercheDetailInstitutionCoContractantDialog;
       }
    set viewProjetActiviteRechercheDetailInstitutionCoContractantDialog(value: boolean) {
        this.projetActiviteRechercheDetailInstitutionCoContractantService.viewProjetActiviteRechercheDetailInstitutionCoContractantDialog = value;
       }
       
     get searchProjetActiviteRechercheDetailInstitutionCoContractant(): ProjetActiviteRechercheDetailInstitutionCoContractantVo {
        return this.projetActiviteRechercheDetailInstitutionCoContractantService.searchProjetActiviteRechercheDetailInstitutionCoContractant;
       }
    set searchProjetActiviteRechercheDetailInstitutionCoContractant(value: ProjetActiviteRechercheDetailInstitutionCoContractantVo) {
        this.projetActiviteRechercheDetailInstitutionCoContractantService.searchProjetActiviteRechercheDetailInstitutionCoContractant = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
