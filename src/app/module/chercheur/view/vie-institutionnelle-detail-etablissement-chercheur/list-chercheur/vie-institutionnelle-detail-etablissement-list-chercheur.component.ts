import {Component, OnInit} from '@angular/core';
import {VieInstitutionnelleDetailEtablissementService} from '../../../../../controller/service/VieInstitutionnelleDetailEtablissement.service';
import {VieInstitutionnelleDetailEtablissementVo} from '../../../../../controller/model/VieInstitutionnelleDetailEtablissement.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { VieInstitutionnelleDetailService } from '../../../../../controller/service/VieInstitutionnelleDetail.service';
import { EtablissementService } from '../../../../../controller/service/Etablissement.service';

import {VieInstitutionnelleDetailVo} from '../../../../../controller/model/VieInstitutionnelleDetail.model';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-vie-institutionnelle-detail-etablissement-list-chercheur',
  templateUrl: './vie-institutionnelle-detail-etablissement-list-chercheur.component.html',
  styleUrls: ['./vie-institutionnelle-detail-etablissement-list-chercheur.component.css']
})
export class VieInstitutionnelleDetailEtablissementListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'VieInstitutionnelleDetailEtablissement';
    vieInstitutionnelleDetails :Array<VieInstitutionnelleDetailVo>;
    etablissements :Array<EtablissementVo>;


    constructor(private datePipe: DatePipe, private vieInstitutionnelleDetailEtablissementService: VieInstitutionnelleDetailEtablissementService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private vieInstitutionnelleDetailService: VieInstitutionnelleDetailService
        , private etablissementService: EtablissementService
) { }

    ngOnInit(): void {
      this.loadVieInstitutionnelleDetailEtablissements();
      this.initExport();
      this.initCol();
      this.loadVieInstitutionnelleDetail();
      this.loadEtablissement();
    }
    
    // methods
      public async loadVieInstitutionnelleDetailEtablissements(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetailEtablissement', 'list');
        isPermistted ? this.vieInstitutionnelleDetailEtablissementService.findAll().subscribe(vieInstitutionnelleDetailEtablissements => this.vieInstitutionnelleDetailEtablissements = vieInstitutionnelleDetailEtablissements,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.vieInstitutionnelleDetailEtablissementService.findByCriteria(this.searchVieInstitutionnelleDetailEtablissement).subscribe(vieInstitutionnelleDetailEtablissements=>{
            
            this.vieInstitutionnelleDetailEtablissements = vieInstitutionnelleDetailEtablissements;
           // this.searchVieInstitutionnelleDetailEtablissement = new VieInstitutionnelleDetailEtablissementVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'vieInstitutionnelleDetail?.id', header: 'Vie institutionnelle detail'},
                        {field: 'etablissement?.libelle', header: 'Etablissement'},
        ];
    }
    
    public async editVieInstitutionnelleDetailEtablissement(vieInstitutionnelleDetailEtablissement:VieInstitutionnelleDetailEtablissementVo){
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetailEtablissement', 'edit');
         if(isPermistted){
          this.vieInstitutionnelleDetailEtablissementService.findByIdWithAssociatedList(vieInstitutionnelleDetailEtablissement).subscribe(res => {
           this.selectedVieInstitutionnelleDetailEtablissement = res;
            this.editVieInstitutionnelleDetailEtablissementDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewVieInstitutionnelleDetailEtablissement(vieInstitutionnelleDetailEtablissement:VieInstitutionnelleDetailEtablissementVo){
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetailEtablissement', 'view');
        if(isPermistted){
           this.vieInstitutionnelleDetailEtablissementService.findByIdWithAssociatedList(vieInstitutionnelleDetailEtablissement).subscribe(res => {
           this.selectedVieInstitutionnelleDetailEtablissement = res;
            this.viewVieInstitutionnelleDetailEtablissementDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateVieInstitutionnelleDetailEtablissement(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedVieInstitutionnelleDetailEtablissement = new VieInstitutionnelleDetailEtablissementVo();
            this.createVieInstitutionnelleDetailEtablissementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteVieInstitutionnelleDetailEtablissement(vieInstitutionnelleDetailEtablissement:VieInstitutionnelleDetailEtablissementVo){
       const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetailEtablissement', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Vie institutionnelle detail etablissement) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.vieInstitutionnelleDetailEtablissementService.delete(vieInstitutionnelleDetailEtablissement).subscribe(status=>{
                          if(status > 0){
                          const position = this.vieInstitutionnelleDetailEtablissements.indexOf(vieInstitutionnelleDetailEtablissement);
                          position > -1 ? this.vieInstitutionnelleDetailEtablissements.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Vie institutionnelle detail etablissement Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetailEtablissement', 'list');
    isPermistted ? this.vieInstitutionnelleDetailService.findAll().subscribe(vieInstitutionnelleDetails => this.vieInstitutionnelleDetails = vieInstitutionnelleDetails,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtablissement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetailEtablissement', 'list');
    isPermistted ? this.etablissementService.findAll().subscribe(etablissements => this.etablissements = etablissements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateVieInstitutionnelleDetailEtablissement(vieInstitutionnelleDetailEtablissement: VieInstitutionnelleDetailEtablissementVo) {

     this.vieInstitutionnelleDetailEtablissementService.findByIdWithAssociatedList(vieInstitutionnelleDetailEtablissement).subscribe(
	 res => {
	       this.initDuplicateVieInstitutionnelleDetailEtablissement(res);
	       this.selectedVieInstitutionnelleDetailEtablissement = res;
	       this.selectedVieInstitutionnelleDetailEtablissement.id = null;
            this.createVieInstitutionnelleDetailEtablissementDialog = true;

});

	}

	initDuplicateVieInstitutionnelleDetailEtablissement(res: VieInstitutionnelleDetailEtablissementVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.vieInstitutionnelleDetailEtablissements.map(e => {
    return {
            'Vie institutionnelle detail': e.vieInstitutionnelleDetailVo?.id ,
            'Etablissement': e.etablissementVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Vie institutionnelle detail': this.searchVieInstitutionnelleDetailEtablissement.vieInstitutionnelleDetailVo?.id ? this.searchVieInstitutionnelleDetailEtablissement.vieInstitutionnelleDetailVo?.id : environment.emptyForExport ,
        'Etablissement': this.searchVieInstitutionnelleDetailEtablissement.etablissementVo?.libelle ? this.searchVieInstitutionnelleDetailEtablissement.etablissementVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get vieInstitutionnelleDetailEtablissements(): Array<VieInstitutionnelleDetailEtablissementVo> {
           return this.vieInstitutionnelleDetailEtablissementService.vieInstitutionnelleDetailEtablissements;
       }
    set vieInstitutionnelleDetailEtablissements(value: Array<VieInstitutionnelleDetailEtablissementVo>) {
        this.vieInstitutionnelleDetailEtablissementService.vieInstitutionnelleDetailEtablissements = value;
       }

    get vieInstitutionnelleDetailEtablissementSelections(): Array<VieInstitutionnelleDetailEtablissementVo> {
           return this.vieInstitutionnelleDetailEtablissementService.vieInstitutionnelleDetailEtablissementSelections;
       }
    set vieInstitutionnelleDetailEtablissementSelections(value: Array<VieInstitutionnelleDetailEtablissementVo>) {
        this.vieInstitutionnelleDetailEtablissementService.vieInstitutionnelleDetailEtablissementSelections = value;
       }
   
     


    get selectedVieInstitutionnelleDetailEtablissement():VieInstitutionnelleDetailEtablissementVo {
           return this.vieInstitutionnelleDetailEtablissementService.selectedVieInstitutionnelleDetailEtablissement;
       }
    set selectedVieInstitutionnelleDetailEtablissement(value: VieInstitutionnelleDetailEtablissementVo) {
        this.vieInstitutionnelleDetailEtablissementService.selectedVieInstitutionnelleDetailEtablissement = value;
       }
    
    get createVieInstitutionnelleDetailEtablissementDialog():boolean {
           return this.vieInstitutionnelleDetailEtablissementService.createVieInstitutionnelleDetailEtablissementDialog;
       }
    set createVieInstitutionnelleDetailEtablissementDialog(value: boolean) {
        this.vieInstitutionnelleDetailEtablissementService.createVieInstitutionnelleDetailEtablissementDialog= value;
       }
    
    get editVieInstitutionnelleDetailEtablissementDialog():boolean {
           return this.vieInstitutionnelleDetailEtablissementService.editVieInstitutionnelleDetailEtablissementDialog;
       }
    set editVieInstitutionnelleDetailEtablissementDialog(value: boolean) {
        this.vieInstitutionnelleDetailEtablissementService.editVieInstitutionnelleDetailEtablissementDialog= value;
       }
    get viewVieInstitutionnelleDetailEtablissementDialog():boolean {
           return this.vieInstitutionnelleDetailEtablissementService.viewVieInstitutionnelleDetailEtablissementDialog;
       }
    set viewVieInstitutionnelleDetailEtablissementDialog(value: boolean) {
        this.vieInstitutionnelleDetailEtablissementService.viewVieInstitutionnelleDetailEtablissementDialog = value;
       }
       
     get searchVieInstitutionnelleDetailEtablissement(): VieInstitutionnelleDetailEtablissementVo {
        return this.vieInstitutionnelleDetailEtablissementService.searchVieInstitutionnelleDetailEtablissement;
       }
    set searchVieInstitutionnelleDetailEtablissement(value: VieInstitutionnelleDetailEtablissementVo) {
        this.vieInstitutionnelleDetailEtablissementService.searchVieInstitutionnelleDetailEtablissement = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
