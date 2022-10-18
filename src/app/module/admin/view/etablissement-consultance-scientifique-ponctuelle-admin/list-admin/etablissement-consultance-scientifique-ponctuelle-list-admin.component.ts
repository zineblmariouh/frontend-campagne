import {Component, OnInit} from '@angular/core';
import {EtablissementConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/EtablissementConsultanceScientifiquePonctuelle.service';
import {EtablissementConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/EtablissementConsultanceScientifiquePonctuelle.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ConsultanceScientifiquePonctuelleService } from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
import { EtablissementService } from '../../../../../controller/service/Etablissement.service';

import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-etablissement-consultance-scientifique-ponctuelle-list-admin',
  templateUrl: './etablissement-consultance-scientifique-ponctuelle-list-admin.component.html',
  styleUrls: ['./etablissement-consultance-scientifique-ponctuelle-list-admin.component.css']
})
export class EtablissementConsultanceScientifiquePonctuelleListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtablissementConsultanceScientifiquePonctuelle';
    consultanceScientifiquePonctuelles :Array<ConsultanceScientifiquePonctuelleVo>;
    etablissements :Array<EtablissementVo>;


    constructor(private datePipe: DatePipe, private etablissementConsultanceScientifiquePonctuelleService: EtablissementConsultanceScientifiquePonctuelleService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private consultanceScientifiquePonctuelleService: ConsultanceScientifiquePonctuelleService
        , private etablissementService: EtablissementService
) { }

    ngOnInit(): void {
      this.loadEtablissementConsultanceScientifiquePonctuelles();
      this.initExport();
      this.initCol();
      this.loadConsultanceScientifiquePonctuelle();
      this.loadEtablissement();
    }
    
    // methods
      public async loadEtablissementConsultanceScientifiquePonctuelles(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtablissementConsultanceScientifiquePonctuelle', 'list');
        isPermistted ? this.etablissementConsultanceScientifiquePonctuelleService.findAll().subscribe(etablissementConsultanceScientifiquePonctuelles => this.etablissementConsultanceScientifiquePonctuelles = etablissementConsultanceScientifiquePonctuelles,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etablissementConsultanceScientifiquePonctuelleService.findByCriteria(this.searchEtablissementConsultanceScientifiquePonctuelle).subscribe(etablissementConsultanceScientifiquePonctuelles=>{
            
            this.etablissementConsultanceScientifiquePonctuelles = etablissementConsultanceScientifiquePonctuelles;
           // this.searchEtablissementConsultanceScientifiquePonctuelle = new EtablissementConsultanceScientifiquePonctuelleVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'consultanceScientifiquePonctuelle?.id', header: 'Consultance scientifique ponctuelle'},
                        {field: 'etablissement?.libelle', header: 'Etablissement'},
        ];
    }
    
    public async editEtablissementConsultanceScientifiquePonctuelle(etablissementConsultanceScientifiquePonctuelle:EtablissementConsultanceScientifiquePonctuelleVo){
        const isPermistted = await this.roleService.isPermitted('EtablissementConsultanceScientifiquePonctuelle', 'edit');
         if(isPermistted){
          this.etablissementConsultanceScientifiquePonctuelleService.findByIdWithAssociatedList(etablissementConsultanceScientifiquePonctuelle).subscribe(res => {
           this.selectedEtablissementConsultanceScientifiquePonctuelle = res;
            this.editEtablissementConsultanceScientifiquePonctuelleDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtablissementConsultanceScientifiquePonctuelle(etablissementConsultanceScientifiquePonctuelle:EtablissementConsultanceScientifiquePonctuelleVo){
        const isPermistted = await this.roleService.isPermitted('EtablissementConsultanceScientifiquePonctuelle', 'view');
        if(isPermistted){
           this.etablissementConsultanceScientifiquePonctuelleService.findByIdWithAssociatedList(etablissementConsultanceScientifiquePonctuelle).subscribe(res => {
           this.selectedEtablissementConsultanceScientifiquePonctuelle = res;
            this.viewEtablissementConsultanceScientifiquePonctuelleDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtablissementConsultanceScientifiquePonctuelle(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtablissementConsultanceScientifiquePonctuelle = new EtablissementConsultanceScientifiquePonctuelleVo();
            this.createEtablissementConsultanceScientifiquePonctuelleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEtablissementConsultanceScientifiquePonctuelle(etablissementConsultanceScientifiquePonctuelle:EtablissementConsultanceScientifiquePonctuelleVo){
       const isPermistted = await this.roleService.isPermitted('EtablissementConsultanceScientifiquePonctuelle', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etablissement consultance scientifique ponctuelle) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etablissementConsultanceScientifiquePonctuelleService.delete(etablissementConsultanceScientifiquePonctuelle).subscribe(status=>{
                          if(status > 0){
                          const position = this.etablissementConsultanceScientifiquePonctuelles.indexOf(etablissementConsultanceScientifiquePonctuelle);
                          position > -1 ? this.etablissementConsultanceScientifiquePonctuelles.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etablissement consultance scientifique ponctuelle Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('EtablissementConsultanceScientifiquePonctuelle', 'list');
    isPermistted ? this.consultanceScientifiquePonctuelleService.findAll().subscribe(consultanceScientifiquePonctuelles => this.consultanceScientifiquePonctuelles = consultanceScientifiquePonctuelles,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtablissement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EtablissementConsultanceScientifiquePonctuelle', 'list');
    isPermistted ? this.etablissementService.findAll().subscribe(etablissements => this.etablissements = etablissements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEtablissementConsultanceScientifiquePonctuelle(etablissementConsultanceScientifiquePonctuelle: EtablissementConsultanceScientifiquePonctuelleVo) {

     this.etablissementConsultanceScientifiquePonctuelleService.findByIdWithAssociatedList(etablissementConsultanceScientifiquePonctuelle).subscribe(
	 res => {
	       this.initDuplicateEtablissementConsultanceScientifiquePonctuelle(res);
	       this.selectedEtablissementConsultanceScientifiquePonctuelle = res;
	       this.selectedEtablissementConsultanceScientifiquePonctuelle.id = null;
            this.createEtablissementConsultanceScientifiquePonctuelleDialog = true;

});

	}

	initDuplicateEtablissementConsultanceScientifiquePonctuelle(res: EtablissementConsultanceScientifiquePonctuelleVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.etablissementConsultanceScientifiquePonctuelles.map(e => {
    return {
            'Consultance scientifique ponctuelle': e.consultanceScientifiquePonctuelleVo?.id ,
            'Etablissement': e.etablissementVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Consultance scientifique ponctuelle': this.searchEtablissementConsultanceScientifiquePonctuelle.consultanceScientifiquePonctuelleVo?.id ? this.searchEtablissementConsultanceScientifiquePonctuelle.consultanceScientifiquePonctuelleVo?.id : environment.emptyForExport ,
        'Etablissement': this.searchEtablissementConsultanceScientifiquePonctuelle.etablissementVo?.libelle ? this.searchEtablissementConsultanceScientifiquePonctuelle.etablissementVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etablissementConsultanceScientifiquePonctuelles(): Array<EtablissementConsultanceScientifiquePonctuelleVo> {
           return this.etablissementConsultanceScientifiquePonctuelleService.etablissementConsultanceScientifiquePonctuelles;
       }
    set etablissementConsultanceScientifiquePonctuelles(value: Array<EtablissementConsultanceScientifiquePonctuelleVo>) {
        this.etablissementConsultanceScientifiquePonctuelleService.etablissementConsultanceScientifiquePonctuelles = value;
       }

    get etablissementConsultanceScientifiquePonctuelleSelections(): Array<EtablissementConsultanceScientifiquePonctuelleVo> {
           return this.etablissementConsultanceScientifiquePonctuelleService.etablissementConsultanceScientifiquePonctuelleSelections;
       }
    set etablissementConsultanceScientifiquePonctuelleSelections(value: Array<EtablissementConsultanceScientifiquePonctuelleVo>) {
        this.etablissementConsultanceScientifiquePonctuelleService.etablissementConsultanceScientifiquePonctuelleSelections = value;
       }
   
     


    get selectedEtablissementConsultanceScientifiquePonctuelle():EtablissementConsultanceScientifiquePonctuelleVo {
           return this.etablissementConsultanceScientifiquePonctuelleService.selectedEtablissementConsultanceScientifiquePonctuelle;
       }
    set selectedEtablissementConsultanceScientifiquePonctuelle(value: EtablissementConsultanceScientifiquePonctuelleVo) {
        this.etablissementConsultanceScientifiquePonctuelleService.selectedEtablissementConsultanceScientifiquePonctuelle = value;
       }
    
    get createEtablissementConsultanceScientifiquePonctuelleDialog():boolean {
           return this.etablissementConsultanceScientifiquePonctuelleService.createEtablissementConsultanceScientifiquePonctuelleDialog;
       }
    set createEtablissementConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.etablissementConsultanceScientifiquePonctuelleService.createEtablissementConsultanceScientifiquePonctuelleDialog= value;
       }
    
    get editEtablissementConsultanceScientifiquePonctuelleDialog():boolean {
           return this.etablissementConsultanceScientifiquePonctuelleService.editEtablissementConsultanceScientifiquePonctuelleDialog;
       }
    set editEtablissementConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.etablissementConsultanceScientifiquePonctuelleService.editEtablissementConsultanceScientifiquePonctuelleDialog= value;
       }
    get viewEtablissementConsultanceScientifiquePonctuelleDialog():boolean {
           return this.etablissementConsultanceScientifiquePonctuelleService.viewEtablissementConsultanceScientifiquePonctuelleDialog;
       }
    set viewEtablissementConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.etablissementConsultanceScientifiquePonctuelleService.viewEtablissementConsultanceScientifiquePonctuelleDialog = value;
       }
       
     get searchEtablissementConsultanceScientifiquePonctuelle(): EtablissementConsultanceScientifiquePonctuelleVo {
        return this.etablissementConsultanceScientifiquePonctuelleService.searchEtablissementConsultanceScientifiquePonctuelle;
       }
    set searchEtablissementConsultanceScientifiquePonctuelle(value: EtablissementConsultanceScientifiquePonctuelleVo) {
        this.etablissementConsultanceScientifiquePonctuelleService.searchEtablissementConsultanceScientifiquePonctuelle = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
