import {Component, OnInit} from '@angular/core';
import {VieInstitutionnelleDetailService} from '../../../../../controller/service/VieInstitutionnelleDetail.service';
import {VieInstitutionnelleDetailVo} from '../../../../../controller/model/VieInstitutionnelleDetail.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { TypeInstanceService } from '../../../../../controller/service/TypeInstance.service';
import { StructureIrdService } from '../../../../../controller/service/StructureIrd.service';
import { PaysService } from '../../../../../controller/service/Pays.service';
import { VieInstitutionnelleService } from '../../../../../controller/service/VieInstitutionnelle.service';

import {TypeInstanceVo} from '../../../../../controller/model/TypeInstance.model';
import {VieInstitutionnelleVo} from '../../../../../controller/model/VieInstitutionnelle.model';
import {VieInstitutionnelleDetailInstrumentIrdVo} from '../../../../../controller/model/VieInstitutionnelleDetailInstrumentIrd.model';
import {StructureIrdVo} from '../../../../../controller/model/StructureIrd.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {VieInstitutionnelleDetailEtablissementVo} from '../../../../../controller/model/VieInstitutionnelleDetailEtablissement.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-vie-institutionnelle-detail-list-admin',
  templateUrl: './vie-institutionnelle-detail-list-admin.component.html',
  styleUrls: ['./vie-institutionnelle-detail-list-admin.component.css']
})
export class VieInstitutionnelleDetailListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'VieInstitutionnelleDetail';
     yesOrNoCooreleStructureIrd :any[] =[];
     yesOrNoCooreleInstrumentIrd :any[] =[];
    typeInstances :Array<TypeInstanceVo>;
    structureIrds :Array<StructureIrdVo>;
    payss :Array<PaysVo>;
    vieInstitutionnelles :Array<VieInstitutionnelleVo>;


    constructor(private datePipe: DatePipe, private vieInstitutionnelleDetailService: VieInstitutionnelleDetailService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private typeInstanceService: TypeInstanceService
        , private structureIrdService: StructureIrdService
        , private paysService: PaysService
        , private vieInstitutionnelleService: VieInstitutionnelleService
) { }

    ngOnInit(): void {
      this.loadVieInstitutionnelleDetails();
      this.initExport();
      this.initCol();
      this.loadTypeInstance();
      this.loadStructureIrd();
      this.loadPays();
      this.loadVieInstitutionnelle();
    this.yesOrNoCooreleStructureIrd =  [{label: 'CooreleStructureIrd', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoCooreleInstrumentIrd =  [{label: 'CooreleInstrumentIrd', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadVieInstitutionnelleDetails(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetail', 'list');
        isPermistted ? this.vieInstitutionnelleDetailService.findAll().subscribe(vieInstitutionnelleDetails => this.vieInstitutionnelleDetails = vieInstitutionnelleDetails,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.vieInstitutionnelleDetailService.findByCriteria(this.searchVieInstitutionnelleDetail).subscribe(vieInstitutionnelleDetails=>{
            
            this.vieInstitutionnelleDetails = vieInstitutionnelleDetails;
           // this.searchVieInstitutionnelleDetail = new VieInstitutionnelleDetailVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'typeInstance?.libelle', header: 'Type instance'},
                            {field: 'cooreleStructureIrd', header: 'Coorele structure ird'},
                        {field: 'structureIrd?.libelle', header: 'Structure ird'},
                            {field: 'cooreleInstrumentIrd', header: 'Coorele instrument ird'},
                            {field: 'libelle', header: 'Libelle'},
                        {field: 'pays?.libelle', header: 'Pays'},
                        {field: 'vieInstitutionnelle?.id', header: 'Vie institutionnelle'},
        ];
    }
    
    public async editVieInstitutionnelleDetail(vieInstitutionnelleDetail:VieInstitutionnelleDetailVo){
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetail', 'edit');
         if(isPermistted){
          this.vieInstitutionnelleDetailService.findByIdWithAssociatedList(vieInstitutionnelleDetail).subscribe(res => {
           this.selectedVieInstitutionnelleDetail = res;
            this.editVieInstitutionnelleDetailDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewVieInstitutionnelleDetail(vieInstitutionnelleDetail:VieInstitutionnelleDetailVo){
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetail', 'view');
        if(isPermistted){
           this.vieInstitutionnelleDetailService.findByIdWithAssociatedList(vieInstitutionnelleDetail).subscribe(res => {
           this.selectedVieInstitutionnelleDetail = res;
            this.viewVieInstitutionnelleDetailDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateVieInstitutionnelleDetail(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedVieInstitutionnelleDetail = new VieInstitutionnelleDetailVo();
            this.createVieInstitutionnelleDetailDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteVieInstitutionnelleDetail(vieInstitutionnelleDetail:VieInstitutionnelleDetailVo){
       const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetail', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Vie institutionnelle detail) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.vieInstitutionnelleDetailService.delete(vieInstitutionnelleDetail).subscribe(status=>{
                          if(status > 0){
                          const position = this.vieInstitutionnelleDetails.indexOf(vieInstitutionnelleDetail);
                          position > -1 ? this.vieInstitutionnelleDetails.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Vie institutionnelle detail Supprimé',
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

public async loadTypeInstance(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetail', 'list');
    isPermistted ? this.typeInstanceService.findAll().subscribe(typeInstances => this.typeInstances = typeInstances,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadStructureIrd(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetail', 'list');
    isPermistted ? this.structureIrdService.findAll().subscribe(structureIrds => this.structureIrds = structureIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPays(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetail', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadVieInstitutionnelle(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetail', 'list');
    isPermistted ? this.vieInstitutionnelleService.findAll().subscribe(vieInstitutionnelles => this.vieInstitutionnelles = vieInstitutionnelles,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateVieInstitutionnelleDetail(vieInstitutionnelleDetail: VieInstitutionnelleDetailVo) {

     this.vieInstitutionnelleDetailService.findByIdWithAssociatedList(vieInstitutionnelleDetail).subscribe(
	 res => {
	       this.initDuplicateVieInstitutionnelleDetail(res);
	       this.selectedVieInstitutionnelleDetail = res;
	       this.selectedVieInstitutionnelleDetail.id = null;
            this.createVieInstitutionnelleDetailDialog = true;

});

	}

	initDuplicateVieInstitutionnelleDetail(res: VieInstitutionnelleDetailVo) {
        if (res.vieInstitutionnelleDetailInstrumentIrdsVo != null) {
             res.vieInstitutionnelleDetailInstrumentIrdsVo.forEach(d => { d.vieInstitutionnelleDetailVo = null; d.id = null; });
                }
        if (res.vieInstitutionnelleDetailEtablissementsVo != null) {
             res.vieInstitutionnelleDetailEtablissementsVo.forEach(d => { d.vieInstitutionnelleDetailVo = null; d.id = null; });
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
    this.exportData = this.vieInstitutionnelleDetails.map(e => {
    return {
            'Type instance': e.typeInstanceVo?.libelle ,
                    'Coorele structure ird': e.cooreleStructureIrd? 'Vrai' : 'Faux' ,
            'Structure ird': e.structureIrdVo?.libelle ,
                    'Coorele instrument ird': e.cooreleInstrumentIrd? 'Vrai' : 'Faux' ,
                    'Libelle': e.libelle ,
            'Pays': e.paysVo?.libelle ,
            'Vie institutionnelle': e.vieInstitutionnelleVo?.id ,
     }
      });

      this.criteriaData = [{
        'Type instance': this.searchVieInstitutionnelleDetail.typeInstanceVo?.libelle ? this.searchVieInstitutionnelleDetail.typeInstanceVo?.libelle : environment.emptyForExport ,
            'Coorele structure ird': this.searchVieInstitutionnelleDetail.cooreleStructureIrd ? (this.searchVieInstitutionnelleDetail.cooreleStructureIrd ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
        'Structure ird': this.searchVieInstitutionnelleDetail.structureIrdVo?.libelle ? this.searchVieInstitutionnelleDetail.structureIrdVo?.libelle : environment.emptyForExport ,
            'Coorele instrument ird': this.searchVieInstitutionnelleDetail.cooreleInstrumentIrd ? (this.searchVieInstitutionnelleDetail.cooreleInstrumentIrd ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Libelle': this.searchVieInstitutionnelleDetail.libelle ? this.searchVieInstitutionnelleDetail.libelle : environment.emptyForExport ,
        'Pays': this.searchVieInstitutionnelleDetail.paysVo?.libelle ? this.searchVieInstitutionnelleDetail.paysVo?.libelle : environment.emptyForExport ,
        'Vie institutionnelle': this.searchVieInstitutionnelleDetail.vieInstitutionnelleVo?.id ? this.searchVieInstitutionnelleDetail.vieInstitutionnelleVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get vieInstitutionnelleDetails(): Array<VieInstitutionnelleDetailVo> {
           return this.vieInstitutionnelleDetailService.vieInstitutionnelleDetails;
       }
    set vieInstitutionnelleDetails(value: Array<VieInstitutionnelleDetailVo>) {
        this.vieInstitutionnelleDetailService.vieInstitutionnelleDetails = value;
       }

    get vieInstitutionnelleDetailSelections(): Array<VieInstitutionnelleDetailVo> {
           return this.vieInstitutionnelleDetailService.vieInstitutionnelleDetailSelections;
       }
    set vieInstitutionnelleDetailSelections(value: Array<VieInstitutionnelleDetailVo>) {
        this.vieInstitutionnelleDetailService.vieInstitutionnelleDetailSelections = value;
       }
   
     


    get selectedVieInstitutionnelleDetail():VieInstitutionnelleDetailVo {
           return this.vieInstitutionnelleDetailService.selectedVieInstitutionnelleDetail;
       }
    set selectedVieInstitutionnelleDetail(value: VieInstitutionnelleDetailVo) {
        this.vieInstitutionnelleDetailService.selectedVieInstitutionnelleDetail = value;
       }
    
    get createVieInstitutionnelleDetailDialog():boolean {
           return this.vieInstitutionnelleDetailService.createVieInstitutionnelleDetailDialog;
       }
    set createVieInstitutionnelleDetailDialog(value: boolean) {
        this.vieInstitutionnelleDetailService.createVieInstitutionnelleDetailDialog= value;
       }
    
    get editVieInstitutionnelleDetailDialog():boolean {
           return this.vieInstitutionnelleDetailService.editVieInstitutionnelleDetailDialog;
       }
    set editVieInstitutionnelleDetailDialog(value: boolean) {
        this.vieInstitutionnelleDetailService.editVieInstitutionnelleDetailDialog= value;
       }
    get viewVieInstitutionnelleDetailDialog():boolean {
           return this.vieInstitutionnelleDetailService.viewVieInstitutionnelleDetailDialog;
       }
    set viewVieInstitutionnelleDetailDialog(value: boolean) {
        this.vieInstitutionnelleDetailService.viewVieInstitutionnelleDetailDialog = value;
       }
       
     get searchVieInstitutionnelleDetail(): VieInstitutionnelleDetailVo {
        return this.vieInstitutionnelleDetailService.searchVieInstitutionnelleDetail;
       }
    set searchVieInstitutionnelleDetail(value: VieInstitutionnelleDetailVo) {
        this.vieInstitutionnelleDetailService.searchVieInstitutionnelleDetail = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
