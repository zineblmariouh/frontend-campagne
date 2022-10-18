import {Component, OnInit} from '@angular/core';
import {VieInstitutionnelleDetailInstrumentIrdService} from '../../../../../controller/service/VieInstitutionnelleDetailInstrumentIrd.service';
import {VieInstitutionnelleDetailInstrumentIrdVo} from '../../../../../controller/model/VieInstitutionnelleDetailInstrumentIrd.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { VieInstitutionnelleDetailService } from '../../../../../controller/service/VieInstitutionnelleDetail.service';
import { InstrumentIrdService } from '../../../../../controller/service/InstrumentIrd.service';

import {VieInstitutionnelleDetailVo} from '../../../../../controller/model/VieInstitutionnelleDetail.model';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-vie-institutionnelle-detail-instrument-ird-list-admin',
  templateUrl: './vie-institutionnelle-detail-instrument-ird-list-admin.component.html',
  styleUrls: ['./vie-institutionnelle-detail-instrument-ird-list-admin.component.css']
})
export class VieInstitutionnelleDetailInstrumentIrdListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'VieInstitutionnelleDetailInstrumentIrd';
    vieInstitutionnelleDetails :Array<VieInstitutionnelleDetailVo>;
    instrumentIrds :Array<InstrumentIrdVo>;


    constructor(private datePipe: DatePipe, private vieInstitutionnelleDetailInstrumentIrdService: VieInstitutionnelleDetailInstrumentIrdService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private vieInstitutionnelleDetailService: VieInstitutionnelleDetailService
        , private instrumentIrdService: InstrumentIrdService
) { }

    ngOnInit(): void {
      this.loadVieInstitutionnelleDetailInstrumentIrds();
      this.initExport();
      this.initCol();
      this.loadVieInstitutionnelleDetail();
      this.loadInstrumentIrd();
    }
    
    // methods
      public async loadVieInstitutionnelleDetailInstrumentIrds(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetailInstrumentIrd', 'list');
        isPermistted ? this.vieInstitutionnelleDetailInstrumentIrdService.findAll().subscribe(vieInstitutionnelleDetailInstrumentIrds => this.vieInstitutionnelleDetailInstrumentIrds = vieInstitutionnelleDetailInstrumentIrds,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.vieInstitutionnelleDetailInstrumentIrdService.findByCriteria(this.searchVieInstitutionnelleDetailInstrumentIrd).subscribe(vieInstitutionnelleDetailInstrumentIrds=>{
            
            this.vieInstitutionnelleDetailInstrumentIrds = vieInstitutionnelleDetailInstrumentIrds;
           // this.searchVieInstitutionnelleDetailInstrumentIrd = new VieInstitutionnelleDetailInstrumentIrdVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'vieInstitutionnelleDetail?.id', header: 'Vie institutionnelle detail'},
                        {field: 'instrumentIrd?.libelle', header: 'Instrument ird'},
        ];
    }
    
    public async editVieInstitutionnelleDetailInstrumentIrd(vieInstitutionnelleDetailInstrumentIrd:VieInstitutionnelleDetailInstrumentIrdVo){
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetailInstrumentIrd', 'edit');
         if(isPermistted){
          this.vieInstitutionnelleDetailInstrumentIrdService.findByIdWithAssociatedList(vieInstitutionnelleDetailInstrumentIrd).subscribe(res => {
           this.selectedVieInstitutionnelleDetailInstrumentIrd = res;
            this.editVieInstitutionnelleDetailInstrumentIrdDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewVieInstitutionnelleDetailInstrumentIrd(vieInstitutionnelleDetailInstrumentIrd:VieInstitutionnelleDetailInstrumentIrdVo){
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetailInstrumentIrd', 'view');
        if(isPermistted){
           this.vieInstitutionnelleDetailInstrumentIrdService.findByIdWithAssociatedList(vieInstitutionnelleDetailInstrumentIrd).subscribe(res => {
           this.selectedVieInstitutionnelleDetailInstrumentIrd = res;
            this.viewVieInstitutionnelleDetailInstrumentIrdDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateVieInstitutionnelleDetailInstrumentIrd(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedVieInstitutionnelleDetailInstrumentIrd = new VieInstitutionnelleDetailInstrumentIrdVo();
            this.createVieInstitutionnelleDetailInstrumentIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteVieInstitutionnelleDetailInstrumentIrd(vieInstitutionnelleDetailInstrumentIrd:VieInstitutionnelleDetailInstrumentIrdVo){
       const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetailInstrumentIrd', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Vie institutionnelle detail instrument ird) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.vieInstitutionnelleDetailInstrumentIrdService.delete(vieInstitutionnelleDetailInstrumentIrd).subscribe(status=>{
                          if(status > 0){
                          const position = this.vieInstitutionnelleDetailInstrumentIrds.indexOf(vieInstitutionnelleDetailInstrumentIrd);
                          position > -1 ? this.vieInstitutionnelleDetailInstrumentIrds.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Vie institutionnelle detail instrument ird Supprimé',
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

public async loadVieInstitutionnelleDetail(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetailInstrumentIrd', 'list');
    isPermistted ? this.vieInstitutionnelleDetailService.findAll().subscribe(vieInstitutionnelleDetails => this.vieInstitutionnelleDetails = vieInstitutionnelleDetails,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadInstrumentIrd(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetailInstrumentIrd', 'list');
    isPermistted ? this.instrumentIrdService.findAll().subscribe(instrumentIrds => this.instrumentIrds = instrumentIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateVieInstitutionnelleDetailInstrumentIrd(vieInstitutionnelleDetailInstrumentIrd: VieInstitutionnelleDetailInstrumentIrdVo) {

     this.vieInstitutionnelleDetailInstrumentIrdService.findByIdWithAssociatedList(vieInstitutionnelleDetailInstrumentIrd).subscribe(
	 res => {
	       this.initDuplicateVieInstitutionnelleDetailInstrumentIrd(res);
	       this.selectedVieInstitutionnelleDetailInstrumentIrd = res;
	       this.selectedVieInstitutionnelleDetailInstrumentIrd.id = null;
            this.createVieInstitutionnelleDetailInstrumentIrdDialog = true;

});

	}

	initDuplicateVieInstitutionnelleDetailInstrumentIrd(res: VieInstitutionnelleDetailInstrumentIrdVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.vieInstitutionnelleDetailInstrumentIrds.map(e => {
    return {
            'Vie institutionnelle detail': e.vieInstitutionnelleDetailVo?.id ,
            'Instrument ird': e.instrumentIrdVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Vie institutionnelle detail': this.searchVieInstitutionnelleDetailInstrumentIrd.vieInstitutionnelleDetailVo?.id ? this.searchVieInstitutionnelleDetailInstrumentIrd.vieInstitutionnelleDetailVo?.id : environment.emptyForExport ,
        'Instrument ird': this.searchVieInstitutionnelleDetailInstrumentIrd.instrumentIrdVo?.libelle ? this.searchVieInstitutionnelleDetailInstrumentIrd.instrumentIrdVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get vieInstitutionnelleDetailInstrumentIrds(): Array<VieInstitutionnelleDetailInstrumentIrdVo> {
           return this.vieInstitutionnelleDetailInstrumentIrdService.vieInstitutionnelleDetailInstrumentIrds;
       }
    set vieInstitutionnelleDetailInstrumentIrds(value: Array<VieInstitutionnelleDetailInstrumentIrdVo>) {
        this.vieInstitutionnelleDetailInstrumentIrdService.vieInstitutionnelleDetailInstrumentIrds = value;
       }

    get vieInstitutionnelleDetailInstrumentIrdSelections(): Array<VieInstitutionnelleDetailInstrumentIrdVo> {
           return this.vieInstitutionnelleDetailInstrumentIrdService.vieInstitutionnelleDetailInstrumentIrdSelections;
       }
    set vieInstitutionnelleDetailInstrumentIrdSelections(value: Array<VieInstitutionnelleDetailInstrumentIrdVo>) {
        this.vieInstitutionnelleDetailInstrumentIrdService.vieInstitutionnelleDetailInstrumentIrdSelections = value;
       }
   
     


    get selectedVieInstitutionnelleDetailInstrumentIrd():VieInstitutionnelleDetailInstrumentIrdVo {
           return this.vieInstitutionnelleDetailInstrumentIrdService.selectedVieInstitutionnelleDetailInstrumentIrd;
       }
    set selectedVieInstitutionnelleDetailInstrumentIrd(value: VieInstitutionnelleDetailInstrumentIrdVo) {
        this.vieInstitutionnelleDetailInstrumentIrdService.selectedVieInstitutionnelleDetailInstrumentIrd = value;
       }
    
    get createVieInstitutionnelleDetailInstrumentIrdDialog():boolean {
           return this.vieInstitutionnelleDetailInstrumentIrdService.createVieInstitutionnelleDetailInstrumentIrdDialog;
       }
    set createVieInstitutionnelleDetailInstrumentIrdDialog(value: boolean) {
        this.vieInstitutionnelleDetailInstrumentIrdService.createVieInstitutionnelleDetailInstrumentIrdDialog= value;
       }
    
    get editVieInstitutionnelleDetailInstrumentIrdDialog():boolean {
           return this.vieInstitutionnelleDetailInstrumentIrdService.editVieInstitutionnelleDetailInstrumentIrdDialog;
       }
    set editVieInstitutionnelleDetailInstrumentIrdDialog(value: boolean) {
        this.vieInstitutionnelleDetailInstrumentIrdService.editVieInstitutionnelleDetailInstrumentIrdDialog= value;
       }
    get viewVieInstitutionnelleDetailInstrumentIrdDialog():boolean {
           return this.vieInstitutionnelleDetailInstrumentIrdService.viewVieInstitutionnelleDetailInstrumentIrdDialog;
       }
    set viewVieInstitutionnelleDetailInstrumentIrdDialog(value: boolean) {
        this.vieInstitutionnelleDetailInstrumentIrdService.viewVieInstitutionnelleDetailInstrumentIrdDialog = value;
       }
       
     get searchVieInstitutionnelleDetailInstrumentIrd(): VieInstitutionnelleDetailInstrumentIrdVo {
        return this.vieInstitutionnelleDetailInstrumentIrdService.searchVieInstitutionnelleDetailInstrumentIrd;
       }
    set searchVieInstitutionnelleDetailInstrumentIrd(value: VieInstitutionnelleDetailInstrumentIrdVo) {
        this.vieInstitutionnelleDetailInstrumentIrdService.searchVieInstitutionnelleDetailInstrumentIrd = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
