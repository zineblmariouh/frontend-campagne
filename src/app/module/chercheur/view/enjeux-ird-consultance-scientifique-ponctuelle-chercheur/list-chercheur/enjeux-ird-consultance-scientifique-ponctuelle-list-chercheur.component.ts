import {Component, OnInit} from '@angular/core';
import {EnjeuxIrdConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/EnjeuxIrdConsultanceScientifiquePonctuelle.service';
import {EnjeuxIrdConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/EnjeuxIrdConsultanceScientifiquePonctuelle.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EnjeuxIrdService } from '../../../../../controller/service/EnjeuxIrd.service';
import { ConsultanceScientifiquePonctuelleService } from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';

import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-enjeux-ird-consultance-scientifique-ponctuelle-list-chercheur',
  templateUrl: './enjeux-ird-consultance-scientifique-ponctuelle-list-chercheur.component.html',
  styleUrls: ['./enjeux-ird-consultance-scientifique-ponctuelle-list-chercheur.component.css']
})
export class EnjeuxIrdConsultanceScientifiquePonctuelleListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EnjeuxIrdConsultanceScientifiquePonctuelle';
    enjeuxIrds :Array<EnjeuxIrdVo>;
    consultanceScientifiquePonctuelles :Array<ConsultanceScientifiquePonctuelleVo>;


    constructor(private datePipe: DatePipe, private enjeuxIrdConsultanceScientifiquePonctuelleService: EnjeuxIrdConsultanceScientifiquePonctuelleService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private enjeuxIrdService: EnjeuxIrdService
        , private consultanceScientifiquePonctuelleService: ConsultanceScientifiquePonctuelleService
) { }

    ngOnInit(): void {
      this.loadEnjeuxIrdConsultanceScientifiquePonctuelles();
      this.initExport();
      this.initCol();
      this.loadEnjeuxIrd();
      this.loadConsultanceScientifiquePonctuelle();
    }
    
    // methods
      public async loadEnjeuxIrdConsultanceScientifiquePonctuelles(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EnjeuxIrdConsultanceScientifiquePonctuelle', 'list');
        isPermistted ? this.enjeuxIrdConsultanceScientifiquePonctuelleService.findAll().subscribe(enjeuxIrdConsultanceScientifiquePonctuelles => this.enjeuxIrdConsultanceScientifiquePonctuelles = enjeuxIrdConsultanceScientifiquePonctuelles,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.enjeuxIrdConsultanceScientifiquePonctuelleService.findByCriteria(this.searchEnjeuxIrdConsultanceScientifiquePonctuelle).subscribe(enjeuxIrdConsultanceScientifiquePonctuelles=>{
            
            this.enjeuxIrdConsultanceScientifiquePonctuelles = enjeuxIrdConsultanceScientifiquePonctuelles;
           // this.searchEnjeuxIrdConsultanceScientifiquePonctuelle = new EnjeuxIrdConsultanceScientifiquePonctuelleVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'enjeuxIrd?.libelle', header: 'Enjeux ird'},
                        {field: 'consultanceScientifiquePonctuelle?.id', header: 'Consultance scientifique ponctuelle'},
        ];
    }
    
    public async editEnjeuxIrdConsultanceScientifiquePonctuelle(enjeuxIrdConsultanceScientifiquePonctuelle:EnjeuxIrdConsultanceScientifiquePonctuelleVo){
        const isPermistted = await this.roleService.isPermitted('EnjeuxIrdConsultanceScientifiquePonctuelle', 'edit');
         if(isPermistted){
          this.enjeuxIrdConsultanceScientifiquePonctuelleService.findByIdWithAssociatedList(enjeuxIrdConsultanceScientifiquePonctuelle).subscribe(res => {
           this.selectedEnjeuxIrdConsultanceScientifiquePonctuelle = res;
            this.editEnjeuxIrdConsultanceScientifiquePonctuelleDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEnjeuxIrdConsultanceScientifiquePonctuelle(enjeuxIrdConsultanceScientifiquePonctuelle:EnjeuxIrdConsultanceScientifiquePonctuelleVo){
        const isPermistted = await this.roleService.isPermitted('EnjeuxIrdConsultanceScientifiquePonctuelle', 'view');
        if(isPermistted){
           this.enjeuxIrdConsultanceScientifiquePonctuelleService.findByIdWithAssociatedList(enjeuxIrdConsultanceScientifiquePonctuelle).subscribe(res => {
           this.selectedEnjeuxIrdConsultanceScientifiquePonctuelle = res;
            this.viewEnjeuxIrdConsultanceScientifiquePonctuelleDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEnjeuxIrdConsultanceScientifiquePonctuelle(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEnjeuxIrdConsultanceScientifiquePonctuelle = new EnjeuxIrdConsultanceScientifiquePonctuelleVo();
            this.createEnjeuxIrdConsultanceScientifiquePonctuelleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEnjeuxIrdConsultanceScientifiquePonctuelle(enjeuxIrdConsultanceScientifiquePonctuelle:EnjeuxIrdConsultanceScientifiquePonctuelleVo){
       const isPermistted = await this.roleService.isPermitted('EnjeuxIrdConsultanceScientifiquePonctuelle', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Enjeux ird consultance scientifique ponctuelle) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.enjeuxIrdConsultanceScientifiquePonctuelleService.delete(enjeuxIrdConsultanceScientifiquePonctuelle).subscribe(status=>{
                          if(status > 0){
                          const position = this.enjeuxIrdConsultanceScientifiquePonctuelles.indexOf(enjeuxIrdConsultanceScientifiquePonctuelle);
                          position > -1 ? this.enjeuxIrdConsultanceScientifiquePonctuelles.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Enjeux ird consultance scientifique ponctuelle Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('EnjeuxIrdConsultanceScientifiquePonctuelle', 'list');
    isPermistted ? this.enjeuxIrdService.findAll().subscribe(enjeuxIrds => this.enjeuxIrds = enjeuxIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadConsultanceScientifiquePonctuelle(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EnjeuxIrdConsultanceScientifiquePonctuelle', 'list');
    isPermistted ? this.consultanceScientifiquePonctuelleService.findAll().subscribe(consultanceScientifiquePonctuelles => this.consultanceScientifiquePonctuelles = consultanceScientifiquePonctuelles,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEnjeuxIrdConsultanceScientifiquePonctuelle(enjeuxIrdConsultanceScientifiquePonctuelle: EnjeuxIrdConsultanceScientifiquePonctuelleVo) {

     this.enjeuxIrdConsultanceScientifiquePonctuelleService.findByIdWithAssociatedList(enjeuxIrdConsultanceScientifiquePonctuelle).subscribe(
	 res => {
	       this.initDuplicateEnjeuxIrdConsultanceScientifiquePonctuelle(res);
	       this.selectedEnjeuxIrdConsultanceScientifiquePonctuelle = res;
	       this.selectedEnjeuxIrdConsultanceScientifiquePonctuelle.id = null;
            this.createEnjeuxIrdConsultanceScientifiquePonctuelleDialog = true;

});

	}

	initDuplicateEnjeuxIrdConsultanceScientifiquePonctuelle(res: EnjeuxIrdConsultanceScientifiquePonctuelleVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.enjeuxIrdConsultanceScientifiquePonctuelles.map(e => {
    return {
            'Enjeux ird': e.enjeuxIrdVo?.libelle ,
            'Consultance scientifique ponctuelle': e.consultanceScientifiquePonctuelleVo?.id ,
     }
      });

      this.criteriaData = [{
        'Enjeux ird': this.searchEnjeuxIrdConsultanceScientifiquePonctuelle.enjeuxIrdVo?.libelle ? this.searchEnjeuxIrdConsultanceScientifiquePonctuelle.enjeuxIrdVo?.libelle : environment.emptyForExport ,
        'Consultance scientifique ponctuelle': this.searchEnjeuxIrdConsultanceScientifiquePonctuelle.consultanceScientifiquePonctuelleVo?.id ? this.searchEnjeuxIrdConsultanceScientifiquePonctuelle.consultanceScientifiquePonctuelleVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get enjeuxIrdConsultanceScientifiquePonctuelles(): Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo> {
           return this.enjeuxIrdConsultanceScientifiquePonctuelleService.enjeuxIrdConsultanceScientifiquePonctuelles;
       }
    set enjeuxIrdConsultanceScientifiquePonctuelles(value: Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo>) {
        this.enjeuxIrdConsultanceScientifiquePonctuelleService.enjeuxIrdConsultanceScientifiquePonctuelles = value;
       }

    get enjeuxIrdConsultanceScientifiquePonctuelleSelections(): Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo> {
           return this.enjeuxIrdConsultanceScientifiquePonctuelleService.enjeuxIrdConsultanceScientifiquePonctuelleSelections;
       }
    set enjeuxIrdConsultanceScientifiquePonctuelleSelections(value: Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo>) {
        this.enjeuxIrdConsultanceScientifiquePonctuelleService.enjeuxIrdConsultanceScientifiquePonctuelleSelections = value;
       }
   
     


    get selectedEnjeuxIrdConsultanceScientifiquePonctuelle():EnjeuxIrdConsultanceScientifiquePonctuelleVo {
           return this.enjeuxIrdConsultanceScientifiquePonctuelleService.selectedEnjeuxIrdConsultanceScientifiquePonctuelle;
       }
    set selectedEnjeuxIrdConsultanceScientifiquePonctuelle(value: EnjeuxIrdConsultanceScientifiquePonctuelleVo) {
        this.enjeuxIrdConsultanceScientifiquePonctuelleService.selectedEnjeuxIrdConsultanceScientifiquePonctuelle = value;
       }
    
    get createEnjeuxIrdConsultanceScientifiquePonctuelleDialog():boolean {
           return this.enjeuxIrdConsultanceScientifiquePonctuelleService.createEnjeuxIrdConsultanceScientifiquePonctuelleDialog;
       }
    set createEnjeuxIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.enjeuxIrdConsultanceScientifiquePonctuelleService.createEnjeuxIrdConsultanceScientifiquePonctuelleDialog= value;
       }
    
    get editEnjeuxIrdConsultanceScientifiquePonctuelleDialog():boolean {
           return this.enjeuxIrdConsultanceScientifiquePonctuelleService.editEnjeuxIrdConsultanceScientifiquePonctuelleDialog;
       }
    set editEnjeuxIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.enjeuxIrdConsultanceScientifiquePonctuelleService.editEnjeuxIrdConsultanceScientifiquePonctuelleDialog= value;
       }
    get viewEnjeuxIrdConsultanceScientifiquePonctuelleDialog():boolean {
           return this.enjeuxIrdConsultanceScientifiquePonctuelleService.viewEnjeuxIrdConsultanceScientifiquePonctuelleDialog;
       }
    set viewEnjeuxIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.enjeuxIrdConsultanceScientifiquePonctuelleService.viewEnjeuxIrdConsultanceScientifiquePonctuelleDialog = value;
       }
       
     get searchEnjeuxIrdConsultanceScientifiquePonctuelle(): EnjeuxIrdConsultanceScientifiquePonctuelleVo {
        return this.enjeuxIrdConsultanceScientifiquePonctuelleService.searchEnjeuxIrdConsultanceScientifiquePonctuelle;
       }
    set searchEnjeuxIrdConsultanceScientifiquePonctuelle(value: EnjeuxIrdConsultanceScientifiquePonctuelleVo) {
        this.enjeuxIrdConsultanceScientifiquePonctuelleService.searchEnjeuxIrdConsultanceScientifiquePonctuelle = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
