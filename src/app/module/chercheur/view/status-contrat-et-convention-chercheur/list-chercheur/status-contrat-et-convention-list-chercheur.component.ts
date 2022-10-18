import {Component, OnInit} from '@angular/core';
import {StatusContratEtConventionService} from '../../../../../controller/service/StatusContratEtConvention.service';
import {StatusContratEtConventionVo} from '../../../../../controller/model/StatusContratEtConvention.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';


import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-status-contrat-et-convention-list-chercheur',
  templateUrl: './status-contrat-et-convention-list-chercheur.component.html',
  styleUrls: ['./status-contrat-et-convention-list-chercheur.component.css']
})
export class StatusContratEtConventionListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'StatusContratEtConvention';


    constructor(private datePipe: DatePipe, private statusContratEtConventionService: StatusContratEtConventionService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadStatusContratEtConventions();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadStatusContratEtConventions(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('StatusContratEtConvention', 'list');
        isPermistted ? this.statusContratEtConventionService.findAll().subscribe(statusContratEtConventions => this.statusContratEtConventions = statusContratEtConventions,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.statusContratEtConventionService.findByCriteria(this.searchStatusContratEtConvention).subscribe(statusContratEtConventions=>{
            
            this.statusContratEtConventions = statusContratEtConventions;
           // this.searchStatusContratEtConvention = new StatusContratEtConventionVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
        ];
    }
    
    public async editStatusContratEtConvention(statusContratEtConvention:StatusContratEtConventionVo){
        const isPermistted = await this.roleService.isPermitted('StatusContratEtConvention', 'edit');
         if(isPermistted){
          this.statusContratEtConventionService.findByIdWithAssociatedList(statusContratEtConvention).subscribe(res => {
           this.selectedStatusContratEtConvention = res;
            this.editStatusContratEtConventionDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewStatusContratEtConvention(statusContratEtConvention:StatusContratEtConventionVo){
        const isPermistted = await this.roleService.isPermitted('StatusContratEtConvention', 'view');
        if(isPermistted){
           this.statusContratEtConventionService.findByIdWithAssociatedList(statusContratEtConvention).subscribe(res => {
           this.selectedStatusContratEtConvention = res;
            this.viewStatusContratEtConventionDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateStatusContratEtConvention(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedStatusContratEtConvention = new StatusContratEtConventionVo();
            this.createStatusContratEtConventionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteStatusContratEtConvention(statusContratEtConvention:StatusContratEtConventionVo){
       const isPermistted = await this.roleService.isPermitted('StatusContratEtConvention', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Status contrat et convention) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.statusContratEtConventionService.delete(statusContratEtConvention).subscribe(status=>{
                          if(status > 0){
                          const position = this.statusContratEtConventions.indexOf(statusContratEtConvention);
                          position > -1 ? this.statusContratEtConventions.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Status contrat et convention Supprimé',
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


public async duplicateStatusContratEtConvention(statusContratEtConvention: StatusContratEtConventionVo) {

     this.statusContratEtConventionService.findByIdWithAssociatedList(statusContratEtConvention).subscribe(
	 res => {
	       this.initDuplicateStatusContratEtConvention(res);
	       this.selectedStatusContratEtConvention = res;
	       this.selectedStatusContratEtConvention.id = null;
            this.createStatusContratEtConventionDialog = true;

});

	}

	initDuplicateStatusContratEtConvention(res: StatusContratEtConventionVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.statusContratEtConventions.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchStatusContratEtConvention.libelle ? this.searchStatusContratEtConvention.libelle : environment.emptyForExport ,
            'Code': this.searchStatusContratEtConvention.code ? this.searchStatusContratEtConvention.code : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get statusContratEtConventions(): Array<StatusContratEtConventionVo> {
           return this.statusContratEtConventionService.statusContratEtConventions;
       }
    set statusContratEtConventions(value: Array<StatusContratEtConventionVo>) {
        this.statusContratEtConventionService.statusContratEtConventions = value;
       }

    get statusContratEtConventionSelections(): Array<StatusContratEtConventionVo> {
           return this.statusContratEtConventionService.statusContratEtConventionSelections;
       }
    set statusContratEtConventionSelections(value: Array<StatusContratEtConventionVo>) {
        this.statusContratEtConventionService.statusContratEtConventionSelections = value;
       }
   
     


    get selectedStatusContratEtConvention():StatusContratEtConventionVo {
           return this.statusContratEtConventionService.selectedStatusContratEtConvention;
       }
    set selectedStatusContratEtConvention(value: StatusContratEtConventionVo) {
        this.statusContratEtConventionService.selectedStatusContratEtConvention = value;
       }
    
    get createStatusContratEtConventionDialog():boolean {
           return this.statusContratEtConventionService.createStatusContratEtConventionDialog;
       }
    set createStatusContratEtConventionDialog(value: boolean) {
        this.statusContratEtConventionService.createStatusContratEtConventionDialog= value;
       }
    
    get editStatusContratEtConventionDialog():boolean {
           return this.statusContratEtConventionService.editStatusContratEtConventionDialog;
       }
    set editStatusContratEtConventionDialog(value: boolean) {
        this.statusContratEtConventionService.editStatusContratEtConventionDialog= value;
       }
    get viewStatusContratEtConventionDialog():boolean {
           return this.statusContratEtConventionService.viewStatusContratEtConventionDialog;
       }
    set viewStatusContratEtConventionDialog(value: boolean) {
        this.statusContratEtConventionService.viewStatusContratEtConventionDialog = value;
       }
       
     get searchStatusContratEtConvention(): StatusContratEtConventionVo {
        return this.statusContratEtConventionService.searchStatusContratEtConvention;
       }
    set searchStatusContratEtConvention(value: StatusContratEtConventionVo) {
        this.statusContratEtConventionService.searchStatusContratEtConvention = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
