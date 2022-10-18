import {Component, OnInit} from '@angular/core';
import {InstrumentIrdComiteEtCommissionEvaluationService} from '../../../../../controller/service/InstrumentIrdComiteEtCommissionEvaluation.service';
import {InstrumentIrdComiteEtCommissionEvaluationVo} from '../../../../../controller/model/InstrumentIrdComiteEtCommissionEvaluation.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { InstrumentIrdService } from '../../../../../controller/service/InstrumentIrd.service';
import { TypeInstrumentIrdService } from '../../../../../controller/service/TypeInstrumentIrd.service';
import { ComiteEtCommissionEvaluationService } from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';

import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-instrument-ird-comite-et-commission-evaluation-list-admin',
  templateUrl: './instrument-ird-comite-et-commission-evaluation-list-admin.component.html',
  styleUrls: ['./instrument-ird-comite-et-commission-evaluation-list-admin.component.css']
})
export class InstrumentIrdComiteEtCommissionEvaluationListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'InstrumentIrdComiteEtCommissionEvaluation';
    instrumentIrds :Array<InstrumentIrdVo>;
    typeInstrumentIrds :Array<TypeInstrumentIrdVo>;
    comiteEtCommissionEvaluations :Array<ComiteEtCommissionEvaluationVo>;


    constructor(private datePipe: DatePipe, private instrumentIrdComiteEtCommissionEvaluationService: InstrumentIrdComiteEtCommissionEvaluationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private instrumentIrdService: InstrumentIrdService
        , private typeInstrumentIrdService: TypeInstrumentIrdService
        , private comiteEtCommissionEvaluationService: ComiteEtCommissionEvaluationService
) { }

    ngOnInit(): void {
      this.loadInstrumentIrdComiteEtCommissionEvaluations();
      this.initExport();
      this.initCol();
      this.loadInstrumentIrd();
      this.loadTypeInstrumentIrd();
      this.loadComiteEtCommissionEvaluation();
    }
    
    // methods
      public async loadInstrumentIrdComiteEtCommissionEvaluations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('InstrumentIrdComiteEtCommissionEvaluation', 'list');
        isPermistted ? this.instrumentIrdComiteEtCommissionEvaluationService.findAll().subscribe(instrumentIrdComiteEtCommissionEvaluations => this.instrumentIrdComiteEtCommissionEvaluations = instrumentIrdComiteEtCommissionEvaluations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.instrumentIrdComiteEtCommissionEvaluationService.findByCriteria(this.searchInstrumentIrdComiteEtCommissionEvaluation).subscribe(instrumentIrdComiteEtCommissionEvaluations=>{
            
            this.instrumentIrdComiteEtCommissionEvaluations = instrumentIrdComiteEtCommissionEvaluations;
           // this.searchInstrumentIrdComiteEtCommissionEvaluation = new InstrumentIrdComiteEtCommissionEvaluationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'instrumentIrd?.libelle', header: 'Instrument ird'},
                        {field: 'typeInstrumentIrd?.libelle', header: 'Type instrument ird'},
                        {field: 'comiteEtCommissionEvaluation?.id', header: 'Comite et commission evaluation'},
        ];
    }
    
    public async editInstrumentIrdComiteEtCommissionEvaluation(instrumentIrdComiteEtCommissionEvaluation:InstrumentIrdComiteEtCommissionEvaluationVo){
        const isPermistted = await this.roleService.isPermitted('InstrumentIrdComiteEtCommissionEvaluation', 'edit');
         if(isPermistted){
          this.instrumentIrdComiteEtCommissionEvaluationService.findByIdWithAssociatedList(instrumentIrdComiteEtCommissionEvaluation).subscribe(res => {
           this.selectedInstrumentIrdComiteEtCommissionEvaluation = res;
            this.editInstrumentIrdComiteEtCommissionEvaluationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewInstrumentIrdComiteEtCommissionEvaluation(instrumentIrdComiteEtCommissionEvaluation:InstrumentIrdComiteEtCommissionEvaluationVo){
        const isPermistted = await this.roleService.isPermitted('InstrumentIrdComiteEtCommissionEvaluation', 'view');
        if(isPermistted){
           this.instrumentIrdComiteEtCommissionEvaluationService.findByIdWithAssociatedList(instrumentIrdComiteEtCommissionEvaluation).subscribe(res => {
           this.selectedInstrumentIrdComiteEtCommissionEvaluation = res;
            this.viewInstrumentIrdComiteEtCommissionEvaluationDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateInstrumentIrdComiteEtCommissionEvaluation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedInstrumentIrdComiteEtCommissionEvaluation = new InstrumentIrdComiteEtCommissionEvaluationVo();
            this.createInstrumentIrdComiteEtCommissionEvaluationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteInstrumentIrdComiteEtCommissionEvaluation(instrumentIrdComiteEtCommissionEvaluation:InstrumentIrdComiteEtCommissionEvaluationVo){
       const isPermistted = await this.roleService.isPermitted('InstrumentIrdComiteEtCommissionEvaluation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Instrument ird comite et commission evaluation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.instrumentIrdComiteEtCommissionEvaluationService.delete(instrumentIrdComiteEtCommissionEvaluation).subscribe(status=>{
                          if(status > 0){
                          const position = this.instrumentIrdComiteEtCommissionEvaluations.indexOf(instrumentIrdComiteEtCommissionEvaluation);
                          position > -1 ? this.instrumentIrdComiteEtCommissionEvaluations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Instrument ird comite et commission evaluation Supprimé',
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

public async loadInstrumentIrd(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('InstrumentIrdComiteEtCommissionEvaluation', 'list');
    isPermistted ? this.instrumentIrdService.findAll().subscribe(instrumentIrds => this.instrumentIrds = instrumentIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadTypeInstrumentIrd(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('InstrumentIrdComiteEtCommissionEvaluation', 'list');
    isPermistted ? this.typeInstrumentIrdService.findAll().subscribe(typeInstrumentIrds => this.typeInstrumentIrds = typeInstrumentIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadComiteEtCommissionEvaluation(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('InstrumentIrdComiteEtCommissionEvaluation', 'list');
    isPermistted ? this.comiteEtCommissionEvaluationService.findAll().subscribe(comiteEtCommissionEvaluations => this.comiteEtCommissionEvaluations = comiteEtCommissionEvaluations,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateInstrumentIrdComiteEtCommissionEvaluation(instrumentIrdComiteEtCommissionEvaluation: InstrumentIrdComiteEtCommissionEvaluationVo) {

     this.instrumentIrdComiteEtCommissionEvaluationService.findByIdWithAssociatedList(instrumentIrdComiteEtCommissionEvaluation).subscribe(
	 res => {
	       this.initDuplicateInstrumentIrdComiteEtCommissionEvaluation(res);
	       this.selectedInstrumentIrdComiteEtCommissionEvaluation = res;
	       this.selectedInstrumentIrdComiteEtCommissionEvaluation.id = null;
            this.createInstrumentIrdComiteEtCommissionEvaluationDialog = true;

});

	}

	initDuplicateInstrumentIrdComiteEtCommissionEvaluation(res: InstrumentIrdComiteEtCommissionEvaluationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.instrumentIrdComiteEtCommissionEvaluations.map(e => {
    return {
            'Instrument ird': e.instrumentIrdVo?.libelle ,
            'Type instrument ird': e.typeInstrumentIrdVo?.libelle ,
            'Comite et commission evaluation': e.comiteEtCommissionEvaluationVo?.id ,
     }
      });

      this.criteriaData = [{
        'Instrument ird': this.searchInstrumentIrdComiteEtCommissionEvaluation.instrumentIrdVo?.libelle ? this.searchInstrumentIrdComiteEtCommissionEvaluation.instrumentIrdVo?.libelle : environment.emptyForExport ,
        'Type instrument ird': this.searchInstrumentIrdComiteEtCommissionEvaluation.typeInstrumentIrdVo?.libelle ? this.searchInstrumentIrdComiteEtCommissionEvaluation.typeInstrumentIrdVo?.libelle : environment.emptyForExport ,
        'Comite et commission evaluation': this.searchInstrumentIrdComiteEtCommissionEvaluation.comiteEtCommissionEvaluationVo?.id ? this.searchInstrumentIrdComiteEtCommissionEvaluation.comiteEtCommissionEvaluationVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get instrumentIrdComiteEtCommissionEvaluations(): Array<InstrumentIrdComiteEtCommissionEvaluationVo> {
           return this.instrumentIrdComiteEtCommissionEvaluationService.instrumentIrdComiteEtCommissionEvaluations;
       }
    set instrumentIrdComiteEtCommissionEvaluations(value: Array<InstrumentIrdComiteEtCommissionEvaluationVo>) {
        this.instrumentIrdComiteEtCommissionEvaluationService.instrumentIrdComiteEtCommissionEvaluations = value;
       }

    get instrumentIrdComiteEtCommissionEvaluationSelections(): Array<InstrumentIrdComiteEtCommissionEvaluationVo> {
           return this.instrumentIrdComiteEtCommissionEvaluationService.instrumentIrdComiteEtCommissionEvaluationSelections;
       }
    set instrumentIrdComiteEtCommissionEvaluationSelections(value: Array<InstrumentIrdComiteEtCommissionEvaluationVo>) {
        this.instrumentIrdComiteEtCommissionEvaluationService.instrumentIrdComiteEtCommissionEvaluationSelections = value;
       }
   
     


    get selectedInstrumentIrdComiteEtCommissionEvaluation():InstrumentIrdComiteEtCommissionEvaluationVo {
           return this.instrumentIrdComiteEtCommissionEvaluationService.selectedInstrumentIrdComiteEtCommissionEvaluation;
       }
    set selectedInstrumentIrdComiteEtCommissionEvaluation(value: InstrumentIrdComiteEtCommissionEvaluationVo) {
        this.instrumentIrdComiteEtCommissionEvaluationService.selectedInstrumentIrdComiteEtCommissionEvaluation = value;
       }
    
    get createInstrumentIrdComiteEtCommissionEvaluationDialog():boolean {
           return this.instrumentIrdComiteEtCommissionEvaluationService.createInstrumentIrdComiteEtCommissionEvaluationDialog;
       }
    set createInstrumentIrdComiteEtCommissionEvaluationDialog(value: boolean) {
        this.instrumentIrdComiteEtCommissionEvaluationService.createInstrumentIrdComiteEtCommissionEvaluationDialog= value;
       }
    
    get editInstrumentIrdComiteEtCommissionEvaluationDialog():boolean {
           return this.instrumentIrdComiteEtCommissionEvaluationService.editInstrumentIrdComiteEtCommissionEvaluationDialog;
       }
    set editInstrumentIrdComiteEtCommissionEvaluationDialog(value: boolean) {
        this.instrumentIrdComiteEtCommissionEvaluationService.editInstrumentIrdComiteEtCommissionEvaluationDialog= value;
       }
    get viewInstrumentIrdComiteEtCommissionEvaluationDialog():boolean {
           return this.instrumentIrdComiteEtCommissionEvaluationService.viewInstrumentIrdComiteEtCommissionEvaluationDialog;
       }
    set viewInstrumentIrdComiteEtCommissionEvaluationDialog(value: boolean) {
        this.instrumentIrdComiteEtCommissionEvaluationService.viewInstrumentIrdComiteEtCommissionEvaluationDialog = value;
       }
       
     get searchInstrumentIrdComiteEtCommissionEvaluation(): InstrumentIrdComiteEtCommissionEvaluationVo {
        return this.instrumentIrdComiteEtCommissionEvaluationService.searchInstrumentIrdComiteEtCommissionEvaluation;
       }
    set searchInstrumentIrdComiteEtCommissionEvaluation(value: InstrumentIrdComiteEtCommissionEvaluationVo) {
        this.instrumentIrdComiteEtCommissionEvaluationService.searchInstrumentIrdComiteEtCommissionEvaluation = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
