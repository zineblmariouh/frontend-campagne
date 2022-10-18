import {Component, OnInit} from '@angular/core';
import {EnjeuxIrdComiteEtCommissionEvaluationService} from '../../../../../controller/service/EnjeuxIrdComiteEtCommissionEvaluation.service';
import {EnjeuxIrdComiteEtCommissionEvaluationVo} from '../../../../../controller/model/EnjeuxIrdComiteEtCommissionEvaluation.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EnjeuxIrdService } from '../../../../../controller/service/EnjeuxIrd.service';
import { ComiteEtCommissionEvaluationService } from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';

import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-enjeux-ird-comite-et-commission-evaluation-list-admin',
  templateUrl: './enjeux-ird-comite-et-commission-evaluation-list-admin.component.html',
  styleUrls: ['./enjeux-ird-comite-et-commission-evaluation-list-admin.component.css']
})
export class EnjeuxIrdComiteEtCommissionEvaluationListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EnjeuxIrdComiteEtCommissionEvaluation';
    enjeuxIrds :Array<EnjeuxIrdVo>;
    comiteEtCommissionEvaluations :Array<ComiteEtCommissionEvaluationVo>;


    constructor(private datePipe: DatePipe, private enjeuxIrdComiteEtCommissionEvaluationService: EnjeuxIrdComiteEtCommissionEvaluationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private enjeuxIrdService: EnjeuxIrdService
        , private comiteEtCommissionEvaluationService: ComiteEtCommissionEvaluationService
) { }

    ngOnInit(): void {
      this.loadEnjeuxIrdComiteEtCommissionEvaluations();
      this.initExport();
      this.initCol();
      this.loadEnjeuxIrd();
      this.loadComiteEtCommissionEvaluation();
    }
    
    // methods
      public async loadEnjeuxIrdComiteEtCommissionEvaluations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EnjeuxIrdComiteEtCommissionEvaluation', 'list');
        isPermistted ? this.enjeuxIrdComiteEtCommissionEvaluationService.findAll().subscribe(enjeuxIrdComiteEtCommissionEvaluations => this.enjeuxIrdComiteEtCommissionEvaluations = enjeuxIrdComiteEtCommissionEvaluations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.enjeuxIrdComiteEtCommissionEvaluationService.findByCriteria(this.searchEnjeuxIrdComiteEtCommissionEvaluation).subscribe(enjeuxIrdComiteEtCommissionEvaluations=>{
            
            this.enjeuxIrdComiteEtCommissionEvaluations = enjeuxIrdComiteEtCommissionEvaluations;
           // this.searchEnjeuxIrdComiteEtCommissionEvaluation = new EnjeuxIrdComiteEtCommissionEvaluationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'enjeuxIrd?.libelle', header: 'Enjeux ird'},
                        {field: 'comiteEtCommissionEvaluation?.id', header: 'Comite et commission evaluation'},
        ];
    }
    
    public async editEnjeuxIrdComiteEtCommissionEvaluation(enjeuxIrdComiteEtCommissionEvaluation:EnjeuxIrdComiteEtCommissionEvaluationVo){
        const isPermistted = await this.roleService.isPermitted('EnjeuxIrdComiteEtCommissionEvaluation', 'edit');
         if(isPermistted){
          this.enjeuxIrdComiteEtCommissionEvaluationService.findByIdWithAssociatedList(enjeuxIrdComiteEtCommissionEvaluation).subscribe(res => {
           this.selectedEnjeuxIrdComiteEtCommissionEvaluation = res;
            this.editEnjeuxIrdComiteEtCommissionEvaluationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEnjeuxIrdComiteEtCommissionEvaluation(enjeuxIrdComiteEtCommissionEvaluation:EnjeuxIrdComiteEtCommissionEvaluationVo){
        const isPermistted = await this.roleService.isPermitted('EnjeuxIrdComiteEtCommissionEvaluation', 'view');
        if(isPermistted){
           this.enjeuxIrdComiteEtCommissionEvaluationService.findByIdWithAssociatedList(enjeuxIrdComiteEtCommissionEvaluation).subscribe(res => {
           this.selectedEnjeuxIrdComiteEtCommissionEvaluation = res;
            this.viewEnjeuxIrdComiteEtCommissionEvaluationDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEnjeuxIrdComiteEtCommissionEvaluation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEnjeuxIrdComiteEtCommissionEvaluation = new EnjeuxIrdComiteEtCommissionEvaluationVo();
            this.createEnjeuxIrdComiteEtCommissionEvaluationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEnjeuxIrdComiteEtCommissionEvaluation(enjeuxIrdComiteEtCommissionEvaluation:EnjeuxIrdComiteEtCommissionEvaluationVo){
       const isPermistted = await this.roleService.isPermitted('EnjeuxIrdComiteEtCommissionEvaluation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Enjeux ird comite et commission evaluation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.enjeuxIrdComiteEtCommissionEvaluationService.delete(enjeuxIrdComiteEtCommissionEvaluation).subscribe(status=>{
                          if(status > 0){
                          const position = this.enjeuxIrdComiteEtCommissionEvaluations.indexOf(enjeuxIrdComiteEtCommissionEvaluation);
                          position > -1 ? this.enjeuxIrdComiteEtCommissionEvaluations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Enjeux ird comite et commission evaluation Supprimé',
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

public async loadEnjeuxIrd(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EnjeuxIrdComiteEtCommissionEvaluation', 'list');
    isPermistted ? this.enjeuxIrdService.findAll().subscribe(enjeuxIrds => this.enjeuxIrds = enjeuxIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadComiteEtCommissionEvaluation(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EnjeuxIrdComiteEtCommissionEvaluation', 'list');
    isPermistted ? this.comiteEtCommissionEvaluationService.findAll().subscribe(comiteEtCommissionEvaluations => this.comiteEtCommissionEvaluations = comiteEtCommissionEvaluations,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEnjeuxIrdComiteEtCommissionEvaluation(enjeuxIrdComiteEtCommissionEvaluation: EnjeuxIrdComiteEtCommissionEvaluationVo) {

     this.enjeuxIrdComiteEtCommissionEvaluationService.findByIdWithAssociatedList(enjeuxIrdComiteEtCommissionEvaluation).subscribe(
	 res => {
	       this.initDuplicateEnjeuxIrdComiteEtCommissionEvaluation(res);
	       this.selectedEnjeuxIrdComiteEtCommissionEvaluation = res;
	       this.selectedEnjeuxIrdComiteEtCommissionEvaluation.id = null;
            this.createEnjeuxIrdComiteEtCommissionEvaluationDialog = true;

});

	}

	initDuplicateEnjeuxIrdComiteEtCommissionEvaluation(res: EnjeuxIrdComiteEtCommissionEvaluationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.enjeuxIrdComiteEtCommissionEvaluations.map(e => {
    return {
            'Enjeux ird': e.enjeuxIrdVo?.libelle ,
            'Comite et commission evaluation': e.comiteEtCommissionEvaluationVo?.id ,
     }
      });

      this.criteriaData = [{
        'Enjeux ird': this.searchEnjeuxIrdComiteEtCommissionEvaluation.enjeuxIrdVo?.libelle ? this.searchEnjeuxIrdComiteEtCommissionEvaluation.enjeuxIrdVo?.libelle : environment.emptyForExport ,
        'Comite et commission evaluation': this.searchEnjeuxIrdComiteEtCommissionEvaluation.comiteEtCommissionEvaluationVo?.id ? this.searchEnjeuxIrdComiteEtCommissionEvaluation.comiteEtCommissionEvaluationVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get enjeuxIrdComiteEtCommissionEvaluations(): Array<EnjeuxIrdComiteEtCommissionEvaluationVo> {
           return this.enjeuxIrdComiteEtCommissionEvaluationService.enjeuxIrdComiteEtCommissionEvaluations;
       }
    set enjeuxIrdComiteEtCommissionEvaluations(value: Array<EnjeuxIrdComiteEtCommissionEvaluationVo>) {
        this.enjeuxIrdComiteEtCommissionEvaluationService.enjeuxIrdComiteEtCommissionEvaluations = value;
       }

    get enjeuxIrdComiteEtCommissionEvaluationSelections(): Array<EnjeuxIrdComiteEtCommissionEvaluationVo> {
           return this.enjeuxIrdComiteEtCommissionEvaluationService.enjeuxIrdComiteEtCommissionEvaluationSelections;
       }
    set enjeuxIrdComiteEtCommissionEvaluationSelections(value: Array<EnjeuxIrdComiteEtCommissionEvaluationVo>) {
        this.enjeuxIrdComiteEtCommissionEvaluationService.enjeuxIrdComiteEtCommissionEvaluationSelections = value;
       }
   
     


    get selectedEnjeuxIrdComiteEtCommissionEvaluation():EnjeuxIrdComiteEtCommissionEvaluationVo {
           return this.enjeuxIrdComiteEtCommissionEvaluationService.selectedEnjeuxIrdComiteEtCommissionEvaluation;
       }
    set selectedEnjeuxIrdComiteEtCommissionEvaluation(value: EnjeuxIrdComiteEtCommissionEvaluationVo) {
        this.enjeuxIrdComiteEtCommissionEvaluationService.selectedEnjeuxIrdComiteEtCommissionEvaluation = value;
       }
    
    get createEnjeuxIrdComiteEtCommissionEvaluationDialog():boolean {
           return this.enjeuxIrdComiteEtCommissionEvaluationService.createEnjeuxIrdComiteEtCommissionEvaluationDialog;
       }
    set createEnjeuxIrdComiteEtCommissionEvaluationDialog(value: boolean) {
        this.enjeuxIrdComiteEtCommissionEvaluationService.createEnjeuxIrdComiteEtCommissionEvaluationDialog= value;
       }
    
    get editEnjeuxIrdComiteEtCommissionEvaluationDialog():boolean {
           return this.enjeuxIrdComiteEtCommissionEvaluationService.editEnjeuxIrdComiteEtCommissionEvaluationDialog;
       }
    set editEnjeuxIrdComiteEtCommissionEvaluationDialog(value: boolean) {
        this.enjeuxIrdComiteEtCommissionEvaluationService.editEnjeuxIrdComiteEtCommissionEvaluationDialog= value;
       }
    get viewEnjeuxIrdComiteEtCommissionEvaluationDialog():boolean {
           return this.enjeuxIrdComiteEtCommissionEvaluationService.viewEnjeuxIrdComiteEtCommissionEvaluationDialog;
       }
    set viewEnjeuxIrdComiteEtCommissionEvaluationDialog(value: boolean) {
        this.enjeuxIrdComiteEtCommissionEvaluationService.viewEnjeuxIrdComiteEtCommissionEvaluationDialog = value;
       }
       
     get searchEnjeuxIrdComiteEtCommissionEvaluation(): EnjeuxIrdComiteEtCommissionEvaluationVo {
        return this.enjeuxIrdComiteEtCommissionEvaluationService.searchEnjeuxIrdComiteEtCommissionEvaluation;
       }
    set searchEnjeuxIrdComiteEtCommissionEvaluation(value: EnjeuxIrdComiteEtCommissionEvaluationVo) {
        this.enjeuxIrdComiteEtCommissionEvaluationService.searchEnjeuxIrdComiteEtCommissionEvaluation = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
