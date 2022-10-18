import {Component, OnInit} from '@angular/core';
import {OutilPedagogiqueInstrumentIrdService} from '../../../../../controller/service/OutilPedagogiqueInstrumentIrd.service';
import {OutilPedagogiqueInstrumentIrdVo} from '../../../../../controller/model/OutilPedagogiqueInstrumentIrd.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { InstrumentIrdService } from '../../../../../controller/service/InstrumentIrd.service';
import { OutilPedagogiqueService } from '../../../../../controller/service/OutilPedagogique.service';

import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-outil-pedagogique-instrument-ird-list-admin',
  templateUrl: './outil-pedagogique-instrument-ird-list-admin.component.html',
  styleUrls: ['./outil-pedagogique-instrument-ird-list-admin.component.css']
})
export class OutilPedagogiqueInstrumentIrdListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'OutilPedagogiqueInstrumentIrd';
    instrumentIrds :Array<InstrumentIrdVo>;
    outilPedagogiques :Array<OutilPedagogiqueVo>;


    constructor(private datePipe: DatePipe, private outilPedagogiqueInstrumentIrdService: OutilPedagogiqueInstrumentIrdService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private instrumentIrdService: InstrumentIrdService
        , private outilPedagogiqueService: OutilPedagogiqueService
) { }

    ngOnInit(): void {
      this.loadOutilPedagogiqueInstrumentIrds();
      this.initExport();
      this.initCol();
      this.loadInstrumentIrd();
      this.loadOutilPedagogique();
    }
    
    // methods
      public async loadOutilPedagogiqueInstrumentIrds(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueInstrumentIrd', 'list');
        isPermistted ? this.outilPedagogiqueInstrumentIrdService.findAll().subscribe(outilPedagogiqueInstrumentIrds => this.outilPedagogiqueInstrumentIrds = outilPedagogiqueInstrumentIrds,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.outilPedagogiqueInstrumentIrdService.findByCriteria(this.searchOutilPedagogiqueInstrumentIrd).subscribe(outilPedagogiqueInstrumentIrds=>{
            
            this.outilPedagogiqueInstrumentIrds = outilPedagogiqueInstrumentIrds;
           // this.searchOutilPedagogiqueInstrumentIrd = new OutilPedagogiqueInstrumentIrdVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'instrumentIrd?.libelle', header: 'Instrument ird'},
                        {field: 'outilPedagogique?.id', header: 'Outil pedagogique'},
        ];
    }
    
    public async editOutilPedagogiqueInstrumentIrd(outilPedagogiqueInstrumentIrd:OutilPedagogiqueInstrumentIrdVo){
        const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueInstrumentIrd', 'edit');
         if(isPermistted){
          this.outilPedagogiqueInstrumentIrdService.findByIdWithAssociatedList(outilPedagogiqueInstrumentIrd).subscribe(res => {
           this.selectedOutilPedagogiqueInstrumentIrd = res;
            this.editOutilPedagogiqueInstrumentIrdDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewOutilPedagogiqueInstrumentIrd(outilPedagogiqueInstrumentIrd:OutilPedagogiqueInstrumentIrdVo){
        const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueInstrumentIrd', 'view');
        if(isPermistted){
           this.outilPedagogiqueInstrumentIrdService.findByIdWithAssociatedList(outilPedagogiqueInstrumentIrd).subscribe(res => {
           this.selectedOutilPedagogiqueInstrumentIrd = res;
            this.viewOutilPedagogiqueInstrumentIrdDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateOutilPedagogiqueInstrumentIrd(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedOutilPedagogiqueInstrumentIrd = new OutilPedagogiqueInstrumentIrdVo();
            this.createOutilPedagogiqueInstrumentIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteOutilPedagogiqueInstrumentIrd(outilPedagogiqueInstrumentIrd:OutilPedagogiqueInstrumentIrdVo){
       const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueInstrumentIrd', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Outil pedagogique instrument ird) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.outilPedagogiqueInstrumentIrdService.delete(outilPedagogiqueInstrumentIrd).subscribe(status=>{
                          if(status > 0){
                          const position = this.outilPedagogiqueInstrumentIrds.indexOf(outilPedagogiqueInstrumentIrd);
                          position > -1 ? this.outilPedagogiqueInstrumentIrds.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Outil pedagogique instrument ird Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueInstrumentIrd', 'list');
    isPermistted ? this.instrumentIrdService.findAll().subscribe(instrumentIrds => this.instrumentIrds = instrumentIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadOutilPedagogique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueInstrumentIrd', 'list');
    isPermistted ? this.outilPedagogiqueService.findAll().subscribe(outilPedagogiques => this.outilPedagogiques = outilPedagogiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateOutilPedagogiqueInstrumentIrd(outilPedagogiqueInstrumentIrd: OutilPedagogiqueInstrumentIrdVo) {

     this.outilPedagogiqueInstrumentIrdService.findByIdWithAssociatedList(outilPedagogiqueInstrumentIrd).subscribe(
	 res => {
	       this.initDuplicateOutilPedagogiqueInstrumentIrd(res);
	       this.selectedOutilPedagogiqueInstrumentIrd = res;
	       this.selectedOutilPedagogiqueInstrumentIrd.id = null;
            this.createOutilPedagogiqueInstrumentIrdDialog = true;

});

	}

	initDuplicateOutilPedagogiqueInstrumentIrd(res: OutilPedagogiqueInstrumentIrdVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.outilPedagogiqueInstrumentIrds.map(e => {
    return {
            'Instrument ird': e.instrumentIrdVo?.libelle ,
            'Outil pedagogique': e.outilPedagogiqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Instrument ird': this.searchOutilPedagogiqueInstrumentIrd.instrumentIrdVo?.libelle ? this.searchOutilPedagogiqueInstrumentIrd.instrumentIrdVo?.libelle : environment.emptyForExport ,
        'Outil pedagogique': this.searchOutilPedagogiqueInstrumentIrd.outilPedagogiqueVo?.id ? this.searchOutilPedagogiqueInstrumentIrd.outilPedagogiqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get outilPedagogiqueInstrumentIrds(): Array<OutilPedagogiqueInstrumentIrdVo> {
           return this.outilPedagogiqueInstrumentIrdService.outilPedagogiqueInstrumentIrds;
       }
    set outilPedagogiqueInstrumentIrds(value: Array<OutilPedagogiqueInstrumentIrdVo>) {
        this.outilPedagogiqueInstrumentIrdService.outilPedagogiqueInstrumentIrds = value;
       }

    get outilPedagogiqueInstrumentIrdSelections(): Array<OutilPedagogiqueInstrumentIrdVo> {
           return this.outilPedagogiqueInstrumentIrdService.outilPedagogiqueInstrumentIrdSelections;
       }
    set outilPedagogiqueInstrumentIrdSelections(value: Array<OutilPedagogiqueInstrumentIrdVo>) {
        this.outilPedagogiqueInstrumentIrdService.outilPedagogiqueInstrumentIrdSelections = value;
       }
   
     


    get selectedOutilPedagogiqueInstrumentIrd():OutilPedagogiqueInstrumentIrdVo {
           return this.outilPedagogiqueInstrumentIrdService.selectedOutilPedagogiqueInstrumentIrd;
       }
    set selectedOutilPedagogiqueInstrumentIrd(value: OutilPedagogiqueInstrumentIrdVo) {
        this.outilPedagogiqueInstrumentIrdService.selectedOutilPedagogiqueInstrumentIrd = value;
       }
    
    get createOutilPedagogiqueInstrumentIrdDialog():boolean {
           return this.outilPedagogiqueInstrumentIrdService.createOutilPedagogiqueInstrumentIrdDialog;
       }
    set createOutilPedagogiqueInstrumentIrdDialog(value: boolean) {
        this.outilPedagogiqueInstrumentIrdService.createOutilPedagogiqueInstrumentIrdDialog= value;
       }
    
    get editOutilPedagogiqueInstrumentIrdDialog():boolean {
           return this.outilPedagogiqueInstrumentIrdService.editOutilPedagogiqueInstrumentIrdDialog;
       }
    set editOutilPedagogiqueInstrumentIrdDialog(value: boolean) {
        this.outilPedagogiqueInstrumentIrdService.editOutilPedagogiqueInstrumentIrdDialog= value;
       }
    get viewOutilPedagogiqueInstrumentIrdDialog():boolean {
           return this.outilPedagogiqueInstrumentIrdService.viewOutilPedagogiqueInstrumentIrdDialog;
       }
    set viewOutilPedagogiqueInstrumentIrdDialog(value: boolean) {
        this.outilPedagogiqueInstrumentIrdService.viewOutilPedagogiqueInstrumentIrdDialog = value;
       }
       
     get searchOutilPedagogiqueInstrumentIrd(): OutilPedagogiqueInstrumentIrdVo {
        return this.outilPedagogiqueInstrumentIrdService.searchOutilPedagogiqueInstrumentIrd;
       }
    set searchOutilPedagogiqueInstrumentIrd(value: OutilPedagogiqueInstrumentIrdVo) {
        this.outilPedagogiqueInstrumentIrdService.searchOutilPedagogiqueInstrumentIrd = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
