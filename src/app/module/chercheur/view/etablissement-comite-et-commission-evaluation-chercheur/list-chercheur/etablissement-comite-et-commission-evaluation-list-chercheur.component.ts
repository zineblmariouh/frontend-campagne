import {Component, OnInit} from '@angular/core';
import {EtablissementComiteEtCommissionEvaluationService} from '../../../../../controller/service/EtablissementComiteEtCommissionEvaluation.service';
import {EtablissementComiteEtCommissionEvaluationVo} from '../../../../../controller/model/EtablissementComiteEtCommissionEvaluation.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EtablissementService } from '../../../../../controller/service/Etablissement.service';
import { ComiteEtCommissionEvaluationService } from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';

import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-etablissement-comite-et-commission-evaluation-list-chercheur',
  templateUrl: './etablissement-comite-et-commission-evaluation-list-chercheur.component.html',
  styleUrls: ['./etablissement-comite-et-commission-evaluation-list-chercheur.component.css']
})
export class EtablissementComiteEtCommissionEvaluationListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtablissementComiteEtCommissionEvaluation';
    etablissements :Array<EtablissementVo>;
    comiteEtCommissionEvaluations :Array<ComiteEtCommissionEvaluationVo>;


    constructor(private datePipe: DatePipe, private etablissementComiteEtCommissionEvaluationService: EtablissementComiteEtCommissionEvaluationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private etablissementService: EtablissementService
        , private comiteEtCommissionEvaluationService: ComiteEtCommissionEvaluationService
) { }

    ngOnInit(): void {
      this.loadEtablissementComiteEtCommissionEvaluations();
      this.initExport();
      this.initCol();
      this.loadEtablissement();
      this.loadComiteEtCommissionEvaluation();
    }
    
    // methods
      public async loadEtablissementComiteEtCommissionEvaluations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtablissementComiteEtCommissionEvaluation', 'list');
        isPermistted ? this.etablissementComiteEtCommissionEvaluationService.findAll().subscribe(etablissementComiteEtCommissionEvaluations => this.etablissementComiteEtCommissionEvaluations = etablissementComiteEtCommissionEvaluations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etablissementComiteEtCommissionEvaluationService.findByCriteria(this.searchEtablissementComiteEtCommissionEvaluation).subscribe(etablissementComiteEtCommissionEvaluations=>{
            
            this.etablissementComiteEtCommissionEvaluations = etablissementComiteEtCommissionEvaluations;
           // this.searchEtablissementComiteEtCommissionEvaluation = new EtablissementComiteEtCommissionEvaluationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'etablissement?.libelle', header: 'Etablissement'},
                        {field: 'comiteEtCommissionEvaluation?.id', header: 'Comite et commission evaluation'},
        ];
    }
    
    public async editEtablissementComiteEtCommissionEvaluation(etablissementComiteEtCommissionEvaluation:EtablissementComiteEtCommissionEvaluationVo){
        const isPermistted = await this.roleService.isPermitted('EtablissementComiteEtCommissionEvaluation', 'edit');
         if(isPermistted){
          this.etablissementComiteEtCommissionEvaluationService.findByIdWithAssociatedList(etablissementComiteEtCommissionEvaluation).subscribe(res => {
           this.selectedEtablissementComiteEtCommissionEvaluation = res;
            this.editEtablissementComiteEtCommissionEvaluationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtablissementComiteEtCommissionEvaluation(etablissementComiteEtCommissionEvaluation:EtablissementComiteEtCommissionEvaluationVo){
        const isPermistted = await this.roleService.isPermitted('EtablissementComiteEtCommissionEvaluation', 'view');
        if(isPermistted){
           this.etablissementComiteEtCommissionEvaluationService.findByIdWithAssociatedList(etablissementComiteEtCommissionEvaluation).subscribe(res => {
           this.selectedEtablissementComiteEtCommissionEvaluation = res;
            this.viewEtablissementComiteEtCommissionEvaluationDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtablissementComiteEtCommissionEvaluation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtablissementComiteEtCommissionEvaluation = new EtablissementComiteEtCommissionEvaluationVo();
            this.createEtablissementComiteEtCommissionEvaluationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEtablissementComiteEtCommissionEvaluation(etablissementComiteEtCommissionEvaluation:EtablissementComiteEtCommissionEvaluationVo){
       const isPermistted = await this.roleService.isPermitted('EtablissementComiteEtCommissionEvaluation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etablissement comite et commission evaluation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etablissementComiteEtCommissionEvaluationService.delete(etablissementComiteEtCommissionEvaluation).subscribe(status=>{
                          if(status > 0){
                          const position = this.etablissementComiteEtCommissionEvaluations.indexOf(etablissementComiteEtCommissionEvaluation);
                          position > -1 ? this.etablissementComiteEtCommissionEvaluations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etablissement comite et commission evaluation Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('EtablissementComiteEtCommissionEvaluation', 'list');
    isPermistted ? this.etablissementService.findAll().subscribe(etablissements => this.etablissements = etablissements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadComiteEtCommissionEvaluation(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EtablissementComiteEtCommissionEvaluation', 'list');
    isPermistted ? this.comiteEtCommissionEvaluationService.findAll().subscribe(comiteEtCommissionEvaluations => this.comiteEtCommissionEvaluations = comiteEtCommissionEvaluations,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEtablissementComiteEtCommissionEvaluation(etablissementComiteEtCommissionEvaluation: EtablissementComiteEtCommissionEvaluationVo) {

     this.etablissementComiteEtCommissionEvaluationService.findByIdWithAssociatedList(etablissementComiteEtCommissionEvaluation).subscribe(
	 res => {
	       this.initDuplicateEtablissementComiteEtCommissionEvaluation(res);
	       this.selectedEtablissementComiteEtCommissionEvaluation = res;
	       this.selectedEtablissementComiteEtCommissionEvaluation.id = null;
            this.createEtablissementComiteEtCommissionEvaluationDialog = true;

});

	}

	initDuplicateEtablissementComiteEtCommissionEvaluation(res: EtablissementComiteEtCommissionEvaluationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.etablissementComiteEtCommissionEvaluations.map(e => {
    return {
            'Etablissement': e.etablissementVo?.libelle ,
            'Comite et commission evaluation': e.comiteEtCommissionEvaluationVo?.id ,
     }
      });

      this.criteriaData = [{
        'Etablissement': this.searchEtablissementComiteEtCommissionEvaluation.etablissementVo?.libelle ? this.searchEtablissementComiteEtCommissionEvaluation.etablissementVo?.libelle : environment.emptyForExport ,
        'Comite et commission evaluation': this.searchEtablissementComiteEtCommissionEvaluation.comiteEtCommissionEvaluationVo?.id ? this.searchEtablissementComiteEtCommissionEvaluation.comiteEtCommissionEvaluationVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etablissementComiteEtCommissionEvaluations(): Array<EtablissementComiteEtCommissionEvaluationVo> {
           return this.etablissementComiteEtCommissionEvaluationService.etablissementComiteEtCommissionEvaluations;
       }
    set etablissementComiteEtCommissionEvaluations(value: Array<EtablissementComiteEtCommissionEvaluationVo>) {
        this.etablissementComiteEtCommissionEvaluationService.etablissementComiteEtCommissionEvaluations = value;
       }

    get etablissementComiteEtCommissionEvaluationSelections(): Array<EtablissementComiteEtCommissionEvaluationVo> {
           return this.etablissementComiteEtCommissionEvaluationService.etablissementComiteEtCommissionEvaluationSelections;
       }
    set etablissementComiteEtCommissionEvaluationSelections(value: Array<EtablissementComiteEtCommissionEvaluationVo>) {
        this.etablissementComiteEtCommissionEvaluationService.etablissementComiteEtCommissionEvaluationSelections = value;
       }
   
     


    get selectedEtablissementComiteEtCommissionEvaluation():EtablissementComiteEtCommissionEvaluationVo {
           return this.etablissementComiteEtCommissionEvaluationService.selectedEtablissementComiteEtCommissionEvaluation;
       }
    set selectedEtablissementComiteEtCommissionEvaluation(value: EtablissementComiteEtCommissionEvaluationVo) {
        this.etablissementComiteEtCommissionEvaluationService.selectedEtablissementComiteEtCommissionEvaluation = value;
       }
    
    get createEtablissementComiteEtCommissionEvaluationDialog():boolean {
           return this.etablissementComiteEtCommissionEvaluationService.createEtablissementComiteEtCommissionEvaluationDialog;
       }
    set createEtablissementComiteEtCommissionEvaluationDialog(value: boolean) {
        this.etablissementComiteEtCommissionEvaluationService.createEtablissementComiteEtCommissionEvaluationDialog= value;
       }
    
    get editEtablissementComiteEtCommissionEvaluationDialog():boolean {
           return this.etablissementComiteEtCommissionEvaluationService.editEtablissementComiteEtCommissionEvaluationDialog;
       }
    set editEtablissementComiteEtCommissionEvaluationDialog(value: boolean) {
        this.etablissementComiteEtCommissionEvaluationService.editEtablissementComiteEtCommissionEvaluationDialog= value;
       }
    get viewEtablissementComiteEtCommissionEvaluationDialog():boolean {
           return this.etablissementComiteEtCommissionEvaluationService.viewEtablissementComiteEtCommissionEvaluationDialog;
       }
    set viewEtablissementComiteEtCommissionEvaluationDialog(value: boolean) {
        this.etablissementComiteEtCommissionEvaluationService.viewEtablissementComiteEtCommissionEvaluationDialog = value;
       }
       
     get searchEtablissementComiteEtCommissionEvaluation(): EtablissementComiteEtCommissionEvaluationVo {
        return this.etablissementComiteEtCommissionEvaluationService.searchEtablissementComiteEtCommissionEvaluation;
       }
    set searchEtablissementComiteEtCommissionEvaluation(value: EtablissementComiteEtCommissionEvaluationVo) {
        this.etablissementComiteEtCommissionEvaluationService.searchEtablissementComiteEtCommissionEvaluation = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
