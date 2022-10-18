import {Component, OnInit} from '@angular/core';
import {InstrumentIrdConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/InstrumentIrdConsultanceScientifiquePonctuelle.service';
import {InstrumentIrdConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/InstrumentIrdConsultanceScientifiquePonctuelle.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ConsultanceScientifiquePonctuelleService } from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
import { InstrumentIrdService } from '../../../../../controller/service/InstrumentIrd.service';

import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-instrument-ird-consultance-scientifique-ponctuelle-list-admin',
  templateUrl: './instrument-ird-consultance-scientifique-ponctuelle-list-admin.component.html',
  styleUrls: ['./instrument-ird-consultance-scientifique-ponctuelle-list-admin.component.css']
})
export class InstrumentIrdConsultanceScientifiquePonctuelleListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'InstrumentIrdConsultanceScientifiquePonctuelle';
     yesOrNoExiste :any[] =[];
    consultanceScientifiquePonctuelles :Array<ConsultanceScientifiquePonctuelleVo>;
    instrumentIrds :Array<InstrumentIrdVo>;


    constructor(private datePipe: DatePipe, private instrumentIrdConsultanceScientifiquePonctuelleService: InstrumentIrdConsultanceScientifiquePonctuelleService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private consultanceScientifiquePonctuelleService: ConsultanceScientifiquePonctuelleService
        , private instrumentIrdService: InstrumentIrdService
) { }

    ngOnInit(): void {
      this.loadInstrumentIrdConsultanceScientifiquePonctuelles();
      this.initExport();
      this.initCol();
      this.loadConsultanceScientifiquePonctuelle();
      this.loadInstrumentIrd();
    this.yesOrNoExiste =  [{label: 'Existe', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadInstrumentIrdConsultanceScientifiquePonctuelles(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('InstrumentIrdConsultanceScientifiquePonctuelle', 'list');
        isPermistted ? this.instrumentIrdConsultanceScientifiquePonctuelleService.findAll().subscribe(instrumentIrdConsultanceScientifiquePonctuelles => this.instrumentIrdConsultanceScientifiquePonctuelles = instrumentIrdConsultanceScientifiquePonctuelles,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.instrumentIrdConsultanceScientifiquePonctuelleService.findByCriteria(this.searchInstrumentIrdConsultanceScientifiquePonctuelle).subscribe(instrumentIrdConsultanceScientifiquePonctuelles=>{
            
            this.instrumentIrdConsultanceScientifiquePonctuelles = instrumentIrdConsultanceScientifiquePonctuelles;
           // this.searchInstrumentIrdConsultanceScientifiquePonctuelle = new InstrumentIrdConsultanceScientifiquePonctuelleVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'consultanceScientifiquePonctuelle?.id', header: 'Consultance scientifique ponctuelle'},
                        {field: 'instrumentIrd?.libelle', header: 'Instrument ird'},
                            {field: 'existe', header: 'Existe'},
        ];
    }
    
    public async editInstrumentIrdConsultanceScientifiquePonctuelle(instrumentIrdConsultanceScientifiquePonctuelle:InstrumentIrdConsultanceScientifiquePonctuelleVo){
        const isPermistted = await this.roleService.isPermitted('InstrumentIrdConsultanceScientifiquePonctuelle', 'edit');
         if(isPermistted){
          this.instrumentIrdConsultanceScientifiquePonctuelleService.findByIdWithAssociatedList(instrumentIrdConsultanceScientifiquePonctuelle).subscribe(res => {
           this.selectedInstrumentIrdConsultanceScientifiquePonctuelle = res;
            this.editInstrumentIrdConsultanceScientifiquePonctuelleDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewInstrumentIrdConsultanceScientifiquePonctuelle(instrumentIrdConsultanceScientifiquePonctuelle:InstrumentIrdConsultanceScientifiquePonctuelleVo){
        const isPermistted = await this.roleService.isPermitted('InstrumentIrdConsultanceScientifiquePonctuelle', 'view');
        if(isPermistted){
           this.instrumentIrdConsultanceScientifiquePonctuelleService.findByIdWithAssociatedList(instrumentIrdConsultanceScientifiquePonctuelle).subscribe(res => {
           this.selectedInstrumentIrdConsultanceScientifiquePonctuelle = res;
            this.viewInstrumentIrdConsultanceScientifiquePonctuelleDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateInstrumentIrdConsultanceScientifiquePonctuelle(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedInstrumentIrdConsultanceScientifiquePonctuelle = new InstrumentIrdConsultanceScientifiquePonctuelleVo();
            this.createInstrumentIrdConsultanceScientifiquePonctuelleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteInstrumentIrdConsultanceScientifiquePonctuelle(instrumentIrdConsultanceScientifiquePonctuelle:InstrumentIrdConsultanceScientifiquePonctuelleVo){
       const isPermistted = await this.roleService.isPermitted('InstrumentIrdConsultanceScientifiquePonctuelle', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Instrument ird consultance scientifique ponctuelle) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.instrumentIrdConsultanceScientifiquePonctuelleService.delete(instrumentIrdConsultanceScientifiquePonctuelle).subscribe(status=>{
                          if(status > 0){
                          const position = this.instrumentIrdConsultanceScientifiquePonctuelles.indexOf(instrumentIrdConsultanceScientifiquePonctuelle);
                          position > -1 ? this.instrumentIrdConsultanceScientifiquePonctuelles.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Instrument ird consultance scientifique ponctuelle Supprimé',
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

public async loadConsultanceScientifiquePonctuelle(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('InstrumentIrdConsultanceScientifiquePonctuelle', 'list');
    isPermistted ? this.consultanceScientifiquePonctuelleService.findAll().subscribe(consultanceScientifiquePonctuelles => this.consultanceScientifiquePonctuelles = consultanceScientifiquePonctuelles,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadInstrumentIrd(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('InstrumentIrdConsultanceScientifiquePonctuelle', 'list');
    isPermistted ? this.instrumentIrdService.findAll().subscribe(instrumentIrds => this.instrumentIrds = instrumentIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateInstrumentIrdConsultanceScientifiquePonctuelle(instrumentIrdConsultanceScientifiquePonctuelle: InstrumentIrdConsultanceScientifiquePonctuelleVo) {

     this.instrumentIrdConsultanceScientifiquePonctuelleService.findByIdWithAssociatedList(instrumentIrdConsultanceScientifiquePonctuelle).subscribe(
	 res => {
	       this.initDuplicateInstrumentIrdConsultanceScientifiquePonctuelle(res);
	       this.selectedInstrumentIrdConsultanceScientifiquePonctuelle = res;
	       this.selectedInstrumentIrdConsultanceScientifiquePonctuelle.id = null;
            this.createInstrumentIrdConsultanceScientifiquePonctuelleDialog = true;

});

	}

	initDuplicateInstrumentIrdConsultanceScientifiquePonctuelle(res: InstrumentIrdConsultanceScientifiquePonctuelleVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.instrumentIrdConsultanceScientifiquePonctuelles.map(e => {
    return {
            'Consultance scientifique ponctuelle': e.consultanceScientifiquePonctuelleVo?.id ,
            'Instrument ird': e.instrumentIrdVo?.libelle ,
                    'Existe': e.existe? 'Vrai' : 'Faux' ,
     }
      });

      this.criteriaData = [{
        'Consultance scientifique ponctuelle': this.searchInstrumentIrdConsultanceScientifiquePonctuelle.consultanceScientifiquePonctuelleVo?.id ? this.searchInstrumentIrdConsultanceScientifiquePonctuelle.consultanceScientifiquePonctuelleVo?.id : environment.emptyForExport ,
        'Instrument ird': this.searchInstrumentIrdConsultanceScientifiquePonctuelle.instrumentIrdVo?.libelle ? this.searchInstrumentIrdConsultanceScientifiquePonctuelle.instrumentIrdVo?.libelle : environment.emptyForExport ,
            'Existe': this.searchInstrumentIrdConsultanceScientifiquePonctuelle.existe ? (this.searchInstrumentIrdConsultanceScientifiquePonctuelle.existe ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get instrumentIrdConsultanceScientifiquePonctuelles(): Array<InstrumentIrdConsultanceScientifiquePonctuelleVo> {
           return this.instrumentIrdConsultanceScientifiquePonctuelleService.instrumentIrdConsultanceScientifiquePonctuelles;
       }
    set instrumentIrdConsultanceScientifiquePonctuelles(value: Array<InstrumentIrdConsultanceScientifiquePonctuelleVo>) {
        this.instrumentIrdConsultanceScientifiquePonctuelleService.instrumentIrdConsultanceScientifiquePonctuelles = value;
       }

    get instrumentIrdConsultanceScientifiquePonctuelleSelections(): Array<InstrumentIrdConsultanceScientifiquePonctuelleVo> {
           return this.instrumentIrdConsultanceScientifiquePonctuelleService.instrumentIrdConsultanceScientifiquePonctuelleSelections;
       }
    set instrumentIrdConsultanceScientifiquePonctuelleSelections(value: Array<InstrumentIrdConsultanceScientifiquePonctuelleVo>) {
        this.instrumentIrdConsultanceScientifiquePonctuelleService.instrumentIrdConsultanceScientifiquePonctuelleSelections = value;
       }
   
     


    get selectedInstrumentIrdConsultanceScientifiquePonctuelle():InstrumentIrdConsultanceScientifiquePonctuelleVo {
           return this.instrumentIrdConsultanceScientifiquePonctuelleService.selectedInstrumentIrdConsultanceScientifiquePonctuelle;
       }
    set selectedInstrumentIrdConsultanceScientifiquePonctuelle(value: InstrumentIrdConsultanceScientifiquePonctuelleVo) {
        this.instrumentIrdConsultanceScientifiquePonctuelleService.selectedInstrumentIrdConsultanceScientifiquePonctuelle = value;
       }
    
    get createInstrumentIrdConsultanceScientifiquePonctuelleDialog():boolean {
           return this.instrumentIrdConsultanceScientifiquePonctuelleService.createInstrumentIrdConsultanceScientifiquePonctuelleDialog;
       }
    set createInstrumentIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.instrumentIrdConsultanceScientifiquePonctuelleService.createInstrumentIrdConsultanceScientifiquePonctuelleDialog= value;
       }
    
    get editInstrumentIrdConsultanceScientifiquePonctuelleDialog():boolean {
           return this.instrumentIrdConsultanceScientifiquePonctuelleService.editInstrumentIrdConsultanceScientifiquePonctuelleDialog;
       }
    set editInstrumentIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.instrumentIrdConsultanceScientifiquePonctuelleService.editInstrumentIrdConsultanceScientifiquePonctuelleDialog= value;
       }
    get viewInstrumentIrdConsultanceScientifiquePonctuelleDialog():boolean {
           return this.instrumentIrdConsultanceScientifiquePonctuelleService.viewInstrumentIrdConsultanceScientifiquePonctuelleDialog;
       }
    set viewInstrumentIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.instrumentIrdConsultanceScientifiquePonctuelleService.viewInstrumentIrdConsultanceScientifiquePonctuelleDialog = value;
       }
       
     get searchInstrumentIrdConsultanceScientifiquePonctuelle(): InstrumentIrdConsultanceScientifiquePonctuelleVo {
        return this.instrumentIrdConsultanceScientifiquePonctuelleService.searchInstrumentIrdConsultanceScientifiquePonctuelle;
       }
    set searchInstrumentIrdConsultanceScientifiquePonctuelle(value: InstrumentIrdConsultanceScientifiquePonctuelleVo) {
        this.instrumentIrdConsultanceScientifiquePonctuelleService.searchInstrumentIrdConsultanceScientifiquePonctuelle = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
