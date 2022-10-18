import {Component, OnInit} from '@angular/core';
import {CommunauteSavoirProjetActiviteRechercheService} from '../../../../../controller/service/CommunauteSavoirProjetActiviteRecherche.service';
import {CommunauteSavoirProjetActiviteRechercheVo} from '../../../../../controller/model/CommunauteSavoirProjetActiviteRecherche.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ProjetActiviteRechercheService } from '../../../../../controller/service/ProjetActiviteRecherche.service';
import { CommunauteSavoirService } from '../../../../../controller/service/CommunauteSavoir.service';

import {ProjetActiviteRechercheVo} from '../../../../../controller/model/ProjetActiviteRecherche.model';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-communaute-savoir-projet-activite-recherche-list-chercheur',
  templateUrl: './communaute-savoir-projet-activite-recherche-list-chercheur.component.html',
  styleUrls: ['./communaute-savoir-projet-activite-recherche-list-chercheur.component.css']
})
export class CommunauteSavoirProjetActiviteRechercheListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CommunauteSavoirProjetActiviteRecherche';
    projetActiviteRecherches :Array<ProjetActiviteRechercheVo>;
    communauteSavoirs :Array<CommunauteSavoirVo>;


    constructor(private datePipe: DatePipe, private communauteSavoirProjetActiviteRechercheService: CommunauteSavoirProjetActiviteRechercheService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private projetActiviteRechercheService: ProjetActiviteRechercheService
        , private communauteSavoirService: CommunauteSavoirService
) { }

    ngOnInit(): void {
      this.loadCommunauteSavoirProjetActiviteRecherches();
      this.initExport();
      this.initCol();
      this.loadProjetActiviteRecherche();
      this.loadCommunauteSavoir();
    }
    
    // methods
      public async loadCommunauteSavoirProjetActiviteRecherches(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirProjetActiviteRecherche', 'list');
        isPermistted ? this.communauteSavoirProjetActiviteRechercheService.findAll().subscribe(communauteSavoirProjetActiviteRecherches => this.communauteSavoirProjetActiviteRecherches = communauteSavoirProjetActiviteRecherches,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.communauteSavoirProjetActiviteRechercheService.findByCriteria(this.searchCommunauteSavoirProjetActiviteRecherche).subscribe(communauteSavoirProjetActiviteRecherches=>{
            
            this.communauteSavoirProjetActiviteRecherches = communauteSavoirProjetActiviteRecherches;
           // this.searchCommunauteSavoirProjetActiviteRecherche = new CommunauteSavoirProjetActiviteRechercheVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'projetActiviteRecherche?.id', header: 'Projet activite recherche'},
                        {field: 'communauteSavoir?.libelle', header: 'Communaute savoir'},
        ];
    }
    
    public async editCommunauteSavoirProjetActiviteRecherche(communauteSavoirProjetActiviteRecherche:CommunauteSavoirProjetActiviteRechercheVo){
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirProjetActiviteRecherche', 'edit');
         if(isPermistted){
          this.communauteSavoirProjetActiviteRechercheService.findByIdWithAssociatedList(communauteSavoirProjetActiviteRecherche).subscribe(res => {
           this.selectedCommunauteSavoirProjetActiviteRecherche = res;
            this.editCommunauteSavoirProjetActiviteRechercheDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCommunauteSavoirProjetActiviteRecherche(communauteSavoirProjetActiviteRecherche:CommunauteSavoirProjetActiviteRechercheVo){
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirProjetActiviteRecherche', 'view');
        if(isPermistted){
           this.communauteSavoirProjetActiviteRechercheService.findByIdWithAssociatedList(communauteSavoirProjetActiviteRecherche).subscribe(res => {
           this.selectedCommunauteSavoirProjetActiviteRecherche = res;
            this.viewCommunauteSavoirProjetActiviteRechercheDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCommunauteSavoirProjetActiviteRecherche(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCommunauteSavoirProjetActiviteRecherche = new CommunauteSavoirProjetActiviteRechercheVo();
            this.createCommunauteSavoirProjetActiviteRechercheDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCommunauteSavoirProjetActiviteRecherche(communauteSavoirProjetActiviteRecherche:CommunauteSavoirProjetActiviteRechercheVo){
       const isPermistted = await this.roleService.isPermitted('CommunauteSavoirProjetActiviteRecherche', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Communaute savoir projet activite recherche) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.communauteSavoirProjetActiviteRechercheService.delete(communauteSavoirProjetActiviteRecherche).subscribe(status=>{
                          if(status > 0){
                          const position = this.communauteSavoirProjetActiviteRecherches.indexOf(communauteSavoirProjetActiviteRecherche);
                          position > -1 ? this.communauteSavoirProjetActiviteRecherches.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Communaute savoir projet activite recherche Supprimé',
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

public async loadProjetActiviteRecherche(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CommunauteSavoirProjetActiviteRecherche', 'list');
    isPermistted ? this.projetActiviteRechercheService.findAll().subscribe(projetActiviteRecherches => this.projetActiviteRecherches = projetActiviteRecherches,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadCommunauteSavoir(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CommunauteSavoirProjetActiviteRecherche', 'list');
    isPermistted ? this.communauteSavoirService.findAll().subscribe(communauteSavoirs => this.communauteSavoirs = communauteSavoirs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCommunauteSavoirProjetActiviteRecherche(communauteSavoirProjetActiviteRecherche: CommunauteSavoirProjetActiviteRechercheVo) {

     this.communauteSavoirProjetActiviteRechercheService.findByIdWithAssociatedList(communauteSavoirProjetActiviteRecherche).subscribe(
	 res => {
	       this.initDuplicateCommunauteSavoirProjetActiviteRecherche(res);
	       this.selectedCommunauteSavoirProjetActiviteRecherche = res;
	       this.selectedCommunauteSavoirProjetActiviteRecherche.id = null;
            this.createCommunauteSavoirProjetActiviteRechercheDialog = true;

});

	}

	initDuplicateCommunauteSavoirProjetActiviteRecherche(res: CommunauteSavoirProjetActiviteRechercheVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.communauteSavoirProjetActiviteRecherches.map(e => {
    return {
            'Projet activite recherche': e.projetActiviteRechercheVo?.id ,
            'Communaute savoir': e.communauteSavoirVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Projet activite recherche': this.searchCommunauteSavoirProjetActiviteRecherche.projetActiviteRechercheVo?.id ? this.searchCommunauteSavoirProjetActiviteRecherche.projetActiviteRechercheVo?.id : environment.emptyForExport ,
        'Communaute savoir': this.searchCommunauteSavoirProjetActiviteRecherche.communauteSavoirVo?.libelle ? this.searchCommunauteSavoirProjetActiviteRecherche.communauteSavoirVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get communauteSavoirProjetActiviteRecherches(): Array<CommunauteSavoirProjetActiviteRechercheVo> {
           return this.communauteSavoirProjetActiviteRechercheService.communauteSavoirProjetActiviteRecherches;
       }
    set communauteSavoirProjetActiviteRecherches(value: Array<CommunauteSavoirProjetActiviteRechercheVo>) {
        this.communauteSavoirProjetActiviteRechercheService.communauteSavoirProjetActiviteRecherches = value;
       }

    get communauteSavoirProjetActiviteRechercheSelections(): Array<CommunauteSavoirProjetActiviteRechercheVo> {
           return this.communauteSavoirProjetActiviteRechercheService.communauteSavoirProjetActiviteRechercheSelections;
       }
    set communauteSavoirProjetActiviteRechercheSelections(value: Array<CommunauteSavoirProjetActiviteRechercheVo>) {
        this.communauteSavoirProjetActiviteRechercheService.communauteSavoirProjetActiviteRechercheSelections = value;
       }
   
     


    get selectedCommunauteSavoirProjetActiviteRecherche():CommunauteSavoirProjetActiviteRechercheVo {
           return this.communauteSavoirProjetActiviteRechercheService.selectedCommunauteSavoirProjetActiviteRecherche;
       }
    set selectedCommunauteSavoirProjetActiviteRecherche(value: CommunauteSavoirProjetActiviteRechercheVo) {
        this.communauteSavoirProjetActiviteRechercheService.selectedCommunauteSavoirProjetActiviteRecherche = value;
       }
    
    get createCommunauteSavoirProjetActiviteRechercheDialog():boolean {
           return this.communauteSavoirProjetActiviteRechercheService.createCommunauteSavoirProjetActiviteRechercheDialog;
       }
    set createCommunauteSavoirProjetActiviteRechercheDialog(value: boolean) {
        this.communauteSavoirProjetActiviteRechercheService.createCommunauteSavoirProjetActiviteRechercheDialog= value;
       }
    
    get editCommunauteSavoirProjetActiviteRechercheDialog():boolean {
           return this.communauteSavoirProjetActiviteRechercheService.editCommunauteSavoirProjetActiviteRechercheDialog;
       }
    set editCommunauteSavoirProjetActiviteRechercheDialog(value: boolean) {
        this.communauteSavoirProjetActiviteRechercheService.editCommunauteSavoirProjetActiviteRechercheDialog= value;
       }
    get viewCommunauteSavoirProjetActiviteRechercheDialog():boolean {
           return this.communauteSavoirProjetActiviteRechercheService.viewCommunauteSavoirProjetActiviteRechercheDialog;
       }
    set viewCommunauteSavoirProjetActiviteRechercheDialog(value: boolean) {
        this.communauteSavoirProjetActiviteRechercheService.viewCommunauteSavoirProjetActiviteRechercheDialog = value;
       }
       
     get searchCommunauteSavoirProjetActiviteRecherche(): CommunauteSavoirProjetActiviteRechercheVo {
        return this.communauteSavoirProjetActiviteRechercheService.searchCommunauteSavoirProjetActiviteRecherche;
       }
    set searchCommunauteSavoirProjetActiviteRecherche(value: CommunauteSavoirProjetActiviteRechercheVo) {
        this.communauteSavoirProjetActiviteRechercheService.searchCommunauteSavoirProjetActiviteRecherche = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
